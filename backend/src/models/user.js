// backend/src/models/user.js
const db = require("../config/db");

class User {
  // ------------------------
  // Crear usuario
  static async create(userData) {
    const nombre = userData.nombre ?? null;
    const apellido = userData.apellido ?? null;
    const correo = (userData.correo ?? null)?.trim();
    const user_password = userData.user_password ?? null;
    const tipo_documento = userData.tipo_documento ?? null;
    const numero_documento = userData.numero_documento ?? null;
    const id_rol = userData.id_rol ?? null;
    const documento_pdf = userData.documento_pdf ?? null;
    const token_confirmacion = userData.token_confirmacion ?? null;
    const correo_confirmado = userData.correo_confirmado ?? 0;

    const [result] = await db.execute(
      `INSERT INTO usuarios
      (nombre, apellido, correo, user_password, tipo_documento, numero_documento, id_rol, documento_pdf, token_confirmacion, correo_confirmado)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [nombre, apellido, correo, user_password, tipo_documento, numero_documento, id_rol, documento_pdf, token_confirmacion, correo_confirmado]
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
  // Buscar por correo
  static async findByEmail(emailOrCorreo) {
    const correo = (emailOrCorreo ?? null)?.trim();
    if (!correo) return null;

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

  // ------------------------
  // Buscar por ID (con historial y reseñas)
    static async findById(id_usuario) {
    try {
      // Info básica del usuario
      const [rows] = await db.execute(
        "SELECT id_usuario, nombre, apellido, correo, id_rol FROM usuarios WHERE id_usuario = ?",
        [id_usuario]
      );
      if (!rows[0]) return null;
      const user = rows[0];

      // Historial: ofertas, postulaciones y reseñas
      const [historial] = await db.execute(
        `SELECT 
          (SELECT COUNT(*) FROM ofertas_laborales WHERE id_usuario = ?) AS ofertas,
          (SELECT COUNT(*) FROM postulacion WHERE id_usuario = ?) AS postulaciones,
          (SELECT COUNT(*) FROM resena WHERE id_destinatario = ?) AS reseñas`,
        [id_usuario, id_usuario, id_usuario]
      );

      // Reseñas recibidas
      const [reseñas] = await db.execute(
        `SELECT r.id_resena AS id,
                u.nombre AS autor,
                r.contenido_resena AS texto,
                r.puntaje_resena AS puntuacion,
                r.fecha_resena AS fecha
        FROM resena r
        JOIN usuarios u ON r.id_usuario = u.id_usuario
        WHERE r.id_destinatario = ?`,
        [id_usuario]
      );

      // Calificación promedio
      const [[{ calificacion }]] = await db.execute(
        `SELECT IFNULL(ROUND(AVG(r.puntaje_resena),1),0) AS calificacion
        FROM resena r
        WHERE r.id_destinatario = ?`,
        [id_usuario]
      );

      return {
        id_usuario: user.id_usuario,
        nombre: user.nombre,
        apellido: user.apellido,
        correo: user.correo,
        historial: historial[0],
        reseñas,
        calificacion,
        rol: user.id_rol,
      };
    } catch (err) {
      console.error("Error en User.findById:", err);
      throw err;
    }
  }
  // ------------------------
  // Traer todos los usuarios
  static async findAll() {
    const [rows] = await db.execute("SELECT * FROM usuarios");
    return rows;
  }
}

module.exports = User;
