const express = require("express");
const { getResenasByUsuario, createResena } = require("../controllers/resenasController");

const router = express.Router();

router.get("/usuario/:idUsuario", getResenasByUsuario);
router.post("/", createResena);

module.exports = router;