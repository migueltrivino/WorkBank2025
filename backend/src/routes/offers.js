const express = require("express");
const router = express.Router();
const offerController = require("../controllers/offersController");

// Crear oferta
router.post("/", offerController.createOffer);

// Obtener todas las ofertas de un usuario (empleador)
router.get("/usuario/:id_usuario", offerController.getOffersByUser);

// (Opcional) Obtener todas las ofertas
router.get("/", offerController.getOffers);

// (Opcional) Obtener una oferta por ID
router.get("/:id", offerController.getOfferById);

module.exports = router;


