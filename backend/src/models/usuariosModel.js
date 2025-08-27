const db = require("../config/db");

// Obtener todos los usuarios
const getAllUsuarios = (callback) => {
  db.query("SELECT * FROM usuarios", (err, results) => {
    if (err) return callback(err, null);
    callback(null, results);
    });
};

// Insertar un nuevo usuario
const createUsuario = (usuario, callback) => {
    const query = `
    INSERT INTO usuarios 
    (id_rol, nombre, apellido, correo, contraseña, tipo_documento, numero_documento, documento_pdf)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(query, [
    usuario.id_rol,
    usuario.nombre,
    usuario.apellido,
    usuario.correo,
    usuario.contraseña,
    usuario.tipo_documento,
    usuario.numero_documento,
    usuario.documento_pdf || null
    ], (err, result) => {
    if (err) return callback(err, null);
    callback(null, { id_usuario: result.insertId, ...usuario });
    });
};

module.exports = { getAllUsuarios, createUsuario };