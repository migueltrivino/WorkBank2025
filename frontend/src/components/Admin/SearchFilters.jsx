// src/components/Admin/SearchFilters.jsx
import React, { useState } from "react";
import styles from "../../css/Admin/SearchFilters.module.css";

export default function SearchFilters({ onSearch, onFilter }) {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    active: false,
    blocked: false,
    admin: false,
    user: false,
  });

  const handleSearch = () => {
    onSearch(query);
  };

  const handleFilterChange = (filter) => {
    const updated = { ...filters, [filter]: !filters[filter] };
    setFilters(updated);
    onFilter(updated);
  };

  return (
    <div className={styles.searchFilters}>
      {/* 🔍 Buscador */}
      <div className={styles.searchBox}>
        <div className={styles.iconWrapper}>
          <svg viewBox="0 0 20 20" aria-hidden="true" className={styles.searchIcon}>
            <path d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z"></path>
          </svg>
        </div>
        <input
          type="text"
          placeholder="Buscar usuario..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={styles.input}
        />
        <button onClick={handleSearch} className={styles.searchBtn}>
          Buscar
        </button>
      </div>

      {/* 🟢 Filtros */}
      <div className={styles.checkboxContainer}>
        <label className={`${styles.iosCheckbox} ${styles.blue}`}>
          <input
            type="checkbox"
            checked={filters.active}
            onChange={() => handleFilterChange("active")}
          />
          <div className={styles.checkboxWrapper}>
            <div className={styles.checkboxBg}></div>
            <svg viewBox="0 0 24 24" className={styles.checkboxIcon}>
              <path d="M4 12L10 18L20 6" className={styles.checkPath}></path>
            </svg>
          </div>
          <span className={styles.label}>Activos</span>
        </label>

        <label className={`${styles.iosCheckbox} ${styles.red}`}>
          <input
            type="checkbox"
            checked={filters.blocked}
            onChange={() => handleFilterChange("blocked")}
          />
          <div className={styles.checkboxWrapper}>
            <div className={styles.checkboxBg}></div>
            <svg viewBox="0 0 24 24" className={styles.checkboxIcon}>
              <path d="M4 12L10 18L20 6" className={styles.checkPath}></path>
            </svg>
          </div>
          <span className={styles.label}>Bloqueados</span>
        </label>

        <label className={`${styles.iosCheckbox} ${styles.green}`}>
          <input
            type="checkbox"
            checked={filters.admin}
            onChange={() => handleFilterChange("admin")}
          />
          <div className={styles.checkboxWrapper}>
            <div className={styles.checkboxBg}></div>
            <svg viewBox="0 0 24 24" className={styles.checkboxIcon}>
              <path d="M4 12L10 18L20 6" className={styles.checkPath}></path>
            </svg>
          </div>
          <span className={styles.label}>Admins</span>
        </label>

        <label className={`${styles.iosCheckbox} ${styles.purple}`}>
          <input
            type="checkbox"
            checked={filters.user}
            onChange={() => handleFilterChange("user")}
          />
          <div className={styles.checkboxWrapper}>
            <div className={styles.checkboxBg}></div>
            <svg viewBox="0 0 24 24" className={styles.checkboxIcon}>
              <path d="M4 12L10 18L20 6" className={styles.checkPath}></path>
            </svg>
          </div>
          <span className={styles.label}>Usuarios</span>
        </label>
      </div>
    </div>
  );
}
