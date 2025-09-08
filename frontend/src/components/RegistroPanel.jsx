import React, { useState } from "react";
import styles from '../css/RegistroPanel.module.css';
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
  const [tipoMensaje, setTipoMensaje] = useState("")

  // Manejo de inputs de texto y selects
  const handleChange = (e) => { 
    const { name, value } = e.target;
    setFormData({ 
    ...formData, 
    [name]: name === "rol" ? Number(value) : value 
  });
  };

  // Manejo del PDF
  const handleFileChange = (e) => {
    setFormData({ ...formData, documentoPdf: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar contraseñas
    if (formData.user_password !== formData.confirmarPassword) {
      setMensaje("❌ Las contraseñas no coinciden");
      return;
    }

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
        setTipoMensaje("exito")
        setTimeout(() => {
          navigate("/iniciarsesion");

        }, 1500);
      } else {
        setMensaje(`❌ Error: ${result.message}`);
        setTipoMensaje ("error")
      }
    } catch (error) {
      console.error("Error:", error);
      setMensaje("❌ Error de conexión con el servidor");
    }
  };

  return (
    <div className={styles['left-panel']}>
      <h2>Registro</h2>
      <form className={styles.form} onSubmit={handleSubmit} id="loginForm">
        <label className={styles.label} htmlFor="nombre">Nombre</label>
        <input className={styles.input} type="text" id="nombre" name="nombre"
          value={formData.nombre} onChange={handleChange} placeholder="Tu nombre" required />

        <label className={styles.label} htmlFor="apellido">Apellido</label>
        <input className={styles.input} type="text" id="apellido" name="apellido"
          value={formData.apellido} onChange={handleChange} placeholder="Tu apellido" required />

        <label className={styles.label} htmlFor="email">Correo electrónico</label>
        <input className={styles.input} type="email" id="email" name="email"
          value={formData.email} onChange={handleChange} placeholder="ejemplo@gmail.com" required />

        <label className={styles.label} htmlFor="user_password">Contraseña</label>
        <input className={styles.input} type="password" id="user_password" name="user_password"
          value={formData.user_password} onChange={handleChange} placeholder="****" required />

        <label className={styles.label} htmlFor="confirmarPassword">Confirmar contraseña</label>
        <input className={styles.input} type="password" id="confirmarPassword" name="confirmarPassword"
          value={formData.confirmarPassword} onChange={handleChange} placeholder="****" required />

        <fieldset className={styles.fieldset}>
          <legend>Documento</legend>
          <div className={styles.documento}>
            <select className={styles.select} id="tipoDocumento" name="tipoDocumento"
              value={formData.tipoDocumento} onChange={handleChange} required>
              <option value="C.C">C.C</option>
              <option value="T.I">T.I</option>
              <option value="C.E">C.E</option>
              <option value="P.E.P">P.E.P</option>
              <option value="P.P">P.P</option>
              <option value="P.P.T">P.P.T</option>
            </select>

            <input className={styles.input} type="text" id="numeroDocumento" name="numeroDocumento"
              value={formData.numeroDocumento} onChange={handleChange}
              placeholder="Ejemplo: 123456789" required />
          </div>
        </fieldset>

        <label className={styles.label} htmlFor="rol">Soy...</label>
        <select className={styles.select} id="rol" name="rol"
          value={formData.rol} onChange={handleChange} required>
          <option value={2}>Trabajador</option>
          <option value={1}>Empleador</option>
        </select>

        <label className={styles.label} htmlFor="documentoPdf">Documento en PDF</label>
        <input className={styles.input} type="file" id="documentoPdf" name="documentoPdf"
          onChange={handleFileChange} required />

        <button type="submit" className={styles.btn}>Ingresar</button>
      </form>

      <div className={styles.login}>
        ¿Ya tienes cuenta? <a href="/iniciarsesion">Inicia sesión</a>
      </div>

      {mensaje && <p className={`${styles.mensaje} ${styles[tipoMensaje]}`}>{mensaje}</p>}
    </div>
  );
}

export default RegistroPanel;