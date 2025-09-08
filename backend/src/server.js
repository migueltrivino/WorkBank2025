const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const offerRoutes = require("./routes/offers");

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use("/api/ofertas", offerRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

