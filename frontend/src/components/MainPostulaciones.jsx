import React, { useState, useEffect } from "react";
import styles from "../css/MainPostulaciones.module.css";
import { getUser } from "../utils/auth";

function MainPostulaciones() {
  const user = getUser();
  const [ofertasConPostulaciones, setOfertasConPostulaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [filters, setFilters] = useState({ estado: "", titulo: "", fecha: "" });

  useEffect(() => {
    if (!user) return;

    fetch(`http://localhost:4000/api/postulaciones/ofertas-del-usuario/${user.id_usuario}`)
      .then((res) => res.json())
      .then((data) => {
        setOfertasConPostulaciones(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar ofertas con postulaciones:", err);
        setLoading(false);
      });
  }, [user]);

  const actualizarEstado = (id, nuevoEstado, idOferta) => {
    setOfertasConPostulaciones((prev) =>
      prev.map((o) =>
        o.oferta.id_oferta === idOferta
          ? {
              ...o,
              postulaciones: o.postulaciones.map((p) =>
                p.id_postulacion === id ? { ...p, estado: nuevoEstado.toLowerCase() } : p
              ),
            }
          : o
      )
    );
    setOpenMenuId(null);
  };

  const aplicarFiltros = (postulaciones) => {
    return postulaciones.filter((p) => {
      const coincideEstado = filters.estado
        ? p.estado.toLowerCase() === filters.estado.toLowerCase()
        : true;
      const coincideTitulo = filters.titulo
        ? p.oferta?.titulo_oferta.toLowerCase().includes(filters.titulo.toLowerCase())
        : true;
      const coincideFecha = filters.fecha
        ? new Date(p.fecha_postu).toLocaleDateString("es-CO") === filters.fecha
        : true;
      return coincideEstado && coincideTitulo && coincideFecha;
    });
  };

  return (
    <div className={styles.applicationsContainer}>
      <h2 className={styles.header}>Postulaciones Recibidas</h2>

      {/* Filtros */}
      <div className={styles.filters}>
        <select
          value={filters.estado}
          onChange={(e) => setFilters({ ...filters, estado: e.target.value })}
        >
          <option value="">Filtrar por Estado</option>
          <option value="pendiente">Pendiente</option>
          <option value="aceptado">Aceptado</option>
          <option value="rechazado">Rechazado</option>
        </select>

        <input
          type="text"
          placeholder="Buscar por título de oferta"
          value={filters.titulo}
          onChange={(e) => setFilters({ ...filters, titulo: e.target.value })}
        />

        <input
          type="date"
          value={filters.fecha}
          onChange={(e) => setFilters({ ...filters, fecha: e.target.value })}
        />
      </div>

      {loading ? (
        <p>Cargando postulaciones...</p>
      ) : ofertasConPostulaciones.length === 0 ? (
        <p className={styles.noResults}>No se encontraron resultados.</p>
      ) : (
        <div className={styles.offersWrapper}>
          {ofertasConPostulaciones.map(({ oferta, postulaciones }) => (
            <div key={oferta.id_oferta} className={styles.offerCard}>
              <h3 className={styles.offerTitle}>{oferta.titulo_oferta}</h3>
              <p className={styles.offerDesc}>{oferta.descripcion_oferta}</p>
              <p className={styles.offerPrice}>
                <strong>Precio:</strong> ${oferta.pago}
              </p>

              <div className={styles.postulantesList}>
                {aplicarFiltros(postulaciones).map((post) => {
                  const isMenuOpen = openMenuId === post.id_postulacion;

                  return (
                    <div key={post.id_postulacion} className={styles.postulanteCard}>
                      <div className={styles.postulanteInfo}>
                        <img src={post.foto} alt={post.nombre} className={styles.avatar} />
                        <div>
                          <p><strong>{post.nombre}</strong></p>
                          <p className={styles.perfil}>{post.perfil}</p>
                          <p>
                            <strong>Fecha:</strong>{" "}
                            {new Date(post.fecha_postu).toLocaleDateString("es-CO")}{" "}
                            <strong>Hora:</strong>{" "}
                            {new Date(post.fecha_postu).toLocaleTimeString("es-CO", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>

                      {/* Botón de opciones visible al frente del usuario */}
                      {post.estado.toLowerCase() === "pendiente" && (
                        <div className={styles.menuWrapper}>
                          <button
                            className={styles.menuToggle}
                            onClick={() =>
                              setOpenMenuId(isMenuOpen ? null : post.id_postulacion)
                            }
                          >
                            Ver Opciones ▾
                          </button>

                          {isMenuOpen && (
                            <div className={styles.dropdownMenu}>
                              <button
                                onClick={() =>
                                  actualizarEstado(post.id_postulacion, "Aceptado", oferta.id_oferta)
                                }
                                className={styles.btnOutlineAccept}
                              >
                                Aceptar
                              </button>
                              <button
                                onClick={() =>
                                  actualizarEstado(post.id_postulacion, "Rechazado", oferta.id_oferta)
                                }
                                className={styles.btnOutlineReject}
                              >
                                Rechazar
                              </button>
                              <button
                                onClick={() => alert(`Ver perfil de ${post.nombre}`)}
                                className={styles.btnOutlineProfile}
                              >
                                Ver Perfil
                              </button>
                            </div>
                          )}
                        </div>
                      )}

                      {post.estado.toLowerCase() !== "pendiente" && (
                        <span
                          className={
                            post.estado.toLowerCase() === "aceptado"
                              ? styles.estadoAceptado
                              : styles.estadoRechazado
                          }
                        >
                          {post.estado}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MainPostulaciones;
