const express = require("express");
const app = express();

// Middleware para interpretar JSON
app.use(express.json());

// Importamos rutas
const usuariosRoutes = require("./routes/usuarios");
app.use("/api/usuarios", usuariosRoutes);

// Ruta de prueba
app.get("/", (req, res) => {
    res.send("Bienvenido a WorkBank Backend ");
});

module.exports = app;
