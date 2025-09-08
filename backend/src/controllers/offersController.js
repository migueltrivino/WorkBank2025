const Offer = require("../models/offerModel");

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
