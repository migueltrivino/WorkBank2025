import React from "react";
import styles from '../css/RegistroPanel.module.css'

function RegistroPanel() {
  return (
    <div className={styles['left-panel']}>
      <h2>Registro</h2>
      <form className={styles.form} id="loginForm">
        <label className={styles.label} htmlFor="nombre">Nombre</label>
        <input className={styles.input} type="text" id="nombre" name="nombre" placeholder="Tu nombre" required />

        <label className={styles.label} htmlFor="apellido">Apellido</label>
        <input className={styles.input} type="text" id="apellido" name="apellido" placeholder="Tu apellido" required />

        <label className={styles.label} htmlFor="email">Correo electrónico</label>
        <input className={styles.input} type="email" id="email" name="email" placeholder="ejemplo@gmail.com" required />

        <label className={styles.label} htmlFor="password">Contraseña</label>
        <input className={styles.input} type="password" id="password" name="password" placeholder="****" required />

        <label className={styles.label} htmlFor="confirmarPassword">Confirmar contraseña</label>
        <input className={styles.input} type="password" id="confirmarPassword" name="confirmarPassword" placeholder="****" required />

        <fieldset className={styles.fieldset}>
          <legend>Documento</legend>
          <div className={styles.documento}>
            <select className={styles.select}id="tipoDocumento" name="tipoDocumento" required>
              <option value="C.C">C.C</option>
              <option value="T.I">T.I</option>
              <option value="C.E">C.E</option>
              <option value="P.E.P">P.E.P</option>
              <option value="P.P">P.P</option>
              <option value="P.P.T">P.P.T</option>
            </select>
            <input className={styles.input}
              type="text"
              id="numeroDocumento"
              name="numeroDocumento"
              placeholder="Ejemplo: 123456789"
              required
            />
          </div>
        </fieldset>

        <label className={styles.label} htmlFor="rol">Soy...</label>
        <select className={styles.select} id="rol" name="rol" required>
          <option value="trabajador">Trabajador</option>
          <option value="empleador">Empleador</option>
        </select>

        <label className={styles.label} htmlFor="documentoPdf">Documento en PDF</label>
        <input className={styles.input} type="file" id="documentoPdf" name="documentoPdf" required />

        <button type="submit" className={styles.btn}>Ingresar</button>
      </form>

      <div className={styles.login}>
        ¿Ya tienes cuenta? <a href="">Inicia sesión</a>
      </div>
    </div>
  );
}

export default RegistroPanel;