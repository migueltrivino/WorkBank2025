// src/components/Loader.jsx
import React from "react";
import styles from "../css/Loader.module.css";

function Loader({ variant = "default" }) {
  return (
    <div className={`${styles.typewriter} ${styles[variant]}`}>
      <div className={styles.slide}>
        <i></i>
      </div>
      <div className={styles.paper}></div>
      <div className={styles.keyboard}></div>
    </div>
  );
}

export default Loader;

{/* <Loader variant="fullscreen" /> 
<Loader variant="small" /> 
<Loader variant="mini" /> */}