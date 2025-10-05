// src/components/Admin/UsersAdmin.jsx
import { useState, useEffect, useRef } from "react";
import NavbarAdmin from "../NavbarAdmin";
import SidebarAdmin from "../SidebarAdmin";
import TableUsers from "./TableUsers";
import SearchFilters from "../SearchFilters"; // buscador + filtros
import UsersStats from "../UsersStats"; // ✅ NUEVO componente de estadísticas
import styles from "../../../css/Admin/UsersAdmin.module.css";

export default function UsersAdmin() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState(null);

  // Estados
  const [searchQuery, setSearchQuery] = useState("");
  const [appliedFilters, setAppliedFilters] = useState({
    estados: [],
    roles: [],
    dateFrom: null,
    dateTo: null,
    ratingMin: 0,
    ratingMax: 5,
  });
  const [allUsers, setAllUsers] = useState([]); // dataset original desde API
  const [filteredUsers, setFilteredUsers] = useState([]); // dataset filtrado que se pasa a TableUsers
  const [loading, setLoading] = useState(true); // cargando usuarios inicial
  const [filtering, setFiltering] = useState(false); // para mostrar "buscando..."

  const debounceRef = useRef(null);

  // Cargar admin
  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        const parsed = JSON.parse(stored);
        setCurrentAdmin(parsed);
      }
    } catch (err) {
      console.error("Error leyendo localStorage:", err);
    }
  }, []);

  // Cargar usuarios desde API (solo una vez)
  useEffect(() => {
    let mounted = true;
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:4000/api/admin/users");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        if (!mounted) return;
        setAllUsers(data);
        setFilteredUsers(data);
      } catch (err) {
        console.error("Error al cargar usuarios:", err);
        setAllUsers([]);
        setFilteredUsers([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchUsers();
    return () => (mounted = false);
  }, []);

  // Aplicar búsqueda + filtros (debounce corto para UX en tiempo real)
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setFiltering(true);

    debounceRef.current = setTimeout(() => {
      let result = [...allUsers];
      const q = (searchQuery || "").trim().toLowerCase();

      // 1) Filtro por texto (nombre/correo)
      if (q !== "") {
        result = result.filter((u) => {
          const nombre = (u.nombre || "").toLowerCase();
          const apellido = (u.apellido || "").toLowerCase();
          const correo = (u.correo || "").toLowerCase();
          return nombre.includes(q) || apellido.includes(q) || correo.includes(q);
        });
      }

      // 2) Filtro por estados
      if (appliedFilters.estados?.length > 0) {
        result = result.filter((u) => appliedFilters.estados.includes(u.estado));
      }

      // 3) Filtro por roles
      if (appliedFilters.roles?.length > 0) {
        result = result.filter((u) => {
          const roleName = (u.rol_nombre || "").toLowerCase();
          return appliedFilters.roles.some((r) => roleName.includes(r));
        });
      }

      // 4) Filtro por rango de fechas
      if (appliedFilters.dateFrom) {
        const from = new Date(appliedFilters.dateFrom);
        result = result.filter((u) => {
          const fecha = u.fecha_creacion ? new Date(u.fecha_creacion) : null;
          return fecha && fecha >= from;
        });
      }
      if (appliedFilters.dateTo) {
        const to = new Date(appliedFilters.dateTo);
        to.setHours(23, 59, 59, 999);
        result = result.filter((u) => {
          const fecha = u.fecha_creacion ? new Date(u.fecha_creacion) : null;
          return fecha && fecha <= to;
        });
      }

      // 5) Filtro por calificación
      result = result.filter((u) => {
        const c = Number(u.calificacion ?? 0);
        return (
          c >= (appliedFilters.ratingMin ?? 0) &&
          c <= (appliedFilters.ratingMax ?? 5)
        );
      });

      setFilteredUsers(result);
      setFiltering(false);
    }, 200);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [searchQuery, appliedFilters, allUsers]);

  return (
    <div className={styles["admin-container"]}>
      <NavbarAdmin
        notifOpen={notifOpen}
        setNotifOpen={setNotifOpen}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />

      <div className={styles["admin-layout"]}>
        <SidebarAdmin hideUsers={true} className={styles["admin-sidebar"]} />

        <main className={styles["admin-content"]}>
          <h1 className={styles["page-title"]}></h1>

          {/* 📊 Sección de estadísticas (entre Navbar y filtros) */}
          <UsersStats />

          {/* 🔍 Buscador + filtros */}
          <SearchFilters
            onSearch={(q) => setSearchQuery(q)}
            onFilter={(filters) => {
              setAppliedFilters((prev) => ({
                ...prev,
                estados: filters.estados ?? [],
                roles: filters.roles ?? [],
                dateFrom: filters.dateFrom ?? null,
                dateTo: filters.dateTo ?? null,
                ratingMin:
                  typeof filters.ratingMin === "number"
                    ? filters.ratingMin
                    : prev.ratingMin ?? 0,
                ratingMax:
                  typeof filters.ratingMax === "number"
                    ? filters.ratingMax
                    : prev.ratingMax ?? 5,
              }));
            }}
          />

          {/* Mensajes de UX */}
          {loading ? (
            <div style={{ padding: 16 }}>Cargando usuarios...</div>
          ) : filtering ? (
            <div style={{ padding: 16 }}>Buscando...</div>
          ) : filteredUsers.length === 0 ? (
            <div style={{ padding: 16 }}>No hay resultados que coincidan.</div>
          ) : null}

          {/* Tabla de resultados filtrados */}
          <TableUsers
            data={filteredUsers}
            filters={{
              query: searchQuery,
              estados: appliedFilters.estados,
              roles: appliedFilters.roles,
            }}
            currentAdmin={currentAdmin}
          />
        </main>
      </div>
    </div>
  );
}
