const Offer = require("../models/offerModel");

// ==========================
// CREAR OFERTA
// ==========================
exports.createOffer = async (req, res) => {
  try {
    const newOffer = req.body;

    if (
      !newOffer.titulo_oferta ||
      !newOffer.descripcion_oferta ||
      !newOffer.fecha_vencimiento ||
      !newOffer.id_servicio ||
      !newOffer.id_categoria ||
      !newOffer.id_usuario
    ) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    if (!newOffer.fecha_publicacion) newOffer.fecha_publicacion = new Date();

    const id = await Offer.create(newOffer);
    const createdOffer = await Offer.getById(id);

    res.status(201).json({ message: "Oferta creada con éxito", offer: createdOffer });
  } catch (error) {
    console.error("Error al crear oferta:", error);
    res.status(500).json({ message: "Error al crear la oferta" });
  }
};

// ==========================
// OBTENER OFERTAS
// ==========================
exports.getOffers = async (req, res) => {
  try {
    const offers = await Offer.getAll();
    res.status(200).json(offers);
  } catch (error) {
    console.error("Error al obtener ofertas:", error);
    res.status(500).json({ message: "Error al obtener las ofertas" });
  }
};

exports.getOfferById = async (req, res) => {
  try {
    const { id } = req.params;
    const offer = await Offer.getById(id);
    if (!offer) return res.status(404).json({ message: "No se encontró la oferta" });

    res.status(200).json(offer);
  } catch (error) {
    console.error("Error al obtener la oferta:", error);
    res.status(500).json({ message: "Error al obtener la oferta" });
  }
};

exports.getOffersByUser = async (req, res) => {
  try {
    const { id_usuario } = req.params;
    if (!id_usuario) return res.status(400).json({ message: "ID de usuario requerido" });

    const offers = await Offer.getByUserId(id_usuario);
    res.status(200).json(offers);
  } catch (error) {
    console.error("Error al obtener ofertas del usuario:", error);
    res.status(500).json({ message: "Error al obtener las ofertas del usuario" });
  }
};

// ==========================
// ACTUALIZAR OFERTA
// ==========================
exports.updateOffer = async (req, res) => {
  try {
    const { id_oferta } = req.params; // coincide con router.put("/:id_oferta")
    const data = req.body;

    const affectedRows = await Offer.update(id_oferta, data);

    if (affectedRows === 0) {
      return res.status(404).json({ message: "No se encontró la oferta para actualizar" });
    }

    const updatedOffer = await Offer.getById(id_oferta);

    res.status(200).json({
      message: "Oferta actualizada con éxito",
      offer: updatedOffer, // <-- importante para frontend
    });
  } catch (error) {
    console.error("Error al actualizar oferta:", error);
    res.status(500).json({ message: "Error al actualizar la oferta" });
  }
};

// ==========================
// ELIMINAR OFERTA
// ==========================
exports.deleteOffer = async (req, res) => {
  try {
    const { id_oferta } = req.params;

    const affectedRows = await Offer.delete(id_oferta);

    if (affectedRows === 0) {
      return res.status(404).json({ message: "No se encontró la oferta para eliminar" });
    }

    res.status(200).json({ message: "Oferta eliminada con éxito" });
  } catch (error) {
    console.error("Error al eliminar oferta:", error);
    res.status(500).json({ message: "Error al eliminar la oferta" });
  }
};