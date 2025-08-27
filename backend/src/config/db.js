const mysql = require("mysql2");

// Creamos la conexión
const connection = mysql.createConnection({
  host: "localhost",     //  solo el host
  port: 3306,            // si tu MySQL corre en 3007
  user: "root",          // tu usuario MySQL
  password: "",      // tu contraseña MySQL
  database: "Work_Bank"  // el nombre de tu base de datos
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