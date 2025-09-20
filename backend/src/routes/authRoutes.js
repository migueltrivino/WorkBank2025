const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const multer = require("multer");
const path = require("path");

// Configuración multer para PDFs y fotos
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Ruta de registro con PDF
router.post("/register", upload.single("documentoPdf"), register);
router.post("/login", login);

// 🔹 Nueva ruta para subir foto + descripción
router.post("/upload-photo", upload.single("foto"), async (req, res) => {
  try {
    const { id_usuario, descripcion } = req.body;
    const foto = req.file ? req.file.filename : null;

    // Aquí debes guardar en la DB la foto y descripción para el usuario
    // Ejemplo con MySQL:
    // await db.query("UPDATE usuarios SET foto = ?, descripcion = ? WHERE id_usuario = ?", [foto, descripcion, id_usuario]);

    res.json({ message: "Foto y descripción guardadas con éxito" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al guardar la foto" });
  }
});

module.exports = router;
