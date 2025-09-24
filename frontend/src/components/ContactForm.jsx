// src/components/ContactForm.jsx
import React, { useState, useRef } from "react";
import styles from "../css/ContactForm.module.css";

function ContactForm() {
  const [mode, setMode] = useState("contacto"); // "contacto" o "queja"
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    categoria: "consulta",
    asunto: "",
    mensaje: "",
    adjunto: null,
  });

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) setFormData({ ...formData, [name]: files[0] });
    else setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos enviados:", formData);
    alert("Formulario enviado con éxito 🚀");
  };

  const handleClear = () => {
    setFormData({
      nombre: "",
      correo: "",
      telefono: "",
      categoria: "consulta",
      asunto: "",
      mensaje: "",
      adjunto: null,
    });
  };

  const handleAttach = () => fileInputRef.current.click();

  const getInfoText = (targetMode) => {
    if (targetMode === "contacto") return "Formulario de Queja/Sugerencia oculto. Aquí puedes enviar consultas generales.";
    if (targetMode === "queja") return "Formulario de Contacto oculto. Aquí puedes enviar quejas o sugerencias.";
  };

  return (
    <div className={styles.contactContainer}>
      {/* Panel horizontal con acciones */}
      <div className={styles.actionPanel}>
        <button
          title="Limpiar formulario"
          onClick={handleClear}
          className={`${styles.iconBtn} ${styles.red}`}
        >
          🧹
        </button>
        <button
          title="Adjuntar archivo"
          onClick={handleAttach}
          className={styles.iconBtn}
        >
          📎
        </button>
        <button
          title="Contacto"
          onClick={() => setMode("contacto")}
          className={`${styles.iconBtn} ${mode === "contacto" ? styles.active : ""}`}
        >
          📬
        </button>
        <button
          title="Queja/Sugerencia"
          onClick={() => setMode("queja")}
          className={`${styles.iconBtn} ${mode === "queja" ? styles.active : ""}`}
        >
          ⚠️
        </button>
        <button
          title="Información"
          className={`${styles.iconBtn} ${styles.gray}`}
          onClick={() =>
            alert(
              "Completa los campos según tu necesidad. Puedes enviar un archivo si lo deseas."
            )
          }
        >
          ℹ️
        </button>
      </div>

      {/* Layout de formularios con animación */}
      <div className={styles.formsWrapper}>
        {/* Columna izquierda */}
        <div className={styles.formColumn}>
          <div
            className={`${styles.infoMessage} ${mode === "contacto" ? styles.hidden : styles.visible}`}
          >
            {getInfoText("contacto")}
          </div>
          <form
            className={`${styles.formHalf} ${mode === "contacto" ? styles.visible : styles.hidden}`}
            onSubmit={handleSubmit}
          >
            <div className={styles.inputGroup}>
              <input
                className={styles.input}
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <input
                className={styles.input}
                type="email"
                name="correo"
                placeholder="Correo"
                value={formData.correo}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <input
                className={styles.input}
                type="text"
                name="telefono"
                placeholder="Teléfono"
                value={formData.telefono}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputGroup}>
              <input
                className={styles.input}
                type="text"
                name="asunto"
                placeholder="Asunto"
                value={formData.asunto}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputGroup}>
              <textarea
                className={styles.input}
                name="mensaje"
                placeholder="Mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <input
                ref={fileInputRef}
                className={styles.input}
                type="file"
                name="adjunto"
                onChange={handleChange}
              />
            </div>
            <button type="submit" className={styles.button}>
              Enviar
            </button>
          </form>
        </div>

        {/* Columna derecha */}
        <div className={styles.formColumn}>
          <div
            className={`${styles.infoMessage} ${mode === "queja" ? styles.hidden : styles.visible}`}
          >
            {getInfoText("queja")}
          </div>
          <form
            className={`${styles.formHalf} ${mode === "queja" ? styles.visible : styles.hidden}`}
            onSubmit={handleSubmit}
          >
            <div className={styles.inputGroup}>
              <input
                className={styles.input}
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <input
                className={styles.input}
                type="email"
                name="correo"
                placeholder="Correo"
                value={formData.correo}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <select
                className={styles.input}
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
                required
              >
                <option value="queja">Queja</option>
                <option value="sugerencia">Sugerencia</option>
              </select>
            </div>
            <div className={styles.inputGroup}>
              <textarea
                className={styles.input}
                name="mensaje"
                placeholder="Mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <input
                ref={fileInputRef}
                className={styles.input}
                type="file"
                name="adjunto"
                onChange={handleChange}
              />
            </div>
            <button type="submit" className={styles.button}>
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
