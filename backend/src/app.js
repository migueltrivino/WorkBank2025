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
const contactRoutes = require("./routes/contact");
const uploadPhotoRoutes = require("./routes/upload-photo"); // 👈 IMPORTANTE

const app = express();

// ------------------------
// Configuración de CORS
app.use(cors({
    origin: "http://localhost:5173",
    methods: "*",
    allowedHeaders: "*",
    credentials: true,
}));

// ------------------------
// Para recibir JSON y datos de formulario
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ------------------------
// Carpeta para archivos subidos
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ------------------------
// Crear carpetas si no existen
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

const contactFilesDir = path.join(__dirname, "uploads/contact_files");
if (!fs.existsSync(contactFilesDir)) {
    fs.mkdirSync(contactFilesDir, { recursive: true });
}

// ------------------------
// Rutas existentes
app.use("/api/auth", authRoutes);
app.use("/api/auth", uploadPhotoRoutes); // 👈 ahora tu endpoint sí existe
app.use("/api/ofertas", offersRoutes);
app.use("/api/postulaciones", postulacionRoutes);
app.use("/api/resenas", resenasRoutes);
app.use("/api/historial", historialRoutes);
app.use("/api/contact", contactRoutes);

module.exports = app;
