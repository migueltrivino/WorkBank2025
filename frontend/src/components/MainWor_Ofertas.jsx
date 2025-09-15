import React, { useState, useEffect, useMemo } from "react";
import "../css/MainWor_Ofertas.css";

const OFERTAS_INICIALES = [
  {
    id: 1,
    titulo: "Aseo en Oficina",
    descripcion: "Se busca persona para limpieza de oficinas 3 veces por semana.",
    pago: "$120.000 / semana",
    categoria: "Limpieza",
    fecha: "2025-06-10",
  },
  {
    id: 2,
    titulo: "Cuidado de Niños",
    descripcion:
      "Familia necesita niñera los fines de semana en las tardes. Experiencia requerida.",
    pago: "$200.000 / fin de semana",
    categoria: "Cuidado",
    fecha: "2025-06-12",
  },
  {
    id: 3,
    titulo: "Paseador de Mascotas",
    descripcion:
      "Se requiere pasear 2 perros en las mañanas (1 hora). Conocer correas y control básico.",
    pago: "$15.000 por paseo",
    categoria: "Mascotas",
    fecha: "2025-06-08",
  },
  {
    id: 4,
    titulo: "Lavado de loza",
    descripcion: "Lavado de loza en domicilio, medio tiempo. Lugar: Barrio Centro.",
    pago: "$80.000 / semana",
    categoria: "Limpieza",
    fecha: "2025-06-22",
  },
  {
    id: 5,
    titulo: "Jardinería básica",
    descripcion: "Podar plantas y regar jardín en urbanización. Herramientas propias valoradas.",
    pago: "$50.000 / visita",
    categoria: "Exteriores",
    fecha: "2025-06-15",
  },
];

export default function MainWor_Ofertas() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [categoria, setCategoria] = useState("Todas");
  const [onlyRecent, setOnlyRecent] = useState(false); // ejemplo extra (filtrar por fecha)

  // Debounce para búsqueda (300ms)
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search.trim()), 300);
    return () => clearTimeout(t);
  }, [search]);

  // categorías dinámicas a partir de los datos
  const categorias = useMemo(() => {
    const cats = new Set(OFERTAS_INICIALES.map((o) => o.categoria));
    return ["Todas", ...Array.from(cats)];
  }, []);

  // filtrado principal
  const ofertasFiltradas = useMemo(() => {
    const term = debouncedSearch.toLowerCase();
    return OFERTAS_INICIALES.filter((o) => {
      // filtro por categoría
      if (categoria !== "Todas" && o.categoria !== categoria) return false;

      // filtro por recencia (ejemplo: fecha mayor a 2025-06-10)
      if (onlyRecent) {
        // aquí puedes ajustar lógica de "reciente" según tus necesidades
        const limite = new Date();
        limite.setDate(limite.getDate() - 30); // últimos 30 días
        if (new Date(o.fecha) < limite) return false;
      }

      // filtro por texto en título, descripción o pago
      if (!term) return true;
      return (
        o.titulo.toLowerCase().includes(term) ||
        o.descripcion.toLowerCase().includes(term) ||
        o.pago.toLowerCase().includes(term) ||
        o.categoria.toLowerCase().includes(term)
      );
    }).sort((a, b) => new Date(b.fecha) - new Date(a.fecha)); // opcional: ordenar por fecha descendente
  }, [debouncedSearch, categoria, onlyRecent]);

  const clearFilters = () => {
    setSearch("");
    setCategoria("Todas");
    setOnlyRecent(false);
  };

  return (
    <main className="ofertas-container">
      <header className="ofertas-header">
        <div>
          <h1 className="titulo">Ofertas Disponibles</h1>
          <p className="subtitulo">
            Busca por título, descripción, pago o categoría. Usa los filtros para
            refinar resultados.
          </p>
        </div>

        <div className="search-actions">
          <div className="search-bar">
            <input
              aria-label="buscar ofertas"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar ofertas por título, descripción o pago..."
            />
            <button
              className="clear-search"
              title="Limpiar búsqueda"
              onClick={() => setSearch("")}
            >
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
        <span>
          {ofertasFiltradas.length} {ofertasFiltradas.length === 1 ? "resultado" : "resultados"}
        </span>
        {debouncedSearch && (
          <span className="search-term">Buscando: "{debouncedSearch}"</span>
        )}
      </div>

      <section className="ofertas-grid">
        {ofertasFiltradas.length === 0 ? (
          <div className="no-results">No se encontraron ofertas con esos filtros.</div>
        ) : (
          ofertasFiltradas.map((oferta) => (
            <article key={oferta.id} className="oferta-card">
              <div className="card-top">
                <h2 className="oferta-title">{oferta.titulo}</h2>
                <span className="badge">{oferta.categoria}</span>
              </div>

              <p className="oferta-desc">{oferta.descripcion}</p>

              <div className="card-bottom">
                <span className="pago">{oferta.pago}</span>
                <div className="card-actions">
                  <button className="btn-detalle">Ver detalle</button>
                  <button className="btn-aplicar">Postularme</button>
                </div>
              </div>
            </article>
          ))
        )}
      </section>
    </main>
  );
}

