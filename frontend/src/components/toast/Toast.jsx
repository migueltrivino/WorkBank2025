// src/components/toast/Toast.jsx
import React from "react";
import styles from "../../css/toast.module.css";

export default function Toast({ message, type }) {
  if (!message) return null;

  return (
    <div className={`${styles.toast} ${styles[type]}`}>
      {message}
    </div>
  );
}