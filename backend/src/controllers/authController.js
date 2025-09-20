const User = require("../models/user");
const { hashPassword, comparePassword } = require("../utils/hashPassword");
const { createAccessToken } = require("../utils/security");

// =======================
// Función que registra al usuario (Paso 1 - básicos)
// =======================
async function registerUser(userData) {
  const { nombre, apellido, email, user_password } = userData;

  // Validación SOLO de lo esencial en el primer paso
  if (!nombre || !apellido || !email || !user_password) {
    throw new Error("Nombre, apellido, email y contraseña son obligatorios");
  }

  // Verificar si el usuario ya existe
  const userExists = await User.findByEmail(email);
  if (userExists) {
    throw new Error("El correo ya está registrado");
  }

  // Encriptar contraseña
  const hashedPassword = await hashPassword(user_password);

  // Crear usuario con lo básico, los demás campos quedan NULL/DEFAULT
  const newUser = await User.create({
    nombre,
    apellido,
    correo: email, // 👈 asegúrate de que tu tabla use "correo"
    user_password: hashedPassword,
    tipoDocumento: null,
    numeroDocumento: null,
    rol: null,
    documentoPdf: null,
    confirmado: false, // 👈 para confirmación por email
  });

  return newUser;
}

// =======================
// Controller: Registro (Paso 1)
// =======================
async function register(req, res) {
  try {
    const newUser = await registerUser(req.body);

    return res.status(201).json({
      message: "Usuario registrado con éxito (Paso 1)",
      user: {
        id_usuario: newUser.id_usuario,
        nombre: newUser.nombre,
        apellido: newUser.apellido,
        correo: newUser.correo,
      },
    });
  } catch (error) {
    console.error("Error en registro:", error);
    return res.status(400).json({ message: error.message });
  }
}

// =======================
// Controller: Login
// =======================
async function login(req, res) {
  const { email, user_password } = req.body;

  try {
    const user = await User.findByEmail(email);
    if (!user) return res.status(400).json({ message: "Correo o contraseña incorrectos" });

    const isMatch = await comparePassword(user_password, user.user_password);
    if (!isMatch) return res.status(400).json({ message: "Correo o contraseña incorrectos" });

    const token = createAccessToken({
      id_usuario: user.id_usuario,
      correo: user.correo,
    });

    return res.status(200).json({
      message: "Inicio de sesión exitoso",
      accessToken: token,
      user: {
        id_usuario: user.id_usuario,
        nombre: user.nombre,
        apellido: user.apellido,
        correo: user.correo,
        rol: user.rol,
      },
    });
  } catch (error) {
    console.error("Error en login:", error);
    return res.status(500).json({ message: "Error del servidor" });
  }
}

module.exports = { register, registerUser, login };
