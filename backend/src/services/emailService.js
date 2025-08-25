const nodemailer = require("nodemailer");

async function enviarCorreo(destinatario, asunto, mensaje) {
    const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "tu_correo@gmail.com",
        pass: "tu_contraseña",
    },
    });

    await transporter.sendMail({
    from: "tu_correo@gmail.com",
    to: destinatario,
    subject: asunto,
    text: mensaje,
    });
}

module.exports = { enviarCorreo };
