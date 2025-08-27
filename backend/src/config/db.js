const mysql = require("mysql2");

// Creamos la conexión
const connection = mysql.createConnection({
  host: "localhost",     //  solo el host
  port: 3307,            // si tu MySQL corre en 3007
  user: "root",          // tu usuario MySQL
  password: "2008",      // tu contraseña MySQL
  database: "work_bank"  // el nombre de tu base de datos
});

// Conectar
connection.connect((err) => {
    if (err) {
    console.error("❌ Error al conectar a MySQL:", err);
    return;
    }
    console.log("✅ Conectado a MySQL");
});

module.exports = connection;