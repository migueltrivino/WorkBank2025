// controllers/adminController.js
const db = require("../config/db");

const getDashboardSummary = async (req, res) => {
  try {
    // Conteo general
    const [rows] = await db.query(`
      SELECT 
        (SELECT COUNT(*) FROM usuarios) AS usuarios,
        (SELECT COUNT(*) FROM resena) AS resenas,
        (SELECT COUNT(*) FROM notificaciones) AS notificaciones,
        (SELECT COUNT(*) FROM ofertas_laborales) AS ofertas,
        (SELECT COUNT(*) FROM postulacion) AS postulaciones,
        (SELECT COUNT(*) FROM chat) AS chats,
        (SELECT COUNT(*) FROM mensaje) AS mensajes
    `);

    // Conteo desglosado de contact_messages por categoría
    const [contactCounts] = await db.query(`
      SELECT 
        SUM(categoria = 'contacto') AS contacto,
        SUM(categoria = 'queja') AS quejas,
        SUM(categoria = 'sugerencia') AS sugerencias
      FROM contact_messages
    `);

    // Fusionamos todo en un solo objeto
    res.json({
      ...rows[0],          // usuarios, resenas, notificaciones, ofertas, postulaciones, chats, mensajes
      ...contactCounts[0], // contacto, quejas, sugerencias
    });
  } catch (error) {
    console.error("Error en getDashboardSummary:", error);
    res.status(500).json({ error: "Error obteniendo resumen del dashboard" });
  }
};

const getUserStats = async (req, res) => {
  try {
    // Totales simples
    const [totalRows] = await db.query("SELECT COUNT(*) AS total FROM usuarios");
    const total = totalRows[0]?.total || 0;

    // Activos / Inactivos (columna: estado)
    const [activosRows] = await db.query("SELECT COUNT(*) AS activos FROM usuarios WHERE estado = 1");
    const activos = activosRows[0]?.activos || 0;
    const [inactivosRows] = await db.query("SELECT COUNT(*) AS inactivos FROM usuarios WHERE estado = 0");
    const inactivos = inactivosRows[0]?.inactivos || 0;

    // Correo confirmado / no confirmado (columna: correo_confirmado)
    const [confirmadosRows] = await db.query("SELECT COUNT(*) AS confirmados FROM usuarios WHERE correo_confirmado = 1");
    const confirmados = confirmadosRows[0]?.confirmados || 0;
    const [noConfirmadosRows] = await db.query("SELECT COUNT(*) AS noConfirmados FROM usuarios WHERE correo_confirmado = 0");
    const noConfirmados = noConfirmadosRows[0]?.noConfirmados || 0;

    // Nuevos en la semana (usa fecha_creacion)
    const [nuevosSemanaRows] = await db.query(`
      SELECT COUNT(*) AS cantidad
      FROM usuarios
      WHERE YEARWEEK(fecha_creacion, 1) = YEARWEEK(CURDATE(), 1)
    `);
    const nuevosSemana = nuevosSemanaRows[0]?.cantidad || 0;

    // Nuevos hoy
    const [hoyRows] = await db.query(`
      SELECT COUNT(*) AS hoy
      FROM usuarios
      WHERE DATE(fecha_creacion) = CURDATE()
    `);
    const hoy = hoyRows[0]?.hoy || 0;

    // Por roles (tabla 'rol' y columna 'nombre_rol')
    const [roles] = await db.query(`
      SELECT r.nombre_rol AS rol, COUNT(*) AS cantidad
      FROM usuarios u
      JOIN rol r ON u.id_rol = r.id_rol
      GROUP BY r.nombre_rol
    `);

    // Evolución mensual (fecha_creacion)
    const [mensual] = await db.query(`
      SELECT DATE_FORMAT(fecha_creacion, '%Y-%m') AS mes, COUNT(*) AS cantidad
      FROM usuarios
      GROUP BY mes
      ORDER BY mes ASC
    `);

    // Respuesta consolidada
    return res.json({
      total,
      activos,
      inactivos,
      confirmados,
      noConfirmados,
      nuevosSemana,
      hoy,
      roles,     // array { rol, cantidad }
      mensual    // array { mes, cantidad }
    });
  } catch (error) {
    console.error("Error al obtener estadísticas:", error);
    return res.status(500).json({ error: "Error al obtener estadísticas" });
  }
};

module.exports = { getDashboardSummary, getUserStats };
