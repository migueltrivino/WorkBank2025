const express = require("express");
const router = express.Router();
const { register } = require("../controllers/authController");
const { login } = require("../controllers/authController")
const multer = require("multer");

// Configuración multer para guardar PDFs
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Ruta de registro con multer para recibir el PDF
router.post("/register", upload.single("documentoPdf"), register);

router.post("/login", login)

module.exports = router;