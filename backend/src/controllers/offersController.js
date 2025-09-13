const Offer = require("../models/offerModel");

//  Crear oferta
exports.createOffer = async (req, res) => {
  try {
    const newOffer = req.body;
    const id = await Offer.create(newOffer);
    res.status(201).json({ message: "Oferta creada con éxito", id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear la oferta" });
  }
};

//  Obtener todas las ofertas de un usuario
exports.getOffersByUser = async (req, res) => {
  try {
    const userId = req.params.id; // id_usuario que viene en la URL
    const offers = await Offer.findByUser(userId);
    res.status(200).json(offers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener las ofertas" });
  }
};

