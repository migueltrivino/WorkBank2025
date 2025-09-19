import React, { useState } from 'react';
import styles from "../css/LoginPanel.module.css";
import googleLogo from '../assets/google.png';
import { useNavigate } from 'react-router-dom';
import { saveToken, saveUser } from '../utils/auth';

function LoginPanel() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    user_password: ""
  });

  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const result = await res.json();

      if (res.ok) {
        // Guardar token y usuario en localStorage
        saveToken(result.accessToken);
        saveUser(result.user);  

        console.log("AccessToken guardado:", result.accessToken);
        console.log("Usuario guardado:", result.user);

        setMensaje(result.message);
        setTipoMensaje("exito");

        // Redirección según el rol
        setTimeout(() => {
          switch(result.user.rol) {
            case 1: // Empleador
              navigate("/employer");
              break;
            case 2: // Trabajador
              navigate("/worker");
              break;
            default: // fallback
              navigate("/");
          }
        }, 1500);

      } else {
        setMensaje(`❌ ${result.message}`);
        setTipoMensaje("error");
      }

    } catch (error) {
      console.error(error);
      setMensaje("❌ Error de conexión con el servidor");
      setTipoMensaje("error");
    }
  };

  return (
    <div className={styles['right-panel']}>
      <h2>Iniciar sesión</h2>
      <form className={styles.form} id="loginForm" onSubmit={handleSubmit}>
        <label className={styles.label} htmlFor="email">Correo electrónico</label>
        <input
          className={styles.input}
          type="email"
          id="email"
          name="email"
          placeholder="ejemplo@gmail.com"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label className={styles.label} htmlFor="user_password">Contraseña</label>
        <input
          className={styles.input}
          type="password"
          id="user_password"
          name="user_password"
          placeholder="********"
          value={formData.user_password}
          onChange={handleChange}
          required
        />

        <div className={styles.forgot}>
          <a href="#">¿Olvidó su contraseña?</a>
        </div>

        <button type="submit" className={styles.btn}>
          Ingresar
        </button>

        <button type="button" className={`${styles.btn} ${styles['google-btn']}`}>
          <img src={googleLogo} alt="Google" /> Continuar con Google
        </button>
      </form>

      <div className={styles.register}>
        ¿Nuevo en Workbank? <a href="/registro">Crea tu cuenta</a>
        {mensaje && <p className={`${styles.mensaje} ${styles[tipoMensaje]}`}>{mensaje}</p>}
      </div>
    </div>
  );
}

export default LoginPanel;
