const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES } = require('../config');

function createAccessToken(data, expiresMinutes = ACCESS_TOKEN_EXPIRE_MINUTES) {
    const payload = { ...data };
    return jwt.sign(payload, JWT_SECRET, {
        algorithm: JWT_ALGORITHM,
        expiresIn: `${expiresMinutes}m`
    });
}

// Decodificar token
function decodeAccessToken(token) {
    try {
        return jwt.verify(token, JWT_SECRET, { algorithms: [JWT_ALGORITHM] });
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