// src/components/ConfirmacionEmail.jsx
import React from "react";
import styles from "../css/RegistroPanel.module.css"; // ✅ Reusamos los estilos base

function ConfirmacionEmail() {
  return (
    <div className={styles["form-panel"]}>
      <h2 className={styles.title}>✅ Registro completado</h2>
      <p className={styles.text}>
        Hemos enviado un correo de confirmación a tu bandeja de entrada.  
        Por favor, revisa tu correo electrónico y confirma tu cuenta para continuar.
      </p>

      <p className={styles.textSmall}>
        Si no lo encuentras, revisa la carpeta de <strong>spam</strong> o{" "}
        <strong>correo no deseado</strong>.
      </p>
    </div>
  );
}

export default ConfirmacionEmail;
