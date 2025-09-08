const pool = require("../config/db");

const Offer = {
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
    return result.insertId; // Aquí sigue devolviendo el ID auto-generado
  }
};

module.exports = Offer;



