const jwt = require("jsonwebtoken");

function verificarToken(req, res, next) {
    const token = req.headers["authorization"];
    if (!token) {
    return res.status(403).json({ error: "Acceso denegado. Token requerido." });
    }

    jwt.verify(token, "secreto_super_seguro", (err, decoded) => {
    if (err) {
        return res.status(401).json({ error: "Token inválido" });
    }
    req.usuario = decoded;
    next();
    });
}

module.exports = verificarToken;
