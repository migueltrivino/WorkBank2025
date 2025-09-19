const express = require("express");
const router = express.Router();
const historialController = require("../controllers/historialController");

// Ver historial de un usuario
router.get("/usuario/:id_usuario", historialController.getHistorialByUsuario);

// Crear historial
router.post("/", historialController.createHistorial);

module.exports = router;