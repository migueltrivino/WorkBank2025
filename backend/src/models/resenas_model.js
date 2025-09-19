const db = require("../config/db");

const ResenasModel = {
  async findByDestinatario(idUsuario) {
    const [rows] = await db.query(
      `SELECT r.id_resena, r.contenido_resena, r.puntaje_resena, r.fecha_resena,
              u.nombre AS autor_nombre, u.apellido AS autor_apellido
       FROM resena r
       JOIN usuarios u ON r.id_usuario = u.id_usuario
       WHERE r.id_destinatario = ?`,
      [idUsuario]
    );
    return rows;
  },

  async create({ id_usuario, id_destinatario, contenido_resena, puntaje_resena }) {
    const [result] = await db.query(
      `INSERT INTO resena (id_usuario, id_destinatario, contenido_resena, puntaje_resena, fecha_resena)
       VALUES (?, ?, ?, ?, CURDATE())`,
      [id_usuario, id_destinatario, contenido_resena, puntaje_resena]
    );
    return result.insertId;
  },
};

module.exports = ResenasModel;