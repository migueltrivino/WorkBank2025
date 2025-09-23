const mysql = require("mysql2/promise");
const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = require("./index"); // importar config

const db = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
});
 
module.exports = db;
