import React from "react";
import '../css/RegistroPanel.css'

function RegistroPanel() {
  return (
    <div className="left-panel">
      <h2>Registro</h2>
      <form id="loginForm">
        <label htmlFor="nombre">Nombre</label>
        <input type="text" id="nombre" name="nombre" placeholder="Tu nombre" required />

        <label htmlFor="apellido">Apellido</label>
        <input type="text" id="apellido" name="apellido" placeholder="Tu apellido" required />

        <label htmlFor="email">Correo electrónico</label>
        <input type="email" id="email" name="email" placeholder="ejemplo@gmail.com" required />

        <label htmlFor="password">Contraseña</label>
        <input type="password" id="password" name="password" placeholder="****" required />

        <label htmlFor="confirmarPassword">Confirmar contraseña</label>
        <input type="password" id="confirmarPassword" name="confirmarPassword" placeholder="****" required />

        <fieldset>
          <legend>Documento</legend>
          <div className="documento">
            <select id="tipoDocumento" name="tipoDocumento" required>
              <option value="C.C">C.C</option>
              <option value="T.I">T.I</option>
              <option value="C.E">C.E</option>
              <option value="P.E.P">P.E.P</option>
              <option value="P.P">P.P</option>
              <option value="P.P.T">P.P.T</option>
            </select>
            <input
              type="text"
              id="numeroDocumento"
              name="numeroDocumento"
              placeholder="Ejemplo: 123456789"
              required
            />
          </div>
        </fieldset>

        <label htmlFor="rol">Soy...</label>
        <select id="rol" name="rol" required>
          <option value="trabajador">Trabajador</option>
          <option value="empleador">Empleador</option>
        </select>

        <label htmlFor="documentoPdf">Documento en PDF</label>
        <input type="file" id="documentoPdf" name="documentoPdf" required />

        <button type="submit" className="btn">Ingresar</button>
      </form>

      <div className="login">
        ¿Ya tienes cuenta? <a href="">Inicia sesión</a>
      </div>
    </div>
  );
}

export default RegistroPanel;