const express = require("express");
const authRoutes = require("./routes/authRoutes");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(cors());

// Para poder recibir JSON y datos de formulario
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Carpeta para archivos subidos
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Rutas
app.use("/api/auth", authRoutes);

module.exports = app;