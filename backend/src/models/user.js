const db = require("../config/db");

class User {
  static async create(userData) {
    const nombre = userData.nombre ?? null;
    const apellido = userData.apellido ?? null;
    const correo = userData.correo ?? userData.email ?? null;
    const user_password = userData.user_password ?? userData.password ?? null;
    const tipo_documento = userData.tipo_documento ?? userData.tipoDocumento ?? null;
    const numero_documento = userData.numero_documento ?? userData.numeroDocumento ?? null;
    const id_rol = userData.id_rol ?? userData.rol ?? null;
    const documento_pdf = userData.documento_pdf ?? userData.documentoPdf ?? null;
    const token_confirmacion = userData.token_confirmacion ?? null;
    const correo_confirmado = userData.correo_confirmado ?? 0;

    const [result] = await db.execute(
      `INSERT INTO usuarios
      (nombre, apellido, correo, user_password, tipo_documento, numero_documento, id_rol, documento_pdf, token_confirmacion, correo_confirmado)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        nombre,
        apellido,
        correo,
        user_password,
        tipo_documento,
        numero_documento,
        id_rol,
        documento_pdf,
        token_confirmacion,
        correo_confirmado,
      ]
    );

    return {
      id_usuario: result.insertId,
      nombre,
      apellido,
      correo,
      tipo_documento,
      numero_documento,
      id_rol,
      documento_pdf,
      token_confirmacion,
      correo_confirmado,
    };
  }

  static async findByEmail(emailOrCorreo) {
    const correo = emailOrCorreo;
    const [rows] = await db.execute("SELECT * FROM usuarios WHERE correo = ?", [correo]);
    if (!rows[0]) return null;
    const user = rows[0];
    return {
      ...user,
      rol: user.id_rol,
      save: async function () {
        await db.execute(
          `UPDATE usuarios SET
            nombre = ?, apellido = ?, correo = ?, user_password = ?,
            tipo_documento = ?, numero_documento = ?, id_rol = ?,
            documento_pdf = ?, token_confirmacion = ?, correo_confirmado = ?
          WHERE id_usuario = ?`,
          [
            this.nombre,
            this.apellido,
            this.correo,
            this.user_password,
            this.tipo_documento,
            this.numero_documento,
            this.id_rol,
            this.documento_pdf,
            this.token_confirmacion,
            this.correo_confirmado,
            this.id_usuario,
          ]
        );
      },
    };
  }
}

module.exports = User;
