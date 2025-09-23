// backend/src/utils/testEmail.js
require("dotenv").config(); // carga el .env
const sendEmail = require("./sendEmail");

async function test() {
  try {
    // Cambia "correo_destino@gmail.com" por el correo donde quieras recibir el test
    await sendEmail(
      "correo_destino@gmail.com",
      "Prueba Work Bank",
      "¡Hola! Esto es un correo de prueba desde Work Bank."
    );
    console.log("Correo enviado correctamente");
  } catch (err) {
    console.error("Error enviando correo:", err);
  }
}
 
test();
