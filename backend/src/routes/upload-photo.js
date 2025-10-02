// backend/routes/upload-photo.js
const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const db = require("../config/db");

// ======================
// Configuración de Multer
// ======================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // carpeta donde se guardarán las fotos
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const userId = req.body.id_usuario;

    if (!userId) {
      return cb(new Error("id_usuario es obligatorio para nombrar la foto"));
    }

    cb(null, `foto_${userId}${ext}`);
  },
});

const upload = multer({ storage });

// ======================
// Endpoint: Subir foto + descripción
// ======================
router.post("/upload-photo", upload.single("foto"), async (req, res) => {
  try {
    const { id_usuario, descripcion } = req.body;
    const fotoPath = req.file ? req.file.filename : null;

    if (!id_usuario) {
      return res.status(400).json({ message: "id_usuario es obligatorio" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No se subió ningún archivo" });
    }

    // 🔹 Guardar en DB
    await db.query(
      "UPDATE usuarios SET imagen_perfil = ?, descripcion = ? WHERE id_usuario = ?",
      [fotoPath, descripcion, id_usuario]
    );

    return res.json({
      message: "✅ Foto y descripción guardadas con éxito",
      imagen_perfil: fotoPath,
    });
  } catch (error) {
    console.error("Error al subir la foto:", error);
    return res.status(500).json({ message: "Error al subir la foto" });
  }
});

module.exports = router;
