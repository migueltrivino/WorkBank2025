import React from "react";

export default function NavbarEmployer() {
  return (
    <nav className="navbar-employer">
      <div className="navbar-logo">WorkBank</div>
      <ul className="navbar-links">
        <li><a href="/employer">Inicio</a></li>
        <li><a href="/reviews">Reseñas</a></li>
        <li><a href="/misofertas">Mis ofertas</a></li>
        <li><a href="/postulaciones">Postulaciones</a></li>
        <li><a href="/historial">Historial</a></li>
      </ul>
    </nav>
  );
}