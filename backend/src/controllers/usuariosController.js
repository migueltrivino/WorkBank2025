
const { getAllUsuarios, createUsuario } = require("../models/usuariosModel");

// GET - todos los usuarios
const getUsuarios = (req, res) => {
    getAllUsuarios((err, data) => {
    if (err) {
        return res.status(500).json({ error: "Error al obtener usuarios" });
    }
    res.json(data);
    });
};

// POST - crear usuario
const addUsuario = (req, res) => {
    const nuevoUsuario = req.body;

    if (!nuevoUsuario.nombre || !nuevoUsuario.apellido || !nuevoUsuario.correo) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    createUsuario(nuevoUsuario, (err, data) => {
    if (err) {
        return res.status(500).json({ error: "Error al crear usuario" });
    }
    res.status(201).json(data);
    });
};

module.exports = { getUsuarios, addUsuario };

