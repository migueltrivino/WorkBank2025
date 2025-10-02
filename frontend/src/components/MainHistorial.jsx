import React, { useState, useEffect } from "react";
import styles from "../css/MainHistorial.module.css";
import { getUser } from "../utils/auth";

export default function MainHistorial() {
  const [userId, setUserId] = useState(null);
  const [historial, setHistorial] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [categoria, setCategoria] = useState("");

  // Guardar el id del usuario una sola vez
  useEffect(() => {
    const user = getUser();
    if (user) setUserId(user.id_usuario);
  }, []);

  // Traer historial solo cuando userId esté definido
  useEffect(() => {
    if (!userId) return;

    const fetchHistorial = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:4000/api/historial/usuario/${userId}`);
        if (!res.ok) throw new Error("Error al obtener historial");
        const data = await res.json();
        setHistorial(
          data.map((item) => ({
            ...item,
            fecha: item.fecha || "Sin fecha",
            usuario: item.usuario || "Desconocido",
            foto: item.foto || `https://i.pravatar.cc/60?u=${item.id_historial}`,
            pago: item.pago || 0,
          }))
        );
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar el historial.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistorial();
  }, [userId]);

  const historialFiltrado = historial.filter((item) => {
    const fechaItem = new Date(item.fecha);
    const fechaInicioDate = fechaInicio ? new Date(fechaInicio) : null;
    const fechaFinDate = fechaFin ? new Date(fechaFin) : null;

    const cumpleFecha =
      (!fechaInicioDate || fechaItem >= fechaInicioDate) &&
      (!fechaFinDate || fechaItem <= fechaFinDate);

    const cumpleCategoria = categoria ? item.categoria === categoria : true;

    return cumpleFecha && cumpleCategoria;
  });

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Historial de Contrataciones</h2>

      <div className={styles.filters}>
        <div>
          <label>Desde:</label>
          <input
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
          />
        </div>
        <div>
          <label>Hasta:</label>
          <input
            type="date"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
          />
        </div>
        <div>
          <label>Categoría:</label>
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="">Todas</option>
            <option value="Limpieza">Limpieza</option>
            <option value="Cuidado">Cuidado</option>
            <option value="Mascotas">Mascotas</option>
          </select>
        </div>
      </div>

      {loading ? (
        <p className={styles.noResults}>Cargando historial...</p>
      ) : error ? (
        <p className={styles.noResults}>{error}</p>
      ) : historialFiltrado.length > 0 ? (
        <div className={styles.table}>
          <div className={styles.header}>
            <span>Foto</span>
            <span>Rol</span>
            <span>Usuario</span>
            <span>Categoría</span>
            <span>Servicio</span>
            <span>Fecha de Terminación</span>
            <span>Pago</span>
          </div>

          {historialFiltrado.map((item) => (
            <div key={item.id_historial} className={styles.row}>
              <span>
                <img
                  src={item.foto}
                  alt={item.usuario}
                  className={styles.avatar}
                />
              </span>
              <span>{item.rol}</span>
              <span>{item.usuario}</span>
              <span>{item.categoria}</span>
              <span>{item.servicio}</span>
              <span>{item.fecha}</span>
              <span>${item.pago.toLocaleString("es-CO")}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className={styles.noResults}>⚠️ No hay resultados</p>
      )}
    </div>
  );
}
