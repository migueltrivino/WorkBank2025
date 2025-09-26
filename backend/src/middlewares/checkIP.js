// backend/src/middlewares/checkIP.js
const pool = require("../config/db"); // tu conexión MySQL, ajusta si tienes otra ruta

async function checkIP(req, res, next) {
  try {
    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.socket.remoteAddress;

    const [rows] = await pool.query("SELECT * FROM ip_tracking WHERE ip = ?", [
      ip,
    ]);
    let ipData = rows[0];
    const now = new Date();

    if (!ipData) {
      await pool.query(
        "INSERT INTO ip_tracking (ip, intentos, primer_intento) VALUES (?, 1, ?)",
        [ip, now]
      );
      return next();
    }

    if (ipData.bloqueado_hasta && new Date(ipData.bloqueado_hasta) > now) {
      return res
        .status(403)
        .json({ error: "Tu IP está temporalmente bloqueada. Intenta más tarde." });
    }

    const seisHoras = 6 * 60 * 60 * 1000;
    const primerIntento = new Date(ipData.primer_intento);

    if (now - primerIntento > seisHoras) {
      await pool.query(
        "UPDATE ip_tracking SET intentos = 1, primer_intento = ? WHERE ip = ?",
        [now, ip]
      );
      return next();
    }

    if (ipData.intentos < 2) {
      await pool.query("UPDATE ip_tracking SET intentos = intentos + 1 WHERE ip = ?", [
        ip,
      ]);
      return next();
    }

    if (ipData.intentos >= 2 && ipData.intentos < 6) {
      await pool.query("UPDATE ip_tracking SET intentos = intentos + 1 WHERE ip = ?", [
        ip,
      ]);
      return res
        .status(429)
        .json({ error: "Has superado el límite de envíos. Intenta más tarde." });
    }

    let nuevoNivel = Math.min(ipData.nivel_bloqueo + 1, 4);
    let bloqueadoHasta = null;

    if (nuevoNivel === 1)
      bloqueadoHasta = new Date(now.getTime() + seisHoras);
    if (nuevoNivel === 2)
      bloqueadoHasta = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    if (nuevoNivel === 3)
      bloqueadoHasta = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    if (nuevoNivel === 4) bloqueadoHasta = null;

    await pool.query(
      "UPDATE ip_tracking SET nivel_bloqueo=?, bloqueado_hasta=?, intentos=intentos+1 WHERE ip=?",
      [nuevoNivel, bloqueadoHasta, ip]
    );

    return res
      .status(403)
      .json({ error: "Tu IP ha sido bloqueada por exceso de envíos." });
  } catch (err) {
    console.error("Error en checkIP:", err);
    return res.status(500).json({ error: "Error interno en validación de IP" });
  }
}

module.exports = checkIP;
