const db = require("../config/db");

const HistorialModel = {
  // Buscar historial de un usuario
  async findByUsuario(id_usuario) {
    const [rows] = await db.query(
      `SELECT h.id_historial, r.nombre AS rol, c.nombre AS categoria, s.nombre AS servicio
       FROM historial_contratacion h
       JOIN rol r ON h.id_rol = r.id_rol
       JOIN categoria c ON h.id_categoria = c.id_categoria
       JOIN servicio s ON h.id_servicio = s.id_servicio
       WHERE h.id_usuario = ?`,
      [id_usuario]
    );
    return rows;
  },

  // Crear historial
  async createHistorial(idRol, idUsuario, idCategoria, idServicio) {
    const [result] = await db.query(
      `INSERT INTO historial_contratacion (id_rol, id_usuario, id_categoria, id_servicio)
       VALUES (?, ?, ?, ?)`,
      [idRol, idUsuario, idCategoria, idServicio]
    );
    return result.insertId;
  },
};

module.exports = HistorialModel;