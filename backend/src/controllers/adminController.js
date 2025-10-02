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

module.exports = { getDashboardSummary };
