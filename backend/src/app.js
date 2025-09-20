const express = require("express");
const path = require("path");
const cors = require("cors");

// Importar rutas
const authRoutes = require("./routes/authRoutes");
const uploadPhotoRoutes = require("./routes/upload-photo"); // 🔹 Importamos la ruta de fotos
const offersRoutes = require("./routes/offers");
const postulacionRoutes = require("./routes/postulacionRoutes");
const resenasRoutes = require("./routes/resenasRoutes");
const historialRoutes = require("./routes/historialRoutes");

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

// 🔹 Rutas
app.use("/api/auth", authRoutes); // login y register
app.use("/api/auth/upload-photo", uploadPhotoRoutes); // subida de fotos + descripción
app.use("/api/ofertas", offersRoutes);
app.use("/api/postulaciones", postulacionRoutes);
app.use("/api/resenas", resenasRoutes);
app.use("/api/historial", historialRoutes);

module.exports = app;
