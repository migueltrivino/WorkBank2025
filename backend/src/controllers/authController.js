// backend/src/controllers/authController.js
const User = require("../models/user");
const { hashPassword, comparePassword } = require("../utils/hashPassword");
const { createAccessToken } = require("../utils/security");
const sendEmail = require("../utils/sendEmail");

// ------------------------
// Generar código aleatorio 6 dígitos/alfanumérico
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
  await user.save(); // ⚡ debe existir método .save() en User
  const body = `Tu código de verificación es: ${code}`;
  await sendEmail(user.correo, "Verificación de correo Work Bank", body);
}

// ------------------------
// Registro de usuario (fusionando todo)
async function registerUser(userData) {
  const nombre = userData.nombre;
  const apellido = userData.apellido;
  const correo = userData.correo ?? userData.email;
  const user_password_raw = userData.user_password ?? userData.password;

  if (!nombre || !apellido || !correo || !user_password_raw) {
    throw new Error("Nombre, apellido, correo y contraseña son obligatorios");
  }

  // Revisar existencia
  const userExists = await User.findByEmail(correo);

  if (userExists) {
    if (!userExists.correo_confirmado) {
      // Reenvío de código si no ha confirmado
      await sendVerificationEmail(userExists);
      return userExists; // ⚡ permite que RegistroPanel avance con id_usuario
    }
    throw new Error("El correo ya está registrado");
  }

  // Encriptar contraseña
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
  });

  // Recargar desde DB para tener métodos tipo .save()
  const createdUser = await User.findByEmail(newUser.correo);

  // Enviar correo de verificación
  await sendVerificationEmail(createdUser);

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

    // ⚡ DEVUELVE siempre id_usuario correcto para RegistroPanel
    return res.status(201).json({
      message: "Usuario registrado con éxito (Paso 1). Se ha enviado un correo de verificación",
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
  const { email, correo, user_password } = req.body;
  const loginCorreo = correo ?? email;

  try {
    const user = await User.findByEmail(loginCorreo);
    if (!user)
      return res.status(400).json({ message: "Correo o contraseña incorrectos" });

    const isMatch = await comparePassword(user_password, user.user_password);
    if (!isMatch)
      return res.status(400).json({ message: "Correo o contraseña incorrectos" });

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

// ------------------------
// Confirmación de correo
async function confirmEmail(req, res) {
  const { email, codigo } = req.body;
  try {
    const user = await User.findByEmail(email);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    if (user.correo_confirmado)
      return res.status(400).json({ message: "Correo ya confirmado" });

    if (user.token_confirmacion !== codigo)
      return res.status(400).json({ message: "Código incorrecto" });

    user.correo_confirmado = 1;
    user.token_confirmacion = null;
    await user.save();

    res.json({ message: "Correo confirmado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al confirmar correo" });
  }
}

// ------------------------
// Reenviar código
async function resendCode(req, res) {
  const { email } = req.body;
  try {
    const user = await User.findByEmail(email);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    if (user.correo_confirmado)
      return res.status(400).json({ message: "Correo ya confirmado" });

    await sendVerificationEmail(user);
    res.json({ message: "Código reenviado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al reenviar el código" });
  }
}

module.exports = {
  register,
  registerUser,
  login,
  sendVerificationEmail,
  confirmEmail,
  resendCode,
};
