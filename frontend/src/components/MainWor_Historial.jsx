import { useState, useEffect } from "react";
import "../css/MainWor_Historial.css";

export default function MainWor_Historial({ idUsuario }) {
  const [historial, setHistorial] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistorial = async () => {
      try {
        const res = await fetch(
          `http://localhost:4000/api/historial/usuario/${idUsuario}`
        );
        const data = await res.json();
        // Asegurarse de que data sea un array
        setHistorial(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error al cargar historial:", error);
        setHistorial([]); // fallback
      } finally {
        setLoading(false);
      }
    };

    if (idUsuario) fetchHistorial();
  }, [idUsuario]);

  return (
    <main className="historial-container">
      <h1 className="titulo">Historial de Ofertas</h1>
      <p className="subtitulo">
        Mostrando historial de ofertas del usuario con ID: {idUsuario}
      </p>

      {loading ? (
        <p>Cargando historial...</p>
      ) : historial.length === 0 ? (
        <p>No tienes historial aún.</p>
      ) : (
        <div className="historial-grid">
          {historial.map((item) => (
            <div key={item.id_historial} className="historial-card">
              <h2>{item.servicio_nombre}</h2>
              <p>
                <strong>Categoría:</strong> {item.categoria_nombre}
              </p>
              <p>
                <strong>Fecha:</strong>{" "}
                {item.fecha_contratacion
                  ? new Date(item.fecha_contratacion).toLocaleDateString()
                  : "Desconocida"}
              </p>
              <p
                className={`estado ${
                  item.estado?.toLowerCase() || "desconocido"
                }`}
              >
                <strong>Estado:</strong> {item.estado || "Desconocido"}
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}