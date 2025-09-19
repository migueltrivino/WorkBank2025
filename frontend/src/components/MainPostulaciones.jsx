import React, { useEffect, useState } from "react";
import "../css/MainApplications.css"; 

function MainApplications({ idUsuario }) {
  const [postulaciones, setPostulaciones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!idUsuario) return; // Espera a que el id del usuario esté disponible

    const fetchPostulaciones = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/postulaciones/usuario/${idUsuario}`);
        if (!res.ok) throw new Error("Error al cargar postulaciones");
        const data = await res.json();
        setPostulaciones(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPostulaciones();
  }, [idUsuario]);

  if (loading) {
    return <p>Cargando postulaciones...</p>;
  }

  if (postulaciones.length === 0) {
    return <p>No tienes postulaciones aún.</p>;
  }

  return (
    <div className="applications-container">
      <h2>Mis Postulaciones</h2>
      <div className="applications-grid">
        {postulaciones.map((post) => (
          <div key={post.id_postulacion} className="application-card">
            <h3>{post.oferta?.titulo_oferta || "Oferta eliminada"}</h3>
            <p><strong>Estado:</strong> {post.estado}</p>
            <p><strong>Fecha de postulación:</strong> {new Date(post.fecha_postulacion).toLocaleDateString("es-CO")}</p>
            <p><strong>Descripción de la oferta:</strong> {post.oferta?.descripcion_oferta || "No disponible"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MainApplications;