const Postulacion = require("../models/postulacionModel");

exports.createPostulacion = async (req, res) => {
  try {
    const { id_usuario, id_oferta } = req.body;

    if (!id_usuario || !id_oferta) {
      return res.status(400).json({ message: "Faltan datos obligatorios" });
    }

    const id = await Postulacion.create({ id_usuario, id_oferta });
    res.status(201).json({ message: "Postulación creada con éxito", id });
  } catch (error) {
    console.error("Error al crear postulación:", error);
    res.status(500).json({ message: "Error al crear postulación" });
  }
};

exports.getPostulacionesByUser = async (req, res) => {
  try {
    const { id_usuario } = req.params;
    const postulaciones = await Postulacion.getByUser(id_usuario);
    res.json(postulaciones);
  } catch (error) {
    console.error("Error al obtener postulaciones:", error);
    res.status(500).json({ message: "Error al obtener postulaciones" });
  }
};

exports.getPostulacionesByOffer = async (req, res) => {
  try {
    const { id_oferta } = req.params;
    const postulaciones = await Postulacion.getByOffer(id_oferta);
    res.json(postulaciones);
  } catch (error) {
    console.error("Error al obtener postulaciones:", error);
    res.status(500).json({ message: "Error al obtener postulaciones" });
  }
};