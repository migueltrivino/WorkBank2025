const pool = require("../config/db");

const Offer = {
  create: async (data) => {
    const query = `
      INSERT INTO ofertas_laborales 
      (titulo_oferta, descripcion_oferta, pago, fecha_publicacion, fecha_vencimiento, id_servicio, id_categoria, id_usuario)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await pool.query(query, [
      data.titulo_oferta,
      data.descripcion_oferta,
      data.pago,
      data.fecha_publicacion,
      data.fecha_vencimiento,
      data.id_servicio,
      data.id_categoria,
      data.id_usuario,
    ]);
    return result.insertId;
  },

  getAll: async () => {
    const [rows] = await pool.query(`
      SELECT 
        o.id_oferta, o.titulo_oferta, o.descripcion_oferta, o.pago, 
        o.fecha_publicacion, o.fecha_vencimiento,
        u.nombre AS nombre_empleador,
        c.nombre_categoria AS categoria,
        s.nombre_servicio AS servicio
      FROM ofertas_laborales o
      JOIN usuarios u ON o.id_usuario = u.id_usuario
      JOIN categoria c ON o.id_categoria = c.id_categoria
      JOIN servicio s ON o.id_servicio = s.id_servicio
      ORDER BY o.fecha_publicacion DESC
    `);
    return rows;
  },

  getByUserId: async (id_usuario) => {
    const [rows] = await pool.query(`
      SELECT 
        o.id_oferta, o.titulo_oferta, o.descripcion_oferta, o.pago, 
        o.fecha_publicacion, o.fecha_vencimiento,
        c.nombre_categoria AS categoria,
        s.nombre_servicio AS servicio
      FROM ofertas_laborales o
      JOIN categoria c ON o.id_categoria = c.id_categoria
      JOIN servicio s ON o.id_servicio = s.id_servicio
      WHERE o.id_usuario = ?
      ORDER BY o.fecha_publicacion DESC
    `, [id_usuario]);
    return rows;
  },

  getById: async (id) => {
    const [rows] = await pool.query(
      "SELECT * FROM ofertas_laborales WHERE id_oferta = ?",
      [id]
    );
    return rows[0];
  },

  update: async (id_oferta, data) => {
    const fields = [];
    const values = [];

    for (const key in data) {
      fields.push(`${key} = ?`);
      values.push(data[key]);
    }

    if (fields.length === 0) throw new Error("No hay campos para actualizar");

    const [result] = await pool.query(
      `UPDATE ofertas_laborales SET ${fields.join(", ")} WHERE id_oferta = ?`,
      [...values, id_oferta]
    );

    return result.affectedRows;
  },

  delete: async (id_oferta) => {
    const [result] = await pool.query(
      "DELETE FROM ofertas_laborales WHERE id_oferta = ?",
      [id_oferta]
    );
    return result.affectedRows;
  }
};

module.exports = Offer;
