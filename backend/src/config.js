
const JWT_SECRET = process.env.JWT_SECRET || 'miguel12345';
const JWT_ALGORITHM = process.env.JWT_ALGORITHM || 'HS256';
const ACCESS_TOKEN_EXPIRE_MINUTES = parseInt(process.env.ACCESS_TOKEN_EXPIRE_MINUTES) || 60 * 24; 

module.exports = {
    JWT_SECRET,
    JWT_ALGORITHM,
    ACCESS_TOKEN_EXPIRE_MINUTES
};