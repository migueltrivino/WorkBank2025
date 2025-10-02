const Postulacion = require("../models/postulacionModel");
const Oferta = require("../models/offerModel");

// Crear postulación
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
    res.status(500).json({ message: "Error al crear postulación", error: error.message });
  }
};

// Obtener postulaciones de un usuario
exports.getPostulacionesByUser = async (req, res) => {
  try {
    const { id_usuario } = req.params;
    const postulaciones = await Postulacion.getByUser(id_usuario);
    res.json(postulaciones);
  } catch (error) {
    console.error("Error al obtener postulaciones:", error);
    res.status(500).json({ message: "Error al obtener postulaciones", error: error.message });
  }
};

// Obtener postulaciones por oferta
exports.getPostulacionesByOffer = async (req, res) => {
  try {
    const { id_oferta } = req.params;
    const postulaciones = await Postulacion.getByOffer(id_oferta);
    res.json(postulaciones);
  } catch (error) {
    console.error("Error al obtener postulaciones:", error);
    res.status(500).json({ message: "Error al obtener postulaciones", error: error.message });
  }
};

// Obtener ofertas del usuario con sus postulaciones
exports.getOfertasDelUsuarioConPostulaciones = async (req, res) => {
  try {
    const { id_usuario } = req.params;

    // Traer ofertas del usuario
    const ofertas = await Oferta.getByUserId(id_usuario);

    // Traer postulaciones de cada oferta (solo id y nombre del postulante)
    const resultado = await Promise.all(
      ofertas.map(async (oferta) => {
        const postulaciones = await Postulacion.getByOffer(oferta.id_oferta);
        return { oferta, postulaciones };
      })
    );

    res.json(resultado);
  } catch (error) {
    console.error("Error al obtener ofertas con postulaciones:", error);
    res.status(500).json({ message: "Error al obtener ofertas con postulaciones" });
  }
};
