// backend/src/routes/authRoutes.js
const express = require("express");
const multer = require("multer");
const fs = require("fs");
const { 
  register, 
  login, 
  confirmEmail, 
  resendCode,
  registerUser
} = require("../controllers/authController");
const db = require("../config/db");

const router = express.Router();
 
// ------------------------
// Crear carpeta uploads si no existe
const uploadDir = "src/uploads";
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// Multer: guardamos en src/uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// ------------------------
// Registro con PDF (mejorado para permitir reintento si usuario no confirmado)
router.post("/register", upload.single("documento_pdf"), async (req, res) => {
  try {
    const payload = { ...req.body };

    console.log("Payload recibido en registro:", payload);

    if (req.file && !payload.documento_pdf) {
      payload.documento_pdf = req.file.filename;
    }

    const newUser = await registerUser(payload);

    console.log("Nuevo usuario a crear:", newUser);

    return res.status(201).json({
      message:
        "Usuario registrado con éxito (Paso 1). Se ha enviado un correo de verificación",
      user: {
        id_usuario: newUser.id_usuario,
        nombre: newUser.nombre,
        apellido: newUser.apellido,
        correo: newUser.correo,
      },
    });
  } catch (error) {
    console.error("Error en /register:", error);
    return res.status(400).json({ message: error.message });
  }
});

// ------------------------
// Login
router.post("/login", login);

// ------------------------
// Subir foto + descripción (campo de archivo esperado: "foto")
router.post("/upload-photo", upload.single("foto"), async (req, res) => {
  try {
    const { id_usuario, descripcion } = req.body;
    const fotoFilename = req.file ? req.file.filename : null;

    if (!id_usuario) {
      return res.status(400).json({ message: "id_usuario es requerido" });
    }

    await db.execute(
      "UPDATE usuarios SET imagen_perfil = ?, descripcion = ? WHERE id_usuario = ?",
      [fotoFilename, descripcion ?? null, id_usuario]
    );

    return res.json({ message: "Foto y descripción guardadas con éxito" });
  } catch (err) {
    console.error("Error en /upload-photo:", err);
    return res.status(500).json({ message: "Error al guardar la foto" });
  }
});

// ------------------------
// Confirmación de correo
router.post("/confirm-email", confirmEmail);

// Reenviar código de verificación
router.post("/resend-code", resendCode);

module.exports = router;
