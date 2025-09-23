const db = require("../config/db");

class User {
  // ------------------------
  // Crear usuario
  static async create(userData) {
    const nombre = userData.nombre ?? null;
    const apellido = userData.apellido ?? null;
    const correo = (userData.correo ?? userData.email ?? null)?.trim();
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

  // ------------------------
  // Buscar usuario por correo
  static async findByEmail(emailOrCorreo) {
    const correo = (emailOrCorreo ?? null)?.trim();
    console.log("findByEmail recibido:", correo); // 🔹 log de depuración
    if (!correo) return null;

    const [rows] = await db.execute(
      "SELECT * FROM usuarios WHERE correo = ?",
      [correo]
    );

    if (!rows[0]) return null;
    const user = rows[0];

    return {
      ...user,
      rol: user.id_rol,
      // ------------------------
      // Guardar cambios
      save: async function () {
        // 🔹 log completo para depuración
        console.log("save llamado con:", {
          id_usuario: this.id_usuario,
          nombre: this.nombre,
          apellido: this.apellido,
          correo: this.correo,
          user_password: this.user_password,
          tipo_documento: this.tipo_documento,
          numero_documento: this.numero_documento,
          id_rol: this.id_rol,
          documento_pdf: this.documento_pdf,
          token_confirmacion: this.token_confirmacion,
          correo_confirmado: this.correo_confirmado,
          id_servicio: this.id_servicio,
          imagen_perfil: this.imagen_perfil,
          descripcion: this.descripcion,
          imagen_verificacion: this.imagen_verificacion,
        });

        await db.execute(
          `UPDATE usuarios SET
            nombre = ?, apellido = ?, correo = ?, user_password = ?,
            tipo_documento = ?, numero_documento = ?, id_rol = ?,
            documento_pdf = ?, token_confirmacion = ?, correo_confirmado = ?,
            id_servicio = ?, imagen_perfil = ?, descripcion = ?, imagen_verificacion = ?
          WHERE id_usuario = ?`,
          [
            this.nombre ?? null,
            this.apellido ?? null,
            this.correo ?? null,
            this.user_password ?? null,
            this.tipo_documento ?? null,
            this.numero_documento ?? null,
            this.id_rol ?? null,
            this.documento_pdf ?? null,
            this.token_confirmacion ?? null,
            this.correo_confirmado ?? 0,
            this.id_servicio ?? null,
            this.imagen_perfil ?? null,
            this.descripcion ?? null,
            this.imagen_verificacion ?? null,
            this.id_usuario ?? null,
          ]
        );
      },
    };
  }
}

module.exports = User;
