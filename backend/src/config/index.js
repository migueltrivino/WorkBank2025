require("dotenv").config(); 

const JWT_SECRET = process.env.JWT_SECRET || "secret123";
const JWT_ALGORITHM = process.env.JWT_ALGORITHM || "HS256";
const ACCESS_TOKEN_EXPIRE_MINUTES = parseInt(process.env.ACCESS_TOKEN_EXPIRE_MINUTES) || 1440;

const DB_HOST = process.env.DB_HOST || "localhost";
const DB_USER = process.env.DB_USER || "root";
const DB_PASS = process.env.DB_PASS || "";
const DB_NAME = process.env.DB_NAME || "Work_Bank";

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
 
module.exports = {
  JWT_SECRET,
  JWT_ALGORITHM,
  ACCESS_TOKEN_EXPIRE_MINUTES,
  DB_HOST,
  DB_USER,
  DB_PASS,
  DB_NAME,
  EMAIL_USER,
  EMAIL_PASS,
};