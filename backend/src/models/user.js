const db = require("../config/db");

class User {
  static async create(userData) {
    const {
      nombre,
      apellido,
      email,            
      user_password,
      tipoDocumento,
      numeroDocumento,
      rol,
      documentoPdf
    } = userData;

    const [result] = await db.execute(
      `INSERT INTO usuarios 
      (nombre, apellido, correo, user_password, tipo_documento, numero_documento, id_rol, documento_pdf)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [nombre, apellido, email, user_password, tipoDocumento, numeroDocumento, rol, documentoPdf]
    );

    // devolvemos id_usuarios con el nombre real de la columna
    return { id_usuarios: result.insertId, ...userData };
  }

  static async findByEmail(email) {
    const [rows] = await db.execute("SELECT * FROM usuarios WHERE correo = ?", [email]);
    if (!rows[0]) return null;

    const user = rows[0];

    // Mapear id_rol a rol para que el frontend lo reciba correctamente
    return {
      ...user,
      rol: user.id_rol
    };
  }
}
module.exports = User;
