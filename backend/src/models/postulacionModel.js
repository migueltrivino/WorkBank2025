const pool = require("../config/db");

const Postulacion = {
  create: async (data) => {
    const query = `
      INSERT INTO postulacion (fecha_postu, estado_postu, id_usuario, id_oferta)
      VALUES (NOW(), 'Pendiente', ?, ?)
    `;
    const [result] = await pool.query(query, [data.id_usuario, data.id_oferta]);
    return result.insertId;
  },

  getByUser: async (id_usuario) => {
    const [rows] = await pool.query(`
      SELECT 
        p.id_postulacion, p.fecha_postu, p.estado_postu,
        o.id_oferta, o.titulo_oferta, o.descripcion_oferta,
        u.nombre AS nombre_empleador,
        c.nombre_categoria AS categoria,
        s.nombre_servicio AS servicio
      FROM postulacion p
      JOIN ofertas_laborales o ON p.id_oferta = o.id_oferta
      JOIN usuarios u ON o.id_usuario = u.id_usuario
      JOIN categoria c ON o.id_categoria = c.id_categoria
      JOIN servicio s ON o.id_servicio = s.id_servicio
      WHERE p.id_usuario = ?
      ORDER BY p.fecha_postu DESC
    `, [id_usuario]);
    return rows;
  },

  getByOffer: async (id_oferta) => {
    const [rows] = await pool.query(`
      SELECT 
        p.id_postulacion, p.fecha_postu, p.estado_postu AS estado,
        u.id_usuario, u.nombre
      FROM postulacion p
      JOIN usuarios u ON p.id_usuario = u.id_usuario
      WHERE p.id_oferta = ?
    `, [id_oferta]);
    return rows;
  },
};

module.exports = Postulacion;
