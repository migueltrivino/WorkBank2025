import React, { useRef, useState } from "react";
import "../css/CompleteProfile.css";

const ProfileForm = () => {
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  // En celular abre cámara frontal con input
  const handleCameraClick = () => {
    if (/Mobi|Android/i.test(navigator.userAgent)) {
      cameraInputRef.current.click();
    } else {
      // En PC usar getUserMedia
      startWebCamera();
    }
  };

  const startWebCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" }, // user = frontal, environment = trasera
        audio: false,
      });
      setStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error al acceder a la cámara:", err);
      alert("No se pudo acceder a la cámara. Revisa los permisos.");
    }
  };

  return (
    <div className="profile-wrapper">
      <div className="profile-card">
        <h2 className="title">¡Completa tu perfil!</h2>
        <p className="subtitle">Sube una foto tuya y cuéntanos algo sobre ti</p>

        <div className="photo-container">
          <div className="photo-placeholder">
            <i className="camera-icon">📷</i>
          </div>
          {/* Si está la cámara activa, mostramos el video */}
          {stream && <video ref={videoRef} autoPlay playsInline />}
        </div>

        {/* Inputs ocultos */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
        />
        <input
          type="file"
          accept="image/*"
          capture="user" 
          ref={cameraInputRef}
          style={{ display: "none" }}
        />

        <div className="button-group">
          <button className="btn" onClick={handleUploadClick}>
            Subir una foto
          </button>
          <button className="btn" onClick={handleCameraClick}>
            Tomar foto
          </button>
        </div>

        <div className="description-box">
          <label htmlFor="desc">Descripción</label>
          <input
            type="text"
            id="desc"
            placeholder="Escribe algo aquí..."
            className="input"
          />
        </div>

        <button className="btn finalize">Finalizar</button>
      </div>
    </div>
  );
};

export default ProfileForm;
