// utils/hashPassword.js
const bcrypt = require("bcryptjs");

// Encriptar contraseña antes de guardarla
async function hashPassword(user_password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(user_password, salt);
}

// Comparar contraseña ingresada vs contraseña en BD
async function comparePassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

module.exports = { hashPassword, comparePassword };