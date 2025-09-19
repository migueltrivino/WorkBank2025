import React, { useState, useEffect, useMemo } from "react";
import { getUser } from "../utils/auth"; // 🔹 traer usuario logueado
import "../css/MainWor_Ofertas.css";

export default function MainWor_Ofertas() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [categoria, setCategoria] = useState("Todas");
  const [onlyRecent, setOnlyRecent] = useState(false);
  const [ofertas, setOfertas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalMessage, setModalMessage] = useState(null);

  useEffect(() => {
    const fetchOfertas = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/ofertas");
        const data = await res.json();
        setOfertas(data);
      } catch (error) {
        console.error("Error al cargar ofertas:", error);
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
        if (onlyRecent) {
          const limite = new Date();
          limite.setDate(limite.getDate() - 30);
          if (new Date(o.fecha_publicacion) < limite) return false;
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
  }, [debouncedSearch, categoria, onlyRecent, ofertas]);

  const clearFilters = () => {
    setSearch("");
    setCategoria("Todas");
    setOnlyRecent(false);
  };

  // 🔹 Función postularse usando usuario de localStorage
  const handlePostular = async (idOferta) => {
    try {
      const storedUser = getUser(); // 🔹 traer usuario logueado
      if (!storedUser) {
        alert("Debes iniciar sesión para postularte.");
        return;
      }

      const token = storedUser.token; // si tu backend usa JWT
      const res = await fetch("http://localhost:4000/api/postulaciones", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({
          id_usuario: storedUser.id_usuario, // 🔹 ID real del usuario
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
    <main className="ofertas-container">
      {modalMessage && (
        <div className="modal-overlay">
          <div className="modal">
            <p>{modalMessage}</p>
            <button className="btn-close" onClick={() => setModalMessage(null)}>
              Cerrar
            </button>
          </div>
        </div>
      )}

      <header className="ofertas-header">
        <div>
          <h1 className="titulo">Ofertas Disponibles</h1>
          <p className="subtitulo">
            Busca por título, descripción, categoría o servicio. Usa los filtros para refinar resultados.
          </p>
        </div>

        <div className="search-actions">
          <div className="search-bar">
            <input
              aria-label="buscar ofertas"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar ofertas..."
            />
            <button className="clear-search" title="Limpiar búsqueda" onClick={() => setSearch("")}>
              ✕
            </button>
          </div>

          <select
            className="categoria-select"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            aria-label="Filtrar por categoría"
          >
            {categorias.map((c) => (
              <option value={c} key={c}>
                {c}
              </option>
            ))}
          </select>

          <label className="recent-toggle">
            <input
              type="checkbox"
              checked={onlyRecent}
              onChange={() => setOnlyRecent((s) => !s)}
            />
            Sólo recientes
          </label>

          <button className="btn-clear" onClick={clearFilters}>
            Limpiar filtros
          </button>
        </div>
      </header>

      <div className="results-info">
        {loading ? (
          <span>Cargando ofertas...</span>
        ) : (
          <span>
            {ofertasFiltradas.length} {ofertasFiltradas.length === 1 ? "resultado" : "resultados"}
          </span>
        )}
        {debouncedSearch && <span className="search-term">Buscando: "{debouncedSearch}"</span>}
      </div>

      <section className="ofertas-grid">
        {loading ? (
          <div className="loading">🔄 Cargando...</div>
        ) : ofertasFiltradas.length === 0 ? (
          <div className="no-results">No se encontraron ofertas con esos filtros.</div>
        ) : (
          ofertasFiltradas.map((oferta) => (
            <article key={oferta.id_oferta} className="oferta-card">
              <div className="card-top">
                <h2 className="oferta-title">{oferta.titulo_oferta}</h2>
                <span className="badge">{oferta.nombre_categoria || "Sin categoría"}</span>
              </div>

              <p className="oferta-desc">{oferta.descripcion_oferta}</p>

              <div className="card-bottom">
                <span className="pago">{oferta.nombre_servicio || "Sin servicio"}</span>
                <div className="card-actions">
                  <button className="btn-detalle">Ver detalle</button>
                  <button className="btn-aplicar" onClick={() => handlePostular(oferta.id_oferta)}>
                    Postularme
                  </button>
                </div>
              </div>
            </article>
          ))
        )}
      </section>
    </main>
  );
}