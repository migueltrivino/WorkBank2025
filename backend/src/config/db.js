// config/db.js
const mysql = require("mysql2/promise"); // si usas mysql normal: require("mysql")

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "Work_Bank",
});

module.exports = db;