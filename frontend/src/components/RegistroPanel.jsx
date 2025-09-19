import React, { useState } from "react";
import styles from "../css/RegistroPanel.module.css";
import { useNavigate } from "react-router-dom";

function RegistroPanel() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    user_password: "",
    confirmarPassword: "",
    tipoDocumento: "C.C",
    numeroDocumento: "",
    rol: "2",
    documentoPdf: null,
  });

  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});

  // Manejo de inputs de texto y selects
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "rol" ? Number(value) : value,
    }));

    // si había error en ese campo, lo quitamos
    setErrors((prev) => {
      if (!prev || !prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  // Manejo del PDF
  const handleFileChange = (e) => {
    setFormData({ ...formData, documentoPdf: e.target.files[0] });
  };

  // Bloquear copiar/pegar en confirmación
  const handleBlockCopyPaste = (e) => {
    e.preventDefault();
    setMensaje("❌ No puedes copiar/pegar en este campo");
    setTipoMensaje("error");
  };

  // Validación al enviar
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validaciones básicas
    if (!formData.nombre || !formData.nombre.trim())
      newErrors.nombre = "El nombre es obligatorio";
    if (!formData.apellido || !formData.apellido.trim())
      newErrors.apellido = "El apellido es obligatorio";
    if (!formData.email || !formData.email.trim())
      newErrors.email = "El correo es obligatorio";
    if (!formData.numeroDocumento || !formData.numeroDocumento.trim())
      newErrors.numeroDocumento = "El número de documento es obligatorio";
    if (!formData.user_password)
      newErrors.user_password = "La contraseña es obligatoria";
    if (!formData.confirmarPassword)
      newErrors.confirmarPassword = "Debes confirmar la contraseña";

    // Longitud contraseña
    if (
      formData.user_password &&
      (formData.user_password.length < 8 ||
        formData.user_password.length > 20)
    ) {
      newErrors.user_password =
        "La contraseña debe tener entre 8 y 20 caracteres";
    }

    // carácter especial
    if (
      formData.user_password &&
      !/[!@#$%^&*(),.?":{}|<>]/.test(formData.user_password)
    ) {
      newErrors.user_password =
        "La contraseña debe incluir al menos 1 carácter especial";
    }

    // Coincidencia de contraseñas
    if (
      formData.user_password &&
      formData.confirmarPassword &&
      formData.user_password !== formData.confirmarPassword
    ) {
      newErrors.confirmarPassword = "Las contraseñas no coinciden";
    }

    // Validación de archivo
    if (formData.documentoPdf) {
      const allowed = ["application/pdf", "image/png"];
      if (!allowed.includes(formData.documentoPdf.type)) {
        newErrors.documentoPdf = "Solo se permiten archivos PDF o PNG";
      }
    }

    // Si hay errores
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);

      // enfocar primer campo con error
      const firstErrorField = Object.keys(newErrors)[0];
      const el = document.getElementsByName(firstErrorField)[0];
      if (el && el.focus) el.focus();
      return;
    }

    // limpiar errores si todo ok
    setErrors({});

    try {
      const data = new FormData();
      for (let key in formData) {
        data.append(key, formData[key]);
      }

      const res = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        body: data,
      });

      const result = await res.json();

      if (res.ok) {
        setMensaje(result.message);
        setTipoMensaje("exito");
        setTimeout(() => {
          navigate("/iniciarsesion");
        }, 1500);
      } else {
        setMensaje(`❌ Error: ${result.message}`);
        setTipoMensaje("error");
      }
    } catch (error) {
      console.error("Error:", error);
      setMensaje("❌ Error de conexión con el servidor");
      setTipoMensaje("error");
    }
  };

  return (
    <div className={styles["left-panel"]}>
      <h2>Registro</h2>
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
        <label className={styles.label} htmlFor="email">Correo electrónico</label>
        <input
          className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="ejemplo@gmail.com"
        />
        {errors.email && <span className={styles.errorField}>{errors.email}</span>}

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
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={styles.showBtn}
          >
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
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className={styles.showBtn}
          >
            {showConfirm ? "🙈" : "👁️"}
          </button>
        </div>
        {errors.confirmarPassword && <span className={styles.errorField}>{errors.confirmarPassword}</span>}

        {/* Documento */}
        <fieldset className={styles.fieldset}>
          <legend>Documento</legend>
          <div className={styles.documento}>
            <select
              className={`${styles.select} ${errors.tipoDocumento ? styles.selectError : ""}`}
              id="tipoDocumento"
              name="tipoDocumento"
              value={formData.tipoDocumento}
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
              className={`${styles.input} ${errors.numeroDocumento ? styles.inputError : ""}`}
              type="text"
              id="numeroDocumento"
              name="numeroDocumento"
              value={formData.numeroDocumento}
              onChange={handleChange}
              placeholder="Ejemplo: 123456789"
            />
          </div>
        </fieldset>
        {errors.numeroDocumento && <span className={styles.errorField}>{errors.numeroDocumento}</span>}

        {/* Rol */}
        <label className={styles.label} htmlFor="rol">Soy...</label>
        <select
          className={`${styles.select} ${errors.rol ? styles.selectError : ""}`}
          id="rol"
          name="rol"
          value={formData.rol}
          onChange={handleChange}
        >
          <option value={2}>Trabajador</option>
          <option value={1}>Empleador</option>
        </select>

        {/* PDF */}
        <label className={styles.label} htmlFor="documentoPdf">Documento en PDF</label>
        <input
          className={`${styles.input} ${errors.documentoPdf ? styles.inputError : ""}`}
          type="file"
          id="documentoPdf"
          name="documentoPdf"
          onChange={handleFileChange}
        />
        {errors.documentoPdf && <span className={styles.errorField}>{errors.documentoPdf}</span>}

        <button type="submit" className={styles.btn}>Ingresar</button>
      </form>

      <div className={styles.login}>
        ¿Ya tienes cuenta? <a href="/iniciarsesion">Inicia sesión</a>
      </div>

      {mensaje && (
        <p className={`${styles.mensaje} ${styles[tipoMensaje]}`}>{mensaje}</p>
      )}
    </div>
  );
}

export default RegistroPanel;
