const express = require("express");
const router = express.Router();
const offerController = require("../controllers/offersController");

// Crear oferta
router.post("/", offerController.createOffer);

// Obtener todas las ofertas de un usuario
router.get("/usuario/:id_usuario", offerController.getOffersByUser);

// Obtener todas las ofertas
router.get("/", offerController.getOffers);

// Actualizar oferta
router.put("/:id_oferta", offerController.updateOffer);

// Eliminar oferta
router.delete("/:id_oferta", offerController.deleteOffer);

// Obtener una oferta por ID (al final)
router.get("/:id", offerController.getOfferById);

module.exports = router;

