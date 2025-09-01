import React from 'react'
import styles from "../css/LoginPanel.module.css"
import googleLogo from '../assets/google.png'


function LoginPanel() {
  return (
    <div className={styles['right-panel']}>
      <h2>Iniciar sesión</h2>
      <form className={styles.form} id="loginForm">
        <label className={styles.label} htmlFor="email">Correo electrónico</label>
        <input className={styles.input}
          type="email"
          id="email"
          placeholder="ejemplo@gmail.com"
          required
        />

        <label className={styles.label} htmlFor="password">Contraseña</label>
        <input className={styles.input}
          type="password"
          id="password"
          placeholder="********"
          required
        />

        <div className={styles.forgot}>
          <a href="#">¿Olvidó su contraseña?</a>
        </div>

        <button type="submit" className={styles.btn}>
          Ingresar
        </button>

        <button type="button" className={`${styles.btn} ${styles['google-btn']}`}>
          <img src={googleLogo} alt="Google" /> Continuar con Google
        </button>
      </form>

      <div className={styles.register}>
        ¿Nuevo en Workbank? <a href="/registro">Crea tu cuenta</a>
      </div>
    </div>
  );
}

export default LoginPanel;