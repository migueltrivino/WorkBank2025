const pool = require("../config/db");

const Offer = {
  // Crear una oferta
  create: async (data) => {
    const query = `
      INSERT INTO ofertas_laborales 
      (titulo_oferta, descripcion_oferta, fecha_vencimiento, id_servicio, id_categoria, id_usuario, fecha_publicacion)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await pool.query(query, [
      data.titulo_oferta,
      data.descripcion_oferta,
      data.fecha_vencimiento,
      data.id_servicio,
      data.id_categoria,
      data.id_usuario,
      data.fecha_publicacion
    ]);
    return result.insertId;
  },

  // Obtener todas las ofertas
  getAll: async () => {
    const [rows] = await pool.query("SELECT * FROM ofertas_laborales");
    return rows;
  },

  // Obtener una oferta por ID
  getById: async (id) => {
    const [rows] = await pool.query("SELECT * FROM ofertas_laborales WHERE id_oferta = ?", [id]);
    return rows[0];
  },

  // Obtener todas las ofertas de un usuario
  getByUser: async (id_usuario) => {
    const query = `
      SELECT id_oferta, titulo_oferta, descripcion_oferta, fecha_vencimiento, fecha_publicacion
      FROM ofertas_laborales
      WHERE id_usuario = ?
      ORDER BY fecha_publicacion DESC
    `;
    const [rows] = await pool.query(query, [id_usuario]);
    return rows;
  }
};

module.exports = Offer;





