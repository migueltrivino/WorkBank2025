// backend/src/utils/hashPassword.js
const bcrypt = require("bcrypt");

// Encriptar contraseña antes de guardarla
async function hashPassword(password) {
  const saltRounds = 10; // equivalente a genSalt(10)
  const hashed = await bcrypt.hash(password, saltRounds);
  return hashed;
}

// Comparar contraseña ingresada vs contraseña en BD
async function comparePassword(password, hashedPassword) {
  const match = await bcrypt.compare(password, hashedPassword);
  return match;
}
 
module.exports = { hashPassword, comparePassword };
