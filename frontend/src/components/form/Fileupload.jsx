// src/components/FileUpload.jsx
import React, { useState, useRef } from "react";
import styles from "../../css/FileUpload.module.css";

function FileUpload({ onFileSelect, visible }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      onFileSelect && onFileSelect(selected);

      // Si es imagen → mostrar preview
      if (selected.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result);
        reader.readAsDataURL(selected);
      } else {
        setPreview(null);
      }
    }
  };

  const handleClickFolder = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleChooseAnother = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleCancel = () => {
    setFile(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // resetea input
    }
    onFileSelect && onFileSelect(null);
  };

  if (!visible) return null;

  return (
    <div className={styles.container}>
      {preview ? (
        <div className={styles.previewWrapper}>
          <img src={preview} alt="Preview" className={styles.preview} />
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.btn}
              onClick={handleChooseAnother}
            >
              Escoger otro
            </button>
            <button
              type="button"
              className={styles.btnCancel}
              onClick={handleCancel}
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : file ? (
        <div className={styles.fileWrapper}>
          <p className={styles.fileName}>{file.name}</p>
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.btn}
              onClick={handleChooseAnother}
            >
              Escoger otro
            </button>
            <button
              type="button"
              className={styles.btnCancel}
              onClick={handleCancel}
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.folder} onClick={handleClickFolder}>
          <div className={styles["front-side"]}>
            <div className={styles.tip}></div>
            <div className={styles.cover}></div>
          </div>
          <div className={styles["back-side"] + " " + styles.cover}></div>
        </div>
      )}

      {/* Input oculto */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </div>
  );
}

export default FileUpload;