import React from "react";
import RegistroPanel from "../components/RegistroPanel";
import InformacionFormularios from "../components/InformacionFormularios";
import styles from '../css/Container.module.css'

function Registro() {
  return (
    <div className={styles.container}>
      <RegistroPanel/>
      <InformacionFormularios/>
    </div>
  );
}

export default Registro;