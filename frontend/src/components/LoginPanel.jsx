import React, { useState } from 'react';
import styles from "../css/LoginPanel.module.css";
import googleLogo from '../assets/google.png';
import { useNavigate } from 'react-router-dom';
import { saveToken, saveUser } from '../utils/auth';
import useToast from "../components/toast/useToast"; // <-- importamos hook de Toast

function LoginPanel() {
  const navigate = useNavigate();
  const { showToast } = useToast(); // <-- usamos showToast

  const [formData, setFormData] = useState({
    email: "",
    user_password: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Limpiar error si existe
    setErrors((prev) => {
      if (!prev || !prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validaciones
    if (!formData.email.trim()) newErrors.email = "El correo es obligatorio";
    else if (!isValidEmail(formData.email)) newErrors.email = "Correo inválido";

    if (!formData.user_password.trim()) newErrors.user_password = "La contraseña es obligatoria";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstErrorField = Object.keys(newErrors)[0];
      const el = document.getElementsByName(firstErrorField)[0];
      if (el && el.focus) el.focus();
      return;
    }

    setErrors({});

    try {
      const res = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const result = await res.json();

      if (res.ok) {
        saveToken(result.accessToken);
        saveUser(result.user);

        showToast(result.message, "success"); // <-- mostramos alerta de éxito

        setTimeout(() => {
          switch(result.user.rol) {
            case 1:
              navigate("/employer");
              break;
            case 2:
              navigate("/worker");
              break;
            case 3:
              navigate("/admin");
              break;
            default:
              navigate("/");
          }
        }, 1500);
      } else {
        showToast(`❌ ${result.message}`, "error"); // <-- alerta de error
      }

    } catch (error) {
      console.error(error);
      showToast("❌ Error de conexión con el servidor", "error"); // <-- alerta de conexión
    }
  };

  return (
    <div className={styles['right-panel']}>
      <h2>Iniciar sesión</h2>
      <form className={styles.form} id="loginForm" onSubmit={handleSubmit}>
        {/* Email */}
        <label className={styles.label} htmlFor="email">Correo electrónico</label>
        <input
          className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
          type="email"
          id="email"
          name="email"
          placeholder="ejemplo@gmail.com"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span className={styles.errorField}>{errors.email}</span>}

        {/* Contraseña */}
        <label className={styles.label} htmlFor="user_password">Contraseña</label>
        <input
          className={`${styles.input} ${errors.user_password ? styles.inputError : ""}`}
          type="password"
          id="user_password"
          name="user_password"
          placeholder="********"
          value={formData.user_password}
          onChange={handleChange}
        />
        {errors.user_password && <span className={styles.errorField}>{errors.user_password}</span>}

        <div className={styles.forgot}>
          <a href="#">¿Olvidó su contraseña?</a>
        </div>

        <button type="submit" className={styles.btn}>Ingresar</button>

        <button type="button" className={`${styles.btn} ${styles['google-btn']}`}>
          <img src={googleLogo} alt="Google" /> Continuar con Google
        </button>
      </form>

      <div className={styles.register}>
        ¿Nuevo en Workbank? <a href="/registro">Crea tu cuenta</a>
      </div>
    </div>
  );
}

export default LoginPanel;