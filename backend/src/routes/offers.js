const express = require("express");
const router = express.Router();
const offerController = require("../controllers/offersController");

router.post("/", offerController.createOffer);

module.exports = router;
