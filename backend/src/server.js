const express = require("express");
const connection = require("./config/db");

const app = express();
app.use(express.json());

// Ruta de prueba para listar usuarios
app.get("/usuarios", (req, res) => {
  connection.query("SELECT * FROM usuarios", (err, results) => {
    if (err) {
        console.error("❌ Error en la consulta:", err);
        return res.status(500).json({ error: "Error en la base de datos" });
    }
    res.json(results);
    });
});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
