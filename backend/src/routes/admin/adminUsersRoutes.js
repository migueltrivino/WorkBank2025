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

// Traer usuario por ID
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

    const updatedUser = await User.updateById(id, {
      nombre,
      apellido,
      correo,
    });

    // ⚡️ Devolver el user actualizado tal como espera el front
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

    // ⚡️ Asegurar que estado es 0 o 1 (no boolean string)
    const newEstado = estado === 1 ? 1 : 0;
    await User.updateStatus(id, newEstado);

    res.json({ message: `Usuario ${newEstado === 1 ? "activado" : "desactivado"}` });

  } catch (err) {
    console.error("❌ Error en PATCH /api/admin/users/:id/status:", err);
    res.status(403).json({ message: err.message });
  }
});

module.exports = router;
