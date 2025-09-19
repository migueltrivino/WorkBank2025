import { useState, useEffect } from "react";
import "../css/MainWor_Resenas.css";

export default function MainWor_Resenas({ idUsuario }) {
  const [resenas, setResenas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!idUsuario) {
      setLoading(false); // evita quedarse "Cargando..." si no hay ID
      return;
    }

    const fetchResenas = async () => {
      try {
        const res = await fetch(
          `http://localhost:4000/api/resenas/usuario/${idUsuario}`
        );
        const data = await res.json();
        setResenas(data);
      } catch (error) {
        console.error("Error al cargar reseñas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResenas();
  }, [idUsuario]);

  return (
    <main className="resenas-container">
      <h1 className="titulo">Mis Reseñas</h1>
      <p className="subtitulo">
        Mostrando reseñas del usuario con ID: {idUsuario}
      </p>

      {loading ? (
        <p>Cargando reseñas...</p>
      ) : resenas.length === 0 ? (
        <p>No tienes reseñas aún.</p>
      ) : (
        <div className="resenas-grid">
          {resenas.map((resena) => (
            <div key={resena.id_resena} className="resena-card">
              <p className="contenido">"{resena.contenido_resena}"</p>
              <p className="puntaje">
                ⭐ {Number(resena.puntaje_resena).toFixed(1)} / 5
              </p>
              <p className="fecha">
                <strong>Fecha:</strong>{" "}
                {new Date(resena.fecha_resena).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
} 