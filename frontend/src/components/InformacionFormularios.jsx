import React from "react";
import styles from '../css/InformacionFormulario.module.css'
import logo from "../assets/logos.png";
import { Link } from "react-router-dom";

function InformacionFormularios() {
  return (
    <div className={styles['right-panel']}>
      <div className={styles.logo}>
        <img src={logo} alt="logo" />
        <Link to="/" className={styles["logo-text"]}>
        Workbank.W
        </Link>
    </div>

      <div className={styles['message-welcome']}>
        <h1>BIENVENIDO</h1>
        <p>Recuerda notificarnos cualquier problema que tengas, para nosotros tu opinión es la más valiosa</p>
        <a href="mailto:Workbank2025oficial@gmail.com">Workbank2025oficial@gmail.com</a>
      </div>

      <div className={styles['container-socials']}>
        <p>"Haz tareas simples, gana sin complicaciones"</p>
        <div className={styles.socials}>
            <i className={`fab fa-facebook ${styles['icon-facebook']}`}></i>
            <i className={`fab fa-instagram ${styles['icon-instagram']}`}></i>
            <i className={`fab fa-whatsapp ${styles['icon-whatsapp']}`}></i>
            <i className={`fab fa-tiktok ${styles['icon-tiktok']}`}></i>
        </div>
      </div>
    </div>
  );
}

export default InformacionFormularios;