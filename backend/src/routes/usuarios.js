const express = require("express");
const router = express.Router();
const { getUsuarios, addUsuario } = require("../controllers/usuariosController");

// GET -> lista de usuarios
router.get("/", getUsuarios);

// POST -> crear nuevo usuario
router.post("/", addUsuario);

module.exports = router;