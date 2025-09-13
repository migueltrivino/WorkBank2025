const Offer = require("../models/offerModel");

// Crear una nueva oferta
exports.createOffer = async (req, res) => {
  try {
    const newOffer = req.body;
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

// Obtener una oferta por ID
exports.getOfferById = async (req, res) => {
  try {
    const { id } = req.params;
    const offer = await Offer.getById(id);

    if (!offer) {
      return res.status(404).json({ message: "Oferta no encontrada" });
    }

    res.status(200).json(offer);
  } catch (error) {
    console.error("Error al obtener oferta:", error);
    res.status(500).json({ message: "Error al obtener la oferta" });
  }
};

// Obtener ofertas por usuario
exports.getOffersByUser = async (req, res) => {
  try {
    const { id_usuario } = req.params;
    const offers = await Offer.getByUser(id_usuario);

    res.status(200).json(offers);
  } catch (error) {
    console.error("Error al obtener ofertas del usuario:", error);
    res.status(500).json({ message: "Error al obtener las ofertas del usuario" });
  }
};
