const express = require("express");
const multer = require("multer");
const fs = require("fs");
const {
  register,
  login,
  confirmEmail,
  resendCode,
  cancelRegistration
} = require("../controllers/authController");

const router = express.Router();

// ------------------------
// Crear carpeta uploads si no existe
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// ------------------------
// Multer: configuración para guardar archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// ------------------------
// Registro con PDF
// ⚡ Se pasa directamente el handler register
router.post("/register", upload.single("documento_pdf"), register);

// ------------------------
// Login
router.post("/login", login);

// ------------------------
// Confirmación de correo
router.post("/confirm-email", confirmEmail);

// ------------------------
// Reenviar código de verificación
router.post("/resend-code", resendCode);

// ------------------------
// Cancelar registro y eliminar usuario
router.delete("/cancel-registration", cancelRegistration);

module.exports = router;
