// backend/src/routes/authRoutes.js
const express = require("express");
const multer = require("multer");
const path = require("path");
const { register, login } = require("../controllers/authController");
const db = require("../config/db");

const router = express.Router();

// Multer: guardamos en src/uploads (app.js sirve esa carpeta)
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "src/uploads/"); // asegúrate que exista esta carpeta
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });
  const upload = multer({ storage });

  router.post("/register", upload.single("documento_pdf"), register);


// Login
router.post("/login", login);

// Subir foto + descripción (campo de archivo esperado: "foto")
router.post("/upload-photo", upload.single("foto"), async (req, res) => {
  try {
    const { id_usuario, descripcion } = req.body;
    const fotoFilename = req.file ? req.file.filename : null;

    // Guardar en DB: columna que existe es "imagen_perfil" y "descripcion"
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

module.exports = router;
