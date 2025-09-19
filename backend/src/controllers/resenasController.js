const ResenasModel = require("../models/resenas_model");

// Obtener reseñas por usuario
const getResenasByUsuario = async (req, res) => {
  const { idUsuario } = req.params;
  try {
    const reseñas = await ResenasModel.findByDestinatario(idUsuario);
    res.json(reseñas);
  } catch (error) {
    console.error("Error al obtener reseñas:", error);
    res.status(500).json({ message: "Error al obtener reseñas" });
  }
};

// Crear reseña
const createResena = async (req, res) => {
  const { id_usuario, id_destinatario, contenido_resena, puntaje_resena } = req.body;
  try {
    const id = await ResenasModel.create({
      id_usuario,
      id_destinatario,
      contenido_resena,
      puntaje_resena,
    });
    res.status(201).json({ message: "Reseña creada exitosamente", id_resena: id });
  } catch (error) {
    console.error("Error al crear reseña:", error);
    res.status(500).json({ message: "Error al crear reseña" });
  }
};

module.exports = { getResenasByUsuario, createResena };