// backend/src/utils/security.js
const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES } = require('../config');

/**
 * Crea un token de acceso JWT.
 * @param {Object} data - Datos que quieres incluir en el token (ej: id_usuario, correo)
 * @param {number} expiresMinutes - Tiempo de expiración en minutos (opcional)
 * @returns {string} Token JWT firmado
 */
function createAccessToken(data, expiresMinutes = ACCESS_TOKEN_EXPIRE_MINUTES) {
    const payload = { ...data };
    return jwt.sign(payload, JWT_SECRET, {
        algorithm: JWT_ALGORITHM || 'HS256',
        expiresIn: `${expiresMinutes}m`
    });
}

/**
 * Decodifica y verifica un token JWT.
 * @param {string} token - Token recibido del cliente
 * @returns {Object} Payload decodificado si es válido
 * @throws {Error} Si el token es inválido o expirado
 */
function decodeAccessToken(token) {
    try {
        return jwt.verify(token, JWT_SECRET, { algorithms: [JWT_ALGORITHM || 'HS256'] });
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            throw new Error('Token expired');
        } else {
            throw new Error('Invalid token');
        }
    }
}

module.exports = {
    createAccessToken,
    decodeAccessToken
};
