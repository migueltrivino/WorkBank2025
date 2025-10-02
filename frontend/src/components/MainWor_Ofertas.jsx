import React, { useState, useEffect, useMemo } from "react";
import { getUser } from "../utils/auth"; 
import styles from "../css/MainWor_Ofertas.module.css";

export default function MainWor_Ofertas() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [categoria, setCategoria] = useState("Todas");
  const [fechaFiltro, setFechaFiltro] = useState(""); // nueva fecha de filtro
  const [ofertas, setOfertas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalMessage, setModalMessage] = useState(null);
  const [selectedOferta, setSelectedOferta] = useState(null);

  useEffect(() => {
    const fetchOfertas = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/ofertas");
        const data = await res.json();
        setOfertas(Array.isArray(data) ? data : data.ofertas || []);
      } catch (error) {
        console.error("Error al cargar ofertas:", error);
        setOfertas([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOfertas();
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search.trim()), 300);
    return () => clearTimeout(t);
  }, [search]);

  const categorias = useMemo(() => {
    const cats = new Set(ofertas.map((o) => o.nombre_categoria || "Sin categoría"));
    return ["Todas", ...Array.from(cats)];
  }, [ofertas]);

  const ofertasFiltradas = useMemo(() => {
    const term = debouncedSearch.toLowerCase();
    return ofertas
      .filter((o) => {
        if (categoria !== "Todas" && (o.nombre_categoria || "Sin categoría") !== categoria) {
          return false;
        }
        if (fechaFiltro) {
          if (new Date(o.fecha_publicacion) < new Date(fechaFiltro)) return false;
        }
        if (!term) return true;
        return (
          o.titulo_oferta.toLowerCase().includes(term) ||
          o.descripcion_oferta.toLowerCase().includes(term) ||
          (o.nombre_categoria || "").toLowerCase().includes(term) ||
          (o.nombre_servicio || "").toLowerCase().includes(term) ||
          (o.nombre_empleador || "").toLowerCase().includes(term)
        );
      })
      .sort((a, b) => new Date(b.fecha_publicacion) - new Date(a.fecha_publicacion));
  }, [debouncedSearch, categoria, fechaFiltro, ofertas]);

  const clearFilters = () => {
    setSearch("");
    setCategoria("Todas");
    setFechaFiltro("");
  };

  const handlePostular = async (idOferta) => {
    try {
      const storedUser = getUser();
      if (!storedUser) {
        alert("Debes iniciar sesión para postularte.");
        return;
      }

      const token = storedUser.token;
      const res = await fetch("http://localhost:4000/api/postulaciones", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({
          id_usuario: storedUser.id_usuario,
          id_oferta: idOferta,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setModalMessage("✅ Te has postulado con éxito");
      } else {
        setModalMessage("⚠️ Error: " + data.message);
      }
    } catch (error) {
      console.error("Error al postular:", error);
      setModalMessage("❌ Error al postularse");
    }
  };

  return (
    <main className={styles["main-offers"]}>
      {/* Modal mensaje de éxito/error */}
      {modalMessage && (
        <div className={styles["modal-backdrop"]}>
          <div className={styles["confirm-modal"]}>
            <p>{modalMessage}</p>
            <div className={styles["form-actions"]}>
              <button className={styles["btn-cancel"]} onClick={() => setModalMessage(null)}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal detalle oferta */}
      {selectedOferta && (
        <div className={styles["modal-backdrop"]}>
          <div className={styles["offer-detail-modal"]}>
            <h2>{selectedOferta.titulo_oferta}</h2>
            <p>{selectedOferta.descripcion_oferta}</p>
            <div className={styles["offer-meta"]}>
              <span><strong>Publicación:</strong> {new Date(selectedOferta.fecha_publicacion).toLocaleDateString()}</span>
              <span><strong>Categoría:</strong> {selectedOferta.nombre_categoria || "Sin categoría"}</span>
              <span><strong>Servicio:</strong> {selectedOferta.nombre_servicio || "Sin servicio"}</span>
            </div>
            <button className={styles["btn-cancel"]} onClick={() => setSelectedOferta(null)}>
              Cerrar
            </button>
          </div>
        </div>
      )}

      <header className={styles["offers-header"]}>
        <h1>Ofertas Disponibles</h1>
        <p>Busca por título, descripción, categoría o servicio. Usa los filtros para refinar resultados.</p>

        {/* Filtros modernos */}
        <div className={styles["filters-container"]}>
          <input
            type="text"
            placeholder=" Buscar por nombre de oferta..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles["filter-input"]}
          />
          <input
            type="date"
            value={fechaFiltro}
            onChange={(e) => setFechaFiltro(e.target.value)}
            className={styles["filter-date"]}
          />
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className={styles["filter-select"]}
          >
            {categorias.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <button className={styles["btn-clear-filters"]} onClick={clearFilters}>
            ✖ Limpiar filtros
          </button>
        </div>
      </header>

      {/* Loader */}
      {loading ? (
        <div className={styles["loader-page"]}>
          <div className={styles["pencil-loader"]}></div>
          <p>Cargando ofertas...</p>
        </div>
      ) : (
        <div className={styles["offers-container"]}>
          {ofertasFiltradas.length === 0 ? (
            <p className={styles["no-results"]}>No se encontraron ofertas con esos filtros.</p>
          ) : (
            ofertasFiltradas.map((oferta) => (
              <div key={oferta.id_oferta} className={styles["offer-card"]}>
                <h3>{oferta.titulo_oferta}</h3>
                <p>{oferta.descripcion_oferta}</p>
                <div className={styles["offer-meta"]}>
                  <span><strong>Publicación:</strong> {new Date(oferta.fecha_publicacion).toLocaleDateString()}</span>
                  <span><strong>Categoría:</strong> {oferta.nombre_categoria || "Sin categoría"}</span>
                  <span><strong>Servicio:</strong> {oferta.nombre_servicio || "Sin servicio"}</span>
                </div>
                <div className={styles["offer-actions"]}>
                  <button
                    className={styles["btn-invisible"]}
                    onClick={() => setSelectedOferta(oferta)}
                  >
                    Ver detalle
                  </button>
                  <button
                    className={styles["btn-postular"]}
                    onClick={() => handlePostular(oferta.id_oferta)}
                  >
                    Postularme
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </main>
  );
}
