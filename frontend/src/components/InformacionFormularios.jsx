import React from "react";
import '../css/InformacionFormulario.css'
import logo from "../assets/logos.png";

function InformacionFormulario() {
  return (
    <div className="right-panel">
      <div className="logo">
        <img src={logo} alt="logo" />
        <a href="index.html" className="logo-text">Workbank.W</a>
    </div>

      <div className="message-welcome">
        <h1>BIENVENIDO</h1>
        <p>Recuerda notificarnos cualquier problema que tengas, para nosotros tu opinión es la más valiosa</p>
        <a href="mailto:Workbank2025oficial@gmail.com">Workbank2025oficial@gmail.com</a>
      </div>

      <div className="container-socials">
        <p>"Haz tareas simples, gana sin complicaciones"</p>
        <div className="socials">
          <i className="fab fa-facebook icon-facebook"></i>
          <i className="fab fa-instagram icon-instagram"></i>
          <i className="fab fa-whatsapp icon-whatsapp"></i>
          <i className="fab fa-tiktok icon-tiktok"></i>
        </div>
      </div>
    </div>
  );
}

export default InformacionFormulario;