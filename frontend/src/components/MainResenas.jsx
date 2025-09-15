import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MainResenas({ idDestinatario }) {
  const [resenas, setResenas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResenas = async () => {
      try {
        const response = await axios.get(
          `/api/resenas/destinatario/${idDestinatario}`
        );
        setResenas(response.data);
      } catch (err) {
        setError("Error cargando reseñas");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchResenas();
  }, [idDestinatario]);

  if (loading) return <p>Cargando reseñas...</p>;
  if (error) return <p>{error}</p>;
  if (resenas.length === 0) return <p>No hay reseñas todavía.</p>;

  return (
    <div className="main-resenas">
      {resenas.map((resena) => (
        <div key={resena.id_resena} className="resena-card">
          <h4>Usuario: {resena.usuario_nombre}</h4>
          <p>{resena.contenido_resena}</p>
          <p>Puntaje: {resena.puntaje_resena} ⭐</p>
          <p className="fecha">
            Fecha: {new Date(resena.fecha_resena).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}

