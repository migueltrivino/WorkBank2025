// src/pages/Registro.jsx
import React from "react";
import RegistroFlow from "../components/RegistroFlow";
import InformacionFormularios from "../components/InformacionFormularios";
import styles from "../css/Container.module.css";

function Registro() {
  return (
    <div className={styles.container}>
      {/* Flujo completo de registro */}
      <RegistroFlow />

      {/* Sección informativa */}
      <InformacionFormularios />
    </div>
  );
}

export default Registro;
