// backend/src/models/user.js
const db = require("../config/db");

class User {
  static async create(userData) {
    // normalizar nombres (aceptamos alias)
    const nombre = userData.nombre ?? null;
    const apellido = userData.apellido ?? null;
    const correo = userData.correo ?? userData.email ?? null; // aceptamos "email" o "correo"
    const user_password = userData.user_password ?? userData.password ?? null;
    const tipo_documento = userData.tipo_documento ?? userData.tipoDocumento ?? null;
    const numero_documento = userData.numero_documento ?? userData.numeroDocumento ?? null;
    const id_rol = userData.id_rol ?? userData.rol ?? null;
    const documento_pdf = userData.documento_pdf ?? userData.documentoPdf ?? null;

    const [result] = await db.execute(
      `INSERT INTO usuarios
      (nombre, apellido, correo, user_password, tipo_documento, numero_documento, id_rol, documento_pdf)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [nombre, apellido, correo, user_password, tipo_documento, numero_documento, id_rol, documento_pdf]
    );

    // devolvemos id_usuario (coincidente con la BD)
    return {
      id_usuario: result.insertId,
      nombre,
      apellido,
      correo,
      tipo_documento,
      numero_documento,
      id_rol,
      documento_pdf,
    };
  }

  static async findByEmail(emailOrCorreo) {
    const correo = emailOrCorreo;
    const [rows] = await db.execute("SELECT * FROM usuarios WHERE correo = ?", [correo]);
    if (!rows[0]) return null;
    const user = rows[0];
    return {
      ...user,
      rol: user.id_rol, // mapear para compatibilidad frontend si lo necesita
    };
  }
}

module.exports = User;
