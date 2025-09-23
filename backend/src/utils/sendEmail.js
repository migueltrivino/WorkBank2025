// backend/src/utils/sendEmail.js
require("dotenv").config(); // carga el .env al inicio
const nodemailer = require("nodemailer");

// Verificar que las variables estén cargadas
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS);

// Crear transporter reutilizable
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // tu correo
    pass: process.env.EMAIL_PASS, // contraseña o app password
  },
  tls: {
    rejectUnauthorized: false, // ⚠️ Ignora errores de certificado en desarrollo
  },
});
 
// Función para enviar correo (manteniendo logs y manejo de errores)
async function sendEmail(to, subject, text) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Correo enviado a ${to}`);
  } catch (error) {
    console.error("Error enviando correo:", error);
    throw new Error("Error enviando correo");
  }
}

module.exports = sendEmail;
