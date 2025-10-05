// src/routes/admin/adminUsersRoutes.js
const express = require("express");
const db = require("../../config/db"); // conexión a BD
const User = require("../../models/User.js");
const router = express.Router();

// ----------------------------
// Helper: validar admin por ID
async function validateAdminById(adminId) {
  console.log("🔍 validateAdminById -> adminId recibido:", adminId);

  if (!adminId) throw new Error("ID de admin requerido");

  const [adminRows] = await db.query(
    `SELECT id_rol 
     FROM usuarios 
     WHERE id_usuario = ? 
     LIMIT 1`,
    [adminId]
  );

  console.log("📊 Resultado query admin:", adminRows);

  if (!adminRows || adminRows.length === 0) throw new Error("Admin no encontrado");
  const rol = adminRows[0].id_rol;

  // ⚡️ 3 = admin en tu BD
  if (rol !== 3) throw new Error("El usuario no tiene permisos de admin");
}


  router.get("/stats", async (req, res) => {
    try {
      // Totales y sumas en una sola query (opcional)
      const [totales] = await db.query(`
        SELECT
          COUNT(*) AS total,
          SUM(CASE WHEN estado = 1 THEN 1 ELSE 0 END) AS activos,
          SUM(CASE WHEN estado = 0 THEN 1 ELSE 0 END) AS inactivos,
          SUM(CASE WHEN correo_confirmado = 1 THEN 1 ELSE 0 END) AS confirmados,
          SUM(CASE WHEN correo_confirmado = 0 THEN 1 ELSE 0 END) AS noConfirmados
        FROM usuarios
      `);

      // Nuevos en la semana
      const [nuevosSemanaRows] = await db.query(`
        SELECT COUNT(*) AS cantidad
        FROM usuarios
        WHERE YEARWEEK(fecha_creacion, 1) = YEARWEEK(CURDATE(), 1)
      `);

      // Nuevos hoy
      const [hoyRows] = await db.query(`
        SELECT COUNT(*) AS hoy
        FROM usuarios
        WHERE DATE(fecha_creacion) = CURDATE()
      `);

      // Roles
      const [roles] = await db.query(`
        SELECT r.nombre_rol AS rol, COUNT(*) AS cantidad
        FROM usuarios u
        JOIN rol r ON u.id_rol = r.id_rol
        GROUP BY r.nombre_rol
      `);

      // Mensual
      const [mensual] = await db.query(`
        SELECT DATE_FORMAT(fecha_creacion, '%Y-%m') AS mes, COUNT(*) AS cantidad
        FROM usuarios
        GROUP BY mes
        ORDER BY mes ASC
      `);

      res.json({
        total: totales[0]?.total || 0,
        activos: totales[0]?.activos || 0,
        inactivos: totales[0]?.inactivos || 0,
        confirmados: totales[0]?.confirmados || 0,
        noConfirmados: totales[0]?.noConfirmados || 0,
        nuevosSemana: nuevosSemanaRows[0]?.cantidad || 0,
        hoy: hoyRows[0]?.hoy || 0,
        roles,
        mensual
      });
    } catch (err) {
      console.error("❌ Error en GET /stats (adminUsersRoutes):", err);
      res.status(500).json({ message: "Error al obtener estadísticas" });
    }
  });

// ----------------------------
// Traer todos los usuarios
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al obtener usuarios" });
  }
});

// Traer usuario por ID (⚡️ va al final para no chocar con /stats)
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al obtener usuario" });
  }
});

// Actualizar usuario
router.put("/:id", async (req, res) => {
  console.log("📩 PUT /api/admin/users/:id", {
    params: req.params,
    body: req.body,
  });

  const id = req.params.id;
  const { nombre, apellido, correo, adminId } = req.body;

  try {
    await validateAdminById(adminId);

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    const updatedUser = await User.updateById(id, { nombre, apellido, correo });

    res.json(updatedUser);
  } catch (err) {
    console.error("❌ Error en PUT /api/admin/users/:id:", err);
    res.status(403).json({ message: err.message });
  }
});

// Eliminar usuario
router.delete("/:id", async (req, res) => {
  console.log("📩 DELETE /api/admin/users/:id", {
    params: req.params,
    body: req.body,
  });

  const id = req.params.id;
  const { adminId } = req.body;

  try {
    await validateAdminById(adminId);

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    await User.deleteById(id);
    res.json({ message: "Usuario eliminado correctamente" });
  } catch (err) {
    console.error("❌ Error en DELETE /api/admin/users/:id:", err);
    res.status(403).json({ message: err.message });
  }
});

// Cambiar estado de usuario
router.patch("/:id/status", async (req, res) => {
  console.log("📩 PATCH /api/admin/users/:id/status", {
    params: req.params,
    body: req.body,
  });

  const id = req.params.id;
  const { adminId, estado } = req.body;

  try {
    await validateAdminById(adminId);

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    const newEstado = estado === 1 ? 1 : 0;
    await User.updateStatus(id, newEstado);

    res.json({ message: `Usuario ${newEstado === 1 ? "activado" : "desactivado"}` });
  } catch (err) {
    console.error("❌ Error en PATCH /api/admin/users/:id/status:", err);
    res.status(403).json({ message: err.message });
  }
});

module.exports = router;
