const express = require("express");
const router = express.Router();
const offerController = require("../controllers/offersController");

//  Crear oferta
router.post("/", offerController.createOffer);

//  Obtener todas las ofertas de un usuario (empleador)
router.get("/usuario/:id", offerController.getOffersByUser);

module.exports = router;

