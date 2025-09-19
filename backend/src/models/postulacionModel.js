const pool = require("../config/db");

const Postulacion = {
  // Crear una nueva postulación
  create: async (data) => {
    const query = `
      INSERT INTO postulacion (fecha_postu, estado_postu, id_usuario, id_oferta)
      VALUES (CURDATE(), 'pendiente', ?, ?)
    `;
    const [result] = await pool.query(query, [data.id_usuario, data.id_oferta]);
    return result.insertId;
  },

  // Ver postulaciones por usuario
  getByUser: async (id_usuario) => {
    const [rows] = await pool.query(
      `SELECT p.*, o.titulo_oferta, o.descripcion_oferta 
       FROM postulacion p
       JOIN ofertas_laborales o ON p.id_oferta = o.id_oferta
       WHERE p.id_usuario = ?`,
      [id_usuario]
    );
    return rows;
  },

  // Ver postulaciones por oferta (para el empleador)
  getByOffer: async (id_oferta) => {
    const [rows] = await pool.query(
      `SELECT p.*, u.nombre, u.email
       FROM postulacion p
       JOIN usuarios u ON p.id_usuario = u.id_usuario
       WHERE p.id_oferta = ?`,
      [id_oferta]
    );
    return rows;
  },
};

module.exports = Postulacion;