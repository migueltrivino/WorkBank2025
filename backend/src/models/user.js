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

    return { id: result.insertId, ...userData };
  }

  static async findByEmail(email) {
    const [rows] = await db.execute("SELECT * FROM usuarios WHERE correo = ?", [email]);
    return rows[0];
  }
}

module.exports = User;