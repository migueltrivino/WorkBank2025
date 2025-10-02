// backend/src/middlewares/validateRegister.js
module.exports = (req, res, next) => {
  const { nombre, apellido, correo, user_password, tipo_documento, numero_documento, rol } = req.body;

  if (!nombre || !apellido || !correo || !user_password || !tipo_documento || !numero_documento || !rol) {
    return res.status(400).json({ message: "Todos los campos son obligatorios" });
  }

  next();
};
