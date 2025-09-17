const Offer = require("../models/offerModel");

// Crear una nueva oferta
exports.createOffer = async (req, res) => {
  try {
    const newOffer = req.body;

    // Validaciones básicas
    if (
      !newOffer.titulo_oferta ||
      !newOffer.descripcion_oferta ||
      !newOffer.fecha_vencimiento ||
      !newOffer.id_servicio ||
      !newOffer.id_categoria ||
      !newOffer.id_usuario
    ) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios" });
    }

    // Fecha de publicación si no viene del frontend
    if (!newOffer.fecha_publicacion) newOffer.fecha_publicacion = new Date();

    const id = await Offer.create(newOffer);
    res.status(201).json({ message: "Oferta creada con éxito", id });
  } catch (error) {
    console.error("Error al crear oferta:", error);
    res.status(500).json({ message: "Error al crear la oferta" });
  }
};

// Obtener todas las ofertas
exports.getOffers = async (req, res) => {
  try {
    const offers = await Offer.getAll();
    res.status(200).json(offers);
  } catch (error) {
    console.error("Error al obtener ofertas:", error);
    res.status(500).json({ message: "Error al obtener las ofertas" });
  }
};

// Obtener oferta por ID
exports.getOfferById = async (req, res) => {
  try {
    const { id } = req.params;
    const offer = await Offer.getById(id);

    if (!offer)
      return res.status(404).json({ message: "No se encontró la oferta" });

    res.status(200).json(offer);
  } catch (error) {
    console.error("Error al obtener la oferta:", error);
    res.status(500).json({ message: "Error al obtener la oferta" });
  }
};

// Obtener todas las ofertas de un usuario
exports.getOffersByUser = async (req, res) => {
  try {
    const { id_usuario } = req.params;
    if (!id_usuario) {
      return res.status(400).json({ message: "ID de usuario requerido" });
    }

    const offers = await Offer.getByUser(id_usuario);
    res.status(200).json(offers);
  } catch (error) {
    console.error("Error al obtener ofertas del usuario:", error);
    res
      .status(500)
      .json({ message: "Error al obtener las ofertas del usuario" });
  }
};


