// src/components/Admin/SearchFilters.jsx
import React, { useState } from "react";
import styles from "../../css/Admin/SearchFilters.module.css";

export default function SearchFilters({ onSearch, onFilter }) {
  const [query, setQuery] = useState("");
  const [role, setRole] = useState("all"); // "all" | "admin" | "trabajador"
  const [estado, setEstado] = useState("all"); // "all" | "activo" | "inactivo"
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [ratingMin, setRatingMin] = useState(0); // 0..5
  const [ratingMax, setRatingMax] = useState(5);

  // Empaqueta y envía filters al padre
  const emitFilters = (q = query, r = role, e = estado, df = dateFrom, dt = dateTo, rmin = ratingMin, rmax = ratingMax) => {
    // Mapear roles/estados a los arrays que espera UsersAdmin ({ estados:[], roles:[] })
    const estados = [];
    if (e === "activo") estados.push("activo");
    if (e === "inactivo") estados.push("inactivo");

    const roles = [];
    if (r === "admin") roles.push("admin");
    if (r === "trabajador") roles.push("trabajador");

    // Enviar query por separado y filtros compuestos
    onSearch(q);
    onFilter({
      estados,
      roles,
      dateFrom: df || null,
      dateTo: dt || null,
      ratingMin: Number(rmin),
      ratingMax: Number(rmax),
    });
  };

  // Cambios en tiempo real
  const handleQueryChange = (v) => {
    setQuery(v);
    emitFilters(v);
  };

  const handleRoleChange = (v) => {
    setRole(v);
    emitFilters(undefined, v);
  };

  const handleEstadoChange = (v) => {
    setEstado(v);
    emitFilters(undefined, undefined, v);
  };

  const handleDateFromChange = (v) => {
    setDateFrom(v);
    emitFilters(undefined, undefined, undefined, v, dateTo);
  };

  const handleDateToChange = (v) => {
    setDateTo(v);
    emitFilters(undefined, undefined, undefined, dateFrom, v);
  };

  const handleRatingMinChange = (v) => {
    const val = Number(v);
    setRatingMin(val);
    // asegurar min <= max
    if (val > ratingMax) setRatingMax(val);
    emitFilters(undefined, undefined, undefined, undefined, undefined, val, ratingMax);
  };

  const handleRatingMaxChange = (v) => {
    const val = Number(v);
    setRatingMax(val);
    if (val < ratingMin) setRatingMin(val);
    emitFilters(undefined, undefined, undefined, undefined, undefined, ratingMin, val);
  };

  // Botón buscar (compatibilidad)
  const handleSearchBtn = () => {
    emitFilters();
  };

  const clearAll = () => {
    setQuery("");
    setRole("all");
    setEstado("all");
    setDateFrom("");
    setDateTo("");
    setRatingMin(0);
    setRatingMax(5);
    emitFilters("", "all", "all", "", "", 0, 5);
  };

  return (
    <div className={styles.searchFilters}>
      {/* Buscador */}
      <div className={styles.searchBox}>
        <div className={styles.iconWrapper}>
          <svg viewBox="0 0 20 20" aria-hidden="true" className={styles.searchIcon}>
            <path d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z"></path>
          </svg>
        </div>

        <input
          type="text"
          placeholder="Buscar por nombre o correo..."
          value={query}
          onChange={(e) => handleQueryChange(e.target.value)}
          className={styles.input}
        />
        <button onClick={handleSearchBtn} className={styles.searchBtn}>
          Buscar
        </button>
        <button onClick={clearAll} className={styles.clearBtn} style={{ marginLeft: 8 }}>
          Limpiar
        </button>
      </div>

      {/* Filtros avanzados */}
      <div className={styles.advancedFilters}>
        <div className={styles.filterRow}>
          <label className={styles.filterLabel}>Rol</label>
          <select value={role} onChange={(e) => handleRoleChange(e.target.value)} className={styles.select}>
            <option value="all">Todos</option>
            <option value="admin">Admin</option>
            <option value="trabajador">Usuario / Trabajador</option>
          </select>

          <label className={styles.filterLabel} style={{ marginLeft: 12 }}>Estado</label>
          <select value={estado} onChange={(e) => handleEstadoChange(e.target.value)} className={styles.select}>
            <option value="all">Todos</option>
            <option value="activo">Activo</option>
            <option value="inactivo">Suspendido</option>
          </select>
        </div>

        <div className={styles.filterRow}>
          <label className={styles.filterLabel}>Registro desde</label>
          <input type="date" value={dateFrom} onChange={(e) => handleDateFromChange(e.target.value)} className={styles.date} />

          <label className={styles.filterLabel} style={{ marginLeft: 12 }}>hasta</label>
          <input type="date" value={dateTo} onChange={(e) => handleDateToChange(e.target.value)} className={styles.date} />
        </div>

        <div className={styles.filterRow}>
          <label className={styles.filterLabel}>Calificación</label>
          <select value={ratingMin} onChange={(e) => handleRatingMinChange(e.target.value)} className={styles.select}>
            {[0,1,2,3,4,5].map(n => <option key={n} value={n}>{n}+</option>)}
          </select>
          <span style={{ margin: "0 8px" }}>—</span>
          <select value={ratingMax} onChange={(e) => handleRatingMaxChange(e.target.value)} className={styles.select}>
            {[0,1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
      </div>
    </div>
  );
}
