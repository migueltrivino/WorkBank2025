// backend/src/utils/security.js
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES } = require("../config");

/**
 * Crea un token de acceso JWT.
 * @param {Object} payload - Datos que quieres incluir en el token (ej: id_usuario, correo)
 * @param {number} expiresMinutes - Tiempo de expiración en minutos (opcional)
 * @returns {string} Token JWT firmado
 */
function createAccessToken(payload, expiresMinutes = ACCESS_TOKEN_EXPIRE_MINUTES) {
  return jwt.sign(payload, JWT_SECRET, {
    algorithm: JWT_ALGORITHM || "HS256",
    expiresIn: `${expiresMinutes}m`,
  });
}

/**
 * Verifica y decodifica un token JWT.
 * @param {string} token - Token recibido del cliente
 * @returns {Object} Payload decodificado si es válido
 * @throws {Error} Si el token es inválido o expirado
 */
function verifyAccessToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET, { algorithms: [JWT_ALGORITHM || "HS256"] });
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      throw new Error("Token expired");
    } else {
      throw new Error("Invalid token");
    }
  }
}

module.exports = { createAccessToken, verifyAccessToken };
