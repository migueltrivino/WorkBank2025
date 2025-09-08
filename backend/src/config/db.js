// config/db.js
const mysql = require("mysql2/promise"); // si usas mysql normal: require("mysql")

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "goku1234",
  database: "work_bank",
});

module.exports = db;