import React, { useState, useRef } from "react";
import styles from "../css/RegistroFoto.module.css";
// import styles from "../css/RegistroPanel.module.css";
import useToast from "./toast/useToast";

function RegistroFoto({ userId, onNext }) {
  const { showToast } = useToast();
  const [foto, setFoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [descripcion, setDescripcion] = useState("");
  const [loading, setLoading] = useState(false);
  const [modo, setModo] = useState(null);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && ["image/jpeg", "image/png"].includes(file.type)) {
      setFoto(file);
      setPreview(URL.createObjectURL(file));
    } else {
      showToast("❌ Solo se permiten JPG o PNG", "error");
    }
  };

  const iniciarCamara = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (err) {
      console.error(err);
      showToast("❌ No se pudo acceder a la cámara", "error");
    }
  };

  const capturarFoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (canvas && video) {
      const ctx = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      canvas.toBlob((blob) => {
        if (blob) {
          setFoto(blob);
          setPreview(URL.createObjectURL(blob));
          showToast("✅ Foto capturada", "success");
        }
      }, "image/png");
    }
  };

  const handleOmitir = () => {
    setFoto(null);
    setPreview(null);
    showToast("ℹ️ No se subió ninguna foto", "info");
    onNext?.();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!foto) {
      showToast("❌ Debes subir o tomar una foto", "error");
      return;
    } 

    try {
      setLoading(true);
      const data = new FormData();
      data.append("id_usuario", userId);
      data.append("foto", foto, foto.name || "foto.png"); // ⚡ nombre real
      data.append("descripcion", descripcion);

      const res = await fetch("http://localhost:4000/api/auth/upload-photo", {
        method: "POST",
        body: data,
      });

      const result = await res.json();

      if (res.ok) {
        showToast("✅ Foto subida con éxito", "success");
        onNext?.();
      } else {
        showToast(`❌ Error: ${result.message}`, "error");
      }
    } catch (error) {
      console.error(error);
      showToast("❌ Error de conexión con el servidor", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles["foto-panel"]}>
      <h2>Registro – Paso 2: Foto y descripción</h2>

      <div className={styles.preview}>
        {preview ? (
          <img src={preview} alt="Foto seleccionada" />
        ) : modo === "camara" ? (
          <video ref={videoRef} autoPlay playsInline />
        ) : (
          <p>📷 No hay foto seleccionada</p>
        )}
      </div>

      <canvas ref={canvasRef} style={{ display: "none" }} />

      {!modo && (
        <div className={styles["btn-group"]}>
          <button type="button" onClick={() => setModo("archivo")}>📁 Subir desde archivos</button>
          <button type="button" onClick={() => { setModo("camara"); iniciarCamara(); }}>📸 Tomar con cámara</button>
        </div>
      )}

      {modo === "archivo" && (
        <label className={styles.btn}>
          Seleccionar foto
          <input type="file" accept="image/*" style={{ display: "none" }} onChange={handleFileChange} />
        </label>
      )}

      {modo === "camara" && (
        <button type="button" onClick={capturarFoto}>📷 Capturar</button>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        <label>Descripción corta:</label>
        <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="Escribe una breve descripción..." />

        <div className={styles["btn-group"]}>
          <button type="submit" disabled={loading}>{loading ? "Subiendo..." : "Continuar"}</button>
          <button type="button" onClick={handleOmitir}>Omitir</button>
        </div>
      </form>
    </div>
  );
}

export default RegistroFoto;
