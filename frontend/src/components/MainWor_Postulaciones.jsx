import { useState, useEffect, useMemo } from "react";
import styles from "../css/MainWor_Postulaciones.module.css";
import { getUser } from "../utils/auth"; // <-- helper para obtener usuario

export default function MainWor_Postulaciones() {
  const user = getUser(); // obtiene usuario logueado
  const [postulaciones, setPostulaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState("Todas");

  useEffect(() => {
    if (!user) return;

    fetch(`http://localhost:4000/api/postulaciones/usuario/${user.id_usuario}`)
      .then((res) => res.json())
      .then((data) => {
        setPostulaciones(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar postulaciones:", err);
        setLoading(false);
      });
  }, [user]);

  // Obtener categorías únicas
  const categorias = useMemo(() => {
    const cats = new Set(postulaciones.map((p) => p.categoria || "Sin categoría"));
    return ["Todas", ...Array.from(cats)];
  }, [postulaciones]);

  // Filtrado
  const postulacionesFiltradas = useMemo(() => {
    return postulaciones
      .filter((p) => {
        if (categoriaFiltro !== "Todas" && p.categoria !== categoriaFiltro) return false;
        const fecha = new Date(p.fecha_postu);
        if (fechaDesde && fecha < new Date(fechaDesde)) return false;
        if (fechaHasta && fecha > new Date(fechaHasta)) return false;
        return true;
      })
      .sort((a, b) => new Date(b.fecha_postu) - new Date(a.fecha_postu));
  }, [postulaciones, categoriaFiltro, fechaDesde, fechaHasta]);

  return (
    <main className={styles["postulaciones-container"]}>
      <h1 className={styles["titulo"]}>Mis Postulaciones</h1>

      {/* Filtros */}
      <div className={styles["filtros-container"]}>
        <label>
          Desde:
          <input
            type="date"
            value={fechaDesde}
            onChange={(e) => setFechaDesde(e.target.value)}
            className={styles["input-filtro"]}
          />
        </label>
        <label>
          Hasta:
          <input
            type="date"
            value={fechaHasta}
            onChange={(e) => setFechaHasta(e.target.value)}
            className={styles["input-filtro"]}
          />
        </label>
        <label>
          Categoría:
          <select
            value={categoriaFiltro}
            onChange={(e) => setCategoriaFiltro(e.target.value)}
            className={styles["select-filtro"]}
          >
            {categorias.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>
      </div>

      {loading ? (
        <p>Cargando postulaciones...</p>
      ) : postulacionesFiltradas.length === 0 ? (
        <p>No tienes postulaciones con esos filtros.</p>
      ) : (
        <div className={styles["tabla-container"]}>
          <table className={styles["tabla"]}>
            <thead>
              <tr>
                <th>Empleador</th>
                <th>Oferta</th>
                <th>Categoría</th>
                <th>Servicio</th>
                <th>Fecha de Postulación</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {postulacionesFiltradas.map((post) => (
                <tr key={post.id_postulacion}>
                  <td>{post.nombre_empleador || post.nombre}</td>
                  <td>{post.titulo_oferta}</td>
                  <td>{post.categoria}</td>
                  <td>{post.servicio}</td>
                  <td>{new Date(post.fecha_postu).toLocaleString()}</td>
                  <td className={`${styles["estado"]} ${styles[post.estado_postu]}`}>
                    {post.estado_postu}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
