const express = require("express");
const router = express.Router();
const postulacionController = require("../controllers/postulacionController");

// Crear postulación
router.post("/", postulacionController.createPostulacion);

// Ver postulaciones de un usuario
router.get("/usuario/:id_usuario", postulacionController.getPostulacionesByUser);

router.get("/ofertas-del-usuario/:id_usuario", postulacionController.getOfertasDelUsuarioConPostulaciones);


// Ver postulaciones de una oferta
router.get("/oferta/:id_oferta", postulacionController.getPostulacionesByOffer);

module.exports = router;