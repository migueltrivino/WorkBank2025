// src/components/ActionPanel.jsx
import React from "react";
import styles from "../../css/ActionPanel.module.css"; // Asegúrate de usar un CSS dedicado
import { FaTrash, FaPaperclip, FaEnvelope, FaExclamationTriangle, FaInfoCircle } from "react-icons/fa";

function ActionPanel({ mode, setMode, onClear, onAttach }) {
  return (
    <div className={styles.actionPanel}>
      <button
        title="Limpiar"
        onClick={onClear}
        className={`${styles.iconBtn} ${styles.red}`}
      >
        <FaTrash size={20} />
        <span>Limpiar</span>
      </button>

      <button
        title="Adjuntar archivo"
        onClick={onAttach}
        className={styles.iconBtn}
      >
        <FaPaperclip size={20} />
        <span>Adjuntar</span>
      </button>

      <button
        title="Contacto"
        onClick={() => setMode("contacto")}
        className={`${styles.iconBtn} ${mode === "contacto" ? styles.active : ""}`}
      >
        <FaEnvelope size={20} />
        <span>Contacto</span>
      </button>

      <button
        title="Queja/Sugerencia"
        onClick={() => setMode("queja")}
        className={`${styles.iconBtn} ${mode === "queja" ? styles.active : ""}`}
      >
        <FaExclamationTriangle size={20} />
        <span>Comentario</span>
      </button>

      <button
        title="Información"
        className={`${styles.iconBtn} ${styles.gray}`}
        onClick={() =>
          alert("Completa los campos según tu necesidad. Puedes enviar un archivo si lo deseas.")
        }
      >
        <FaInfoCircle size={20} />
        <span>Información</span>
      </button>
    </div>
  );
}

export default ActionPanel;