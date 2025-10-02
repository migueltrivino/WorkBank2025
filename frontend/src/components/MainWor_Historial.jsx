import { useState, useEffect } from "react";
import styles from "../css/MainWor_Historial.module.css";
import { getUser } from "../utils/auth";

export default function MainWor_Historial() {
  const user = getUser();
  const userId = user?.id_usuario;

  const [historial, setHistorial] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtroEstado, setFiltroEstado] = useState("Todos");
  const [filtroCategoria, setFiltroCategoria] = useState("Todos");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const fetchHistorial = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:4000/api/historial/usuario/${userId}`);
        if (!res.ok) throw new Error("Error al obtener historial");
        const data = await res.json();
        setHistorial(data);
      } catch (err) {
        console.error("Error al cargar historial:", err);
        setError("No se pudo cargar el historial.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistorial();
  }, [userId]); // ahora solo depende del id, no del objeto completo

  const historialFiltrado = historial.filter((item) => {
    const coincideEstado = filtroEstado === "Todos" || item.estado === filtroEstado;
    const coincideCategoria = filtroCategoria === "Todos" || item.categoria === filtroCategoria;
    return coincideEstado && coincideCategoria;
  });

  return (
    <main className={styles.historialContainer}>
      <header className={styles.headerTop}>
        <h1 className={styles.titulo}>Historial de Ofertas</h1>
        <p className={styles.subtitulo}>
          Mostrando trabajos pasados del trabajador: {user?.nombre} {user?.apellido}
        </p>
      </header>

      {/* Filtros */}
      <div className={styles.filtros}>
        <select
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
          className={styles.selectFiltro}
        >
          <option value="Todos">Todos los estados</option>
          <option value="Aceptada">Finalizadas</option>
          <option value="Rechazada">Rechazadas</option>
        </select>

        <select
          value={filtroCategoria}
          onChange={(e) => setFiltroCategoria(e.target.value)}
          className={styles.selectFiltro}
        >
          <option value="Todos">Todas las categorías</option>
          <option value="Construcción">Construcción</option>
          <option value="Transporte">Transporte</option>
          <option value="Limpieza">Limpieza</option>
          <option value="Educación">Educación</option>
          <option value="Salud">Salud</option>
        </select>
      </div>

      <section className={styles.historialWrapper}>
        {loading ? (
          <p className={styles.cargando}>Cargando historial...</p>
        ) : error ? (
          <p className={styles.vacio}>{error}</p>
        ) : historialFiltrado.length === 0 ? (
          <p className={styles.vacio}>No hay resultados con los filtros seleccionados.</p>
        ) : (
          <div className={styles.tablaWrapper}>
            <table className={styles.tabla}>
              <thead>
                <tr>
                  <th>Empleador</th>
                  <th>Categoría</th>
                  <th>Servicio</th>
                  <th>Fecha de Postulación</th>
                  <th>Pago</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {historialFiltrado.map((item) => (
                  <tr key={item.id_historial}>
                    <td>{item.empleador?.nombre || "N/A"}</td>
                    <td>{item.categoria || "N/A"}</td>
                    <td>{item.servicio || "N/A"}</td>
                    <td>
                      {item.fecha_postulacion
                        ? new Date(item.fecha_postulacion).toLocaleDateString("es-ES", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "N/A"}
                    </td>
                    <td className={styles.pago}>{item.pago || "N/A"}</td>
                    <td>
                      <span
                        className={`${styles.estado} ${
                          styles[item.estado?.toLowerCase() || "pendiente"]
                        }`}
                      >
                        {item.estado === "Aceptada"
                          ? "Finalizada"
                          : item.estado === "Rechazada"
                          ? "Rechazada"
                          : "Pendiente"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
