// src/components/RegistroPanel.jsx
import React, { useState } from "react";
import styles from "../css/RegistroPanel.module.css";
import { useNavigate } from "react-router-dom";
import useToast from "./toast/useToast";

function RegistroPanel({ onNext }) {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    correo: "",          // ✅ coincide con la BD
    user_password: "",
    confirmarPassword: "",
    tipo_documento: "C.C", // ✅ coincide con la BD
    numero_documento: "",  // ✅ coincide con la BD
    id_rol: 2,             // ✅ coincide con la BD (2 = trabajador)
    documento_pdf: null,   // ✅ coincide con la BD
    imagen_perfil: null,   // opcional en la BD
    descripcion: "",
    aceptarTerminos: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});

  // Manejo de cambios
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "id_rol"
          ? Number(value)
          : type === "checkbox"
          ? checked
          : value,
    }));

    // limpiar error si lo corrige
    setErrors((prev) => {
      if (!prev || !prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, documento_pdf: e.target.files[0] });
  };

  const handleBlockCopyPaste = (e) => {
    e.preventDefault();
    showToast("❌ No puedes copiar/pegar en este campo", "error");
  };

  // Validaciones + envío
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // validaciones (usando los nombres actuales del state)
    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es obligatorio";
    if (!formData.apellido.trim()) newErrors.apellido = "El apellido es obligatorio";
    if (!formData.correo.trim()) newErrors.correo = "El correo es obligatorio";
    if (!formData.numero_documento.trim()) newErrors.numero_documento = "El número de documento es obligatorio";
    if (!formData.user_password) newErrors.user_password = "La contraseña es obligatoria";
    if (!formData.confirmarPassword) newErrors.confirmarPassword = "Debes confirmar la contraseña";

    if (formData.user_password && (formData.user_password.length < 8 || formData.user_password.length > 20))
      newErrors.user_password = "La contraseña debe tener entre 8 y 20 caracteres";
    if (formData.user_password && !/[!@#$%^&*(),.?\":{}|<>]/.test(formData.user_password))
      newErrors.user_password = "La contraseña debe incluir al menos 1 carácter especial";
    if (formData.user_password !== formData.confirmarPassword)
      newErrors.confirmarPassword = "Las contraseñas no coinciden";

    // Validación de PDF obligatorio
    if (!formData.documento_pdf) {
      newErrors.documento_pdf = "El documento PDF es obligatorio";
    } else {
      const allowed = ["application/pdf", "image/png"];
      if (!allowed.includes(formData.documento_pdf.type))
        newErrors.documento_pdf = "Solo se permiten archivos PDF o PNG";
    }


    if (!formData.aceptarTerminos)
      newErrors.aceptarTerminos = "Debes aceptar los términos y condiciones";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const first = Object.keys(newErrors)[0];
      const el = document.getElementsByName(first)[0];
      if (el && el.focus) el.focus();
      return;
    }

    setErrors({});

    try {
      const data = new FormData();
      // append solo los campos que debe recibir el backend (evitar undefined)
      data.append("nombre", formData.nombre);
      data.append("apellido", formData.apellido);
      data.append("correo", formData.correo);
      data.append("user_password", formData.user_password);
      data.append("tipo_documento", formData.tipo_documento);
      data.append("numero_documento", formData.numero_documento);
      data.append("id_rol", formData.id_rol);

      if (formData.documento_pdf) {
        data.append("documento_pdf", formData.documento_pdf);
      }

      const res = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        body: data,
      });

      const result = await res.json();

      if (res.ok) {
        showToast(result.message || "Usuario registrado correctamente", "success");
        const idUsuario = result.user?.id_usuario ?? null;
        const correoUsuario = result.user?.correo ?? formData.correo; // <-- agregado
        setTimeout(() => { if (onNext) onNext(idUsuario,  correoUsuario); }, 300);
      } else {
        showToast(`❌ Error: ${result.message}`, "error");
      }
    } catch (err) {
      console.error("Error:", err);
      showToast("❌ Error de conexión con el servidor", "error");
    }
  };

  return (
    <div className={styles["left-panel"]}>
      <h2>Registro – Paso 1: Datos Básicos</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        {/* Nombre */}
        <label className={styles.label} htmlFor="nombre">Nombre</label>
        <input
          className={`${styles.input} ${errors.nombre ? styles.inputError : ""}`}
          type="text"
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Tu nombre"
        />
        {errors.nombre && <span className={styles.errorField}>{errors.nombre}</span>}

        {/* Apellido */}
        <label className={styles.label} htmlFor="apellido">Apellido</label>
        <input
          className={`${styles.input} ${errors.apellido ? styles.inputError : ""}`}
          type="text"
          id="apellido"
          name="apellido"
          value={formData.apellido}
          onChange={handleChange}
          placeholder="Tu apellido"
        />
        {errors.apellido && <span className={styles.errorField}>{errors.apellido}</span>}

        {/* Correo */}
        <label className={styles.label} htmlFor="correo">Correo electrónico</label>
        <input
          className={`${styles.input} ${errors.correo ? styles.inputError : ""}`}
          type="email"
          id="correo"
          name="correo"
          value={formData.correo}
          onChange={handleChange}
          placeholder="ejemplo@gmail.com"
        />
        {errors.correo && <span className={styles.errorField}>{errors.correo}</span>}

        {/* Contraseña */}
        <label className={styles.label} htmlFor="user_password">Contraseña</label>
        <div className={styles.passwordWrapper}>
          <input
            className={`${styles.input} ${errors.user_password ? styles.inputError : ""}`}
            type={showPassword ? "text" : "password"}
            id="user_password"
            name="user_password"
            value={formData.user_password}
            onChange={handleChange}
            placeholder="****"
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className={styles.showBtn}>
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>
        {errors.user_password && <span className={styles.errorField}>{errors.user_password}</span>}

        {/* Confirmar contraseña */}
        <label className={styles.label} htmlFor="confirmarPassword">Confirmar contraseña</label>
        <div className={styles.passwordWrapper}>
          <input
            className={`${styles.input} ${errors.confirmarPassword ? styles.inputError : ""}`}
            type={showConfirm ? "text" : "password"}
            id="confirmarPassword"
            name="confirmarPassword"
            value={formData.confirmarPassword}
            onChange={handleChange}
            placeholder="****"
            onCopy={handleBlockCopyPaste}
            onPaste={handleBlockCopyPaste}
          />
          <button type="button" onClick={() => setShowConfirm(!showConfirm)} className={styles.showBtn}>
            {showConfirm ? "🙈" : "👁️"}
          </button>
        </div>
        {errors.confirmarPassword && <span className={styles.errorField}>{errors.confirmarPassword}</span>}

        {/* Documento */}
        <fieldset className={styles.fieldset}>
          <legend>Documento</legend>
          <div className={styles.documento}>
            <select
              className={`${styles.select} ${errors.tipo_documento ? styles.selectError : ""}`}
              id="tipo_documento"
              name="tipo_documento"
              value={formData.tipo_documento}
              onChange={handleChange}
            >
              <option value="C.C">C.C</option>
              <option value="T.I">T.I</option>
              <option value="C.E">C.E</option>
              <option value="P.E.P">P.E.P</option>
              <option value="P.P">P.P</option>
              <option value="P.P.T">P.P.T</option>
            </select>

            <input
              className={`${styles.input} ${errors.numero_documento ? styles.inputError : ""}`}
              type="text"
              id="numero_documento"
              name="numero_documento"
              value={formData.numero_documento}
              onChange={handleChange}
              placeholder="Ejemplo: 123456789"
            />
          </div>
        </fieldset>
        {errors.numero_documento && <span className={styles.errorField}>{errors.numero_documento}</span>}

        {/* Rol */}
        <label className={styles.label} htmlFor="id_rol">Soy...</label>
        <select
          className={`${styles.select} ${errors.id_rol ? styles.selectError : ""}`}
          id="id_rol"
          name="id_rol"
          value={formData.id_rol}
          onChange={handleChange}
        >
          <option value={2}>Trabajador</option>
          <option value={1}>Empleador</option>
        </select>

        {/* PDF */}
        <label className={styles.label} htmlFor="documento_pdf">Documento en PDF</label>
        <input
          className={`${styles.input} ${errors.documento_pdf ? styles.inputError : ""}`}
          type="file"
          id="documento_pdf"
          name="documento_pdf"
          onChange={handleFileChange}
        />
        {errors.documento_pdf && <span className={styles.errorField}>{errors.documento_pdf}</span>}

        {/* Aceptar términos */}
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            id="aceptarTerminos"
            name="aceptarTerminos"
            checked={formData.aceptarTerminos}
            onChange={handleChange}
          />
          Acepto los términos y condiciones
        </label>
        {errors.aceptarTerminos && <span className={styles.errorField}>{errors.aceptarTerminos}</span>}

        <button type="submit" className={styles.btn}>Continuar</button>
      </form>

      <div className={styles.login}>
        ¿Ya tienes cuenta? <a href="/iniciarsesion">Inicia sesión</a>
      </div>
    </div>
  );
}

export default RegistroPanel;