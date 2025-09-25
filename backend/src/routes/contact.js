// backend/src/routes/contact.js
const express = require("express");
const { saveContact } = require("../controllers/contactController");

const router = express.Router();

// Middleware de subida de archivos
const upload = require('../middlewares/uploadContact'); // ajusta la ruta

// POST /api/contact -> llama al controlador
router.post("/", upload.single("adjunto"), saveContact);

module.exports = router;
