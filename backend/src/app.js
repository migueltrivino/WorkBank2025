// backend/src/app.js
const express = require("express");
const path = require("path");
const cors = require("cors");
const fs = require("fs");

// Importar rutas
const authRoutes = require("./routes/authRoutes");
const offersRoutes = require("./routes/offers");
const postulacionRoutes = require("./routes/postulacionRoutes");
const resenasRoutes = require("./routes/resenasRoutes");
const historialRoutes = require("./routes/historialRoutes");

// NUEVO: ruta dedicada para subir fotos
const uploadPhotoRouter = require("./routes/upload-photo");

const app = express();

// Configuración de CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "*",
    allowedHeaders: "*",
    credentials: true,
  })
);

// Para poder recibir JSON y datos de formulario
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Carpeta para archivos subidos
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 🔹 Rutas existentes
app.use("/api/auth", authRoutes); // login, register y otras rutas auth
app.use("/api/ofertas", offersRoutes);
app.use("/api/postulaciones", postulacionRoutes);
app.use("/api/resenas", resenasRoutes);
app.use("/api/historial", historialRoutes);

// 🔹 NUEVO: montar la ruta dedicada para upload-photo
app.use("/api/auth/upload-photo", uploadPhotoRouter);

// Crear carpeta uploads si no existe
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

module.exports = app;
