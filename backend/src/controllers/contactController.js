// backend/src/controllers/contactController.js
const db = require("../config/db");

async function saveContact(req, res) {
  try {
    const { nombre, correo, telefono, categoria, asunto, mensaje, user_id } = req.body;
    const adjunto = req.file ? req.file.filename : null;

    await db.execute(
    `INSERT INTO contact_messages
        (user_id, nombre, correo, telefono, categoria, asunto, mensaje, adjunto_url)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [user_id || null, nombre, correo, telefono, categoria, asunto, mensaje, adjunto ? `/uploads/contact_files/${adjunto}` : null]
    );

    return res.status(200).json({ success: true, message: "Mensaje guardado correctamente" });
  } catch (error) {
    console.error("Error guardando contacto:", error);
    return res.status(500).json({ success: false, error: "Error al guardar contacto" });
  }
}

module.exports = { saveContact };
