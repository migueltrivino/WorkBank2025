// backend/src/controllers/authController.js
const User = require("../models/user");
const { hashPassword, comparePassword } = require("../utils/hashPassword");
const { createAccessToken } = require("../utils/security");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

// ------------------------
// Generar código alfanumérico
function generateCode(length = 6) {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let code = "";
  for (let i = 0; i < length; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}
 
// ------------------------
// Enviar correo de verificación
async function sendVerificationEmail(user) {
  const code = generateCode();
  user.token_confirmacion = code;
  await user.save(); // ⚡ User debe tener método .save()
  const body = `Tu código de verificación es: ${code}`;
  await sendEmail(user.correo, "Verificación de correo Work Bank", body);
}

// ------------------------
// Registro de usuario (lógica)
async function registerUser(userData) {
  const nombre = userData.nombre?.trim();
  const apellido = userData.apellido?.trim();
  const correo = (userData.correo ?? userData.email ?? "").trim();
  const user_password_raw = userData.user_password ?? userData.password;

  if (!nombre || !apellido || !correo || !user_password_raw) {
    throw new Error("Nombre, apellido, correo y contraseña son obligatorios");
  }

  // Revisar existencia
  const existing = await User.findByEmail(correo);
  if (existing) {
    if (!existing.correo_confirmado) {
      // await sendVerificationEmail(existing);
      return existing;
    }
    throw new Error("El correo ya está registrado");
  }

  const hashedPassword = await hashPassword(user_password_raw);

  // Crear usuario
  const newUser = await User.create({
    nombre,
    apellido,
    correo,
    user_password: hashedPassword,
    tipo_documento: userData.tipo_documento ?? userData.tipoDocumento ?? null,
    numero_documento: userData.numero_documento ?? userData.numeroDocumento ?? null,
    id_rol: userData.id_rol ?? userData.rol ?? null,
    documento_pdf: userData.documento_pdf ?? userData.documentoPdf ?? null,
    correo_confirmado: 0,
  });

  const createdUser = await User.findByEmail(newUser.correo);
  // await sendVerificationEmail(createdUser);

  return createdUser;
}

// ------------------------
// Endpoint de registro
async function register(req, res) {
  try {
    const payload = { ...req.body };

    if (req.file && !payload.documento_pdf) {
      payload.documento_pdf = req.file.filename;
    }

    const newUser = await registerUser(payload);

    return res.status(201).json({
      message: "Usuario registrado con éxito. ",
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

// ------------------------
// Login
async function login(req, res) {
  const correo = (req.body.correo ?? req.body.email ?? "").trim();
  const password = req.body.user_password;

  if (!correo || !password) return res.status(400).json({ message: "Correo y contraseña son obligatorios" });

  try {
    const user = await User.findByEmail(correo);
    if (!user) return res.status(400).json({ message: "Correo o contraseña incorrectos" });

    const match = await comparePassword(password, user.user_password);
    if (!match) return res.status(400).json({ message: "Correo o contraseña incorrectos" });

    const token = createAccessToken({ id_usuario: user.id_usuario, correo: user.correo });

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
  } catch (err) {
    console.error("Error en login:", err);
    return res.status(500).json({ message: "Error del servidor" });
  }
}

// ------------------------
// Confirmación de correo
async function confirmEmail(req, res) {
  try {
    const correo = (req.body.correo ?? "").trim();
    const token = (req.body.token ?? "").trim();

    if (!correo || !token) return res.status(400).json({ message: "Correo y token son requeridos" });

    const user = await User.findByEmail(correo);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    if (user.correo_confirmado) return res.status(400).json({ message: "Correo ya confirmado" });
    if (user.token_confirmacion !== token) return res.status(400).json({ message: "Código incorrecto" });

    user.correo_confirmado = 1;
    user.token_confirmacion = null;
    await user.save();

    return res.json({ message: "Correo confirmado correctamente" });
  } catch (error) {
    console.error("Error en confirmEmail:", error);
    return res.status(500).json({ message: "Error interno" });
  }
}

// ------------------------
// Reenviar código
async function resendCode(req, res) {
  try {
    const correo = (req.body.correo ?? req.body.email ?? "").trim();
    if (!correo) return res.status(400).json({ message: "Correo es obligatorio" });

    const user = await User.findByEmail(correo);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    if (user.correo_confirmado) return res.status(400).json({ message: "Correo ya confirmado" });

    await sendVerificationEmail(user);
    return res.json({ message: "Código reenviado correctamente" });
  } catch (error) {
    console.error("Error en resendCode:", error);
    return res.status(500).json({ message: "Error al reenviar código" });
  }
}


// ------------------------
// Cancelar registro y eliminar usuario
async function cancelRegistration(req, res) {
  const { id_usuario } = req.body;
  if (!id_usuario) return res.status(400).json({ message: "ID de usuario requerido" });

  try {
    const user = await User.findById(id_usuario);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    // ⚡ Solo borrar si no está confirmado
    if (!user.correo_confirmado) {
      await user.destroy(); // elimina el registro completo
      return res.json({ message: "Registro cancelado y usuario eliminado" });
    } else {
      return res.status(400).json({ message: "Correo ya confirmado, no se puede eliminar" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al cancelar registro" });
  }
}

module.exports = {
  register,
  registerUser,
  login,
  confirmEmail,
  resendCode,
  sendVerificationEmail,
  cancelRegistration,
};
