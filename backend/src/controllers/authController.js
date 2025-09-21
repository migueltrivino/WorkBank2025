// backend/src/controllers/authController.js
const User = require("../models/user");
const { hashPassword, comparePassword } = require("../utils/hashPassword");
const { createAccessToken } = require("../utils/security");

// Normaliza parámetros y registra:
async function registerUser(userData) {
  const nombre = userData.nombre;
  const apellido = userData.apellido;
  const correo = userData.correo ?? userData.email;
  const user_password_raw = userData.user_password ?? userData.password;

  if (!nombre || !apellido || !correo || !user_password_raw) {
    throw new Error("Nombre, apellido, correo y contraseña son obligatorios");
  }

  // Verificar existencia
  const userExists = await User.findByEmail(correo);
  if (userExists) {
    throw new Error("El correo ya está registrado");
  }

  // Encriptar
  const hashedPassword = await hashPassword(user_password_raw);

  // Llamamos a create con nombres que coinciden con la BD
  const newUser = await User.create({
    nombre,
    apellido,
    correo,
    user_password: hashedPassword,
    tipo_documento: userData.tipo_documento ?? userData.tipoDocumento ?? null,
    numero_documento: userData.numero_documento ?? userData.numeroDocumento ?? null,
    id_rol: userData.id_rol ?? userData.rol ?? null,
    documento_pdf: userData.documento_pdf ?? userData.documentoPdf ?? null,
  });

  return newUser;
}

async function register(req, res) {
  try {
    const payload = { ...req.body };

    // Si hay archivo PDF
    if (req.file) {
      payload.documento_pdf = req.file.filename;
    }

    // Forzar id_rol a número
    if (payload.id_rol) {
      payload.id_rol = Number(payload.id_rol);
    }

    console.log("Payload recibido en registro:", payload);

    const newUser = await registerUser(payload);

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

async function login(req, res) {
  const { email, correo, user_password } = req.body;
  const loginCorreo = correo ?? email;

  try {
    const user = await User.findByEmail(loginCorreo);
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
