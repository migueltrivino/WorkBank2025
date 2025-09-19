const User = require("../models/user");
const { hashPassword, comparePassword } = require("../utils/hashPassword");
const { createAccessToken } = require("../utils/security");

// =======================
// Función que registra al usuario
// =======================
async function registerUser(userData, documentoPdf) {
  const { nombre, apellido, email, user_password, tipoDocumento, numeroDocumento, rol } = userData;

  // Validación de campos
  if (!nombre || !apellido || !email || !user_password || !tipoDocumento || !numeroDocumento || !rol || !documentoPdf) {
    throw new Error("Todos los campos son obligatorios");
  }

  // Verificar si el usuario ya existe
  const userExists = await User.findByEmail(email);
  if (userExists) {
    throw new Error("El correo ya está registrado");
  }

  // Encriptar contraseña
  const hashedPassword = await hashPassword(user_password);

  // Crear usuario
  const newUser = await User.create({
    nombre,
    apellido,
    email, // 👈 viene del frontend
    user_password: hashedPassword,
    tipoDocumento,
    numeroDocumento,
    rol,
    documentoPdf,
  });

  return newUser;
}

// =======================
// Controller: Registro
// =======================
async function register(req, res) {
  try {
    const newUser = await registerUser(req.body, req.file?.filename);

    return res.status(201).json({
      message: "Usuario registrado con éxito",
      user: {
        id_usuario: newUser.id_usuario,
        nombre: newUser.nombre,
        apellido: newUser.apellido,
        correo: newUser.correo, // ⚡ siempre será el email, pero en la columna correo
        rol: newUser.rol,
        documentoPdf: newUser.documentoPdf,
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