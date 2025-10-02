// src/components/ContactForm.jsx
import React, { useState, useEffect } from "react";
import styles from "../css/ContactForm.module.css";
import ActionPanel from "./form/Actionpanel";
import FileUpload from "./form/Fileupload";
import useToast from "./toast/useToast";

function ContactForm() {
  const { showToast } = useToast();
  const [mode, setMode] = useState("contacto"); // "contacto" o "queja"

  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    categoria: "contacto", // default actualizado
    asunto: "",
    mensaje: "",
    adjunto: null,
  });

  const [fileVisible, setFileVisible] = useState(false); // controla FileUpload
  const [loading, setLoading] = useState(false);

  // 🔹 Actualiza automáticamente la categoría según el mode
  useEffect(() => {
    if (mode === "contacto") {
      setFormData((prev) => ({ ...prev, categoria: "contacto" }));
      setFileVisible(false); // desactiva adjuntos en contacto
    } else if (mode === "queja") {
      setFormData((prev) => ({
        ...prev,
        categoria: prev.categoria === "contacto" ? "queja" : prev.categoria,
      }));
    }
  }, [mode]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // Teléfono solo números y máximo 15 caracteres
    if (name === "telefono") {
      const numeric = value.replace(/\D/g, "").slice(0, 15);
      setFormData((prev) => ({ ...prev, [name]: numeric }));
      return;
    }

    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileSelect = (file) => {
    setFormData((prev) => ({ ...prev, adjunto: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nombre || !formData.correo || !formData.mensaje) {
      showToast("❌ Nombre, correo y mensaje son obligatorios", "error");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          data.append(key, value);
        }
      });

      const response = await fetch("http://localhost:4000/api/contact", {
        method: "POST",
        body: data,
      });

      const contentType = response.headers.get("content-type") || "";

      if (!response.ok) {
        const text = contentType.includes("application/json")
          ? await response.json()
          : await response.text();

        const errMsg =
          typeof text === "object" && text?.error
            ? text.error
            : typeof text === "string"
            ? text
            : `HTTP ${response.status}`;

        showToast(`❌ Error del servidor: ${errMsg}`, "error");
        return;
      }

      if (contentType.includes("application/json")) {
        const result = await response.json();
        if (result.success) {
          showToast("✅ Mensaje enviado con éxito", "success");
          setFormData({
            nombre: "",
            correo: "",
            telefono: "",
            categoria: mode === "contacto" ? "contacto" : "queja",
            asunto: "",
            mensaje: "",
            adjunto: null,
          });
          setFileVisible(false);
        } else {
          showToast(`❌ Error: ${result.error || "No se pudo enviar"}`, "error");
        }
      } else {
        const text = await response.text();
        showToast("❌ Respuesta inesperada del servidor", "error");
      }
    } catch (err) {
      console.error("Error en handleSubmit:", err);
      showToast("❌ Error de conexión con el servidor", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setFormData({
      nombre: "",
      correo: "",
      telefono: "",
      categoria: mode === "contacto" ? "contacto" : "queja",
      asunto: "",
      mensaje: "",
      adjunto: null,
    });
    setFileVisible(false);
  };

  const handleAttachClick = () => {
    if (mode === "contacto") {
      showToast("ℹ️ No puedes adjuntar archivos en este formulario", "info");
      return;
    }
    setFileVisible(!fileVisible);
  };

  const renderInput = ({ type, name, placeholder, required }) => {
    const isFilled = formData[name] && formData[name].toString().length > 0;

    return (
      <div className={`${styles["wave-group"]} ${isFilled ? styles.filled : ""}`}>
        <input
          className={styles.input}
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          required={required}
          autoComplete="on"
        />
        <span className={styles.label}>
          {[...placeholder].map((char, idx) => (
            <span key={idx} className={styles["label-char"]} style={{ "--index": idx }}>
              {char}
            </span>
          ))}
        </span>
        <span className={styles.bar}></span>
      </div>
    );
  };

  return (
    <div className={styles.contactContainer}>
      <ActionPanel
        mode={mode}
        setMode={setMode}
        onClear={handleClear}
        onAttach={handleAttachClick}
      />

      <div className={styles.formsWrapper}>
        {/* Formulario Contacto */}
        <form
          className={`${styles.formHalf} ${mode === "contacto" ? styles.visible : styles.hidden} ${fileVisible ? styles.expanded : ""}`}
          onSubmit={handleSubmit}
        >
          <div className={styles.formContent}>
            <div className={styles.formFields}>
              {renderInput({ type: "text", name: "nombre", placeholder: "Nombre", required: true })}
              {renderInput({ type: "email", name: "correo", placeholder: "Correo", required: true })}
              {renderInput({ type: "text", name: "telefono", placeholder: "Número de Teléfono", required: false })}
              {renderInput({ type: "text", name: "asunto", placeholder: "Asunto", required: false })}

              <div className={styles["wave-group"]}>
                <textarea
                  className={styles.input}
                  name="mensaje"
                  placeholder="Mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  required
                />
                <span className={styles.bar}></span>
              </div>

              <button type="submit" className={styles.submitBtn} disabled={loading}>
                {loading ? "Enviando..." : "Enviar"}
              </button>
            </div>
          </div>
        </form>

        {/* Formulario Queja/Sugerencia */}
        <form
          className={`${styles.formHalf} ${mode === "queja" ? styles.visible : styles.hidden} ${fileVisible ? styles.expanded : ""}`}
          onSubmit={handleSubmit}
        >
          <div className={styles.formContent}>
            <div className={styles.formFields}>
              {renderInput({ type: "text", name: "nombre", placeholder: "Nombre", required: true })}
              {renderInput({ type: "email", name: "correo", placeholder: "Correo", required: true })}

              <div className={styles["wave-group"]}>
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
                <span className={styles.bar}></span>
              </div>

              <div className={styles["wave-group"]}>
                <textarea
                  className={styles.input}
                  name="mensaje"
                  placeholder="Mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  required
                />
                <span className={styles.bar}></span>
              </div>

              <button type="submit" className={styles.submitBtn} disabled={loading}>
                {loading ? "Enviando..." : "Enviar"}
              </button>
            </div>

            {fileVisible && (
              <div className={styles.formFile}>
                <FileUpload visible={fileVisible} onFileSelect={handleFileSelect} />
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactForm;
