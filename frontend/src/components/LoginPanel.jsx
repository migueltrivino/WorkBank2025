import React from 'react'
import "../css/LoginPanel.module.css"


function LoginPanel() {
  return (
    <div className="right-panel">
      <h2>Iniciar sesión</h2>
      <form id="loginForm">
        <label htmlFor="email">Correo electrónico</label>
        <input
          type="email"
          id="email"
          placeholder="ejemplo@gmail.com"
          required
        />

        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          id="password"
          placeholder="********"
          required
        />

        <div className="forgot">
          <a href="#">¿Olvidó su contraseña?</a>
        </div>

        <button type="submit" className="btn">
          Ingresar
        </button>

        <button type="button" className="btn google-btn">
          <img src={googleLogo} alt="Google" /> Continuar con Google
        </button>
      </form>

      <div className="register">
        ¿Nuevo en Workbank? <a href="/registro">Crea tu cuenta</a>
      </div>
    </div>
  );
}

export default LoginPanel;