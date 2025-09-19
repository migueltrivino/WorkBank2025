import { useState, useEffect } from "react";
import "../css/MainWor_Postulaciones.css";

export default function MainWor_Postulaciones({ idUsuario }) {
  const [postulaciones, setPostulaciones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    console.log("idUsuario:", idUsuario); 
    
    const fetchPostulaciones = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/postulaciones/usuario/${idUsuario}`);
        const data = await res.json();
        setPostulaciones(data);
      } catch (error) {
        console.error("Error al cargar postulaciones:", error);
      } finally {
        setLoading(false);
      }
    };

    if (idUsuario) fetchPostulaciones();
  }, [idUsuario]);

  return (
    <main className="postulaciones-container">
      <h1 className="titulo">Mis Postulaciones</h1>
      <p className="subtitulo">
        Mostrando postulaciones del usuario con ID: {idUsuario}
      </p>

      {loading ? (
        <p>Cargando...</p>
      ) : postulaciones.length === 0 ? (
        <p>No tienes postulaciones aún.</p>
      ) : (
        <div className="postulaciones-grid">
          {postulaciones.map((post) => (
            <div key={post.id_postulacion} className="postulacion-card">
              <h2>{post.titulo_oferta}</h2>
              <p>
                <strong>Estado:</strong> {post.estado_postu}
              </p>
              <p>
                <strong>Fecha:</strong>{" "}
                {new Date(post.fecha_postu).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}