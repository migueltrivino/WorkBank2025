
const mysql = require("mysql2/promise");

// Creamos el pool de conexiones
const pool = mysql.createPool({
  host: "localhost",
  port: 3307,          
  user: "root",
  password: "2008",
  database: "work_bank",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

console.log("✅ Pool de MySQL configurado");

module.exports = pool;
