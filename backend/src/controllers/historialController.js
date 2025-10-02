const HistorialModel = require("../models/historial_model");

// Obtener historial de un usuario
const getHistorialByUsuario = async (req, res) => {
  const { id_usuario } = req.params;

  try {
    const historial = await HistorialModel.findByUsuario(id_usuario);
    res.json(historial);
  } catch (error) {
    console.error("Error al obtener historial:", error);
    res.status(500).json({ message: "Error al obtener historial" });
  }
};

// Crear un registro en el historial
const createHistorial = async (req, res) => {
  const { idRol, idUsuario, idCategoria, idServicio } = req.body;

  try {
    const newId = await HistorialModel.createHistorial(
      idRol,
      idUsuario,
      idCategoria,
      idServicio
    );
    res.status(201).json({ message: "Historial creado", id: newId });
  } catch (error) {
    console.error("Error al crear historial:", error);
    res.status(500).json({ message: "Error al crear historial" });
  }
};

module.exports = {
  getHistorialByUsuario,
  createHistorial,
};