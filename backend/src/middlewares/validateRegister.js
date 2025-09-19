// middlewares/validateRegister.js
module.exports = (req, res, next) => {
  const { nombre, apellido, email, password, tipoDocumento, numeroDocumento, rol } = req.body;

  if (!nombre || !apellido || !email || !password || !tipoDocumento || !numeroDocumento || !rol) {
    return res.status(400).json({ message: "Todos los campos son obligatorios" });
  }

  next();
};