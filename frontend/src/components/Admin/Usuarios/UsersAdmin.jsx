// src/components/Admin/UsersAdmin.jsx
import { useState, useEffect } from "react";
import NavbarAdmin from "../NavbarAdmin";
import SidebarAdmin from "../SidebarAdmin";
import TableUsers from "./TableUsers";
import SearchFilters from "../SearchFilters"; // buscador + filtros
import styles from "../../../css/Admin/UsersAdmin.module.css";

export default function UsersAdmin() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState(null);

  // 🔍 Estado para buscador y filtros
  const [searchQuery, setSearchQuery] = useState("");
  const [appliedFilters, setAppliedFilters] = useState({});
  const [allUsers, setAllUsers] = useState([]); // dataset original
  const [filteredUsers, setFilteredUsers] = useState([]); // dataset filtrado

  // Cargar admin
  useEffect(() => {
    try {
      const stored = localStorage.getItem("user"); // Ajusta si usas otra clave
      if (stored) {
        const parsed = JSON.parse(stored);
        setCurrentAdmin(parsed);
        console.log("👮‍♂️ [UsersAdmin] Admin actual:", parsed);
      } else {
        console.warn("⚠️ [UsersAdmin] No se encontró admin en localStorage");
      }
    } catch (err) {
      console.error("❌ [UsersAdmin] Error leyendo localStorage:", err);
    }
  }, []);

  // Cargar usuarios (mock / fetch según tu backend)
  useEffect(() => {
    // ⚠️ Aquí deberías hacer fetch a tu API real
    const mockUsers = [
      { id: 1, nombre: "Juan", correo: "juan@test.com", rol: "trabajador", estado: "activo" },
      { id: 2, nombre: "Ana", correo: "ana@test.com", rol: "admin", estado: "inactivo" },
      { id: 3, nombre: "Pedro", correo: "pedro@test.com", rol: "trabajador", estado: "activo" },
    ];
    setAllUsers(mockUsers);
    setFilteredUsers(mockUsers);
  }, []);

  // Aplicar búsqueda + filtros
  useEffect(() => {
    let result = allUsers;

    // 🔍 Filtro por texto (nombre/correo)
    if (searchQuery.trim() !== "") {
      result = result.filter(
        (u) =>
          u.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
          u.correo.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // ✅ Filtros extra (estado, rol)
    if (appliedFilters.estado) {
      result = result.filter((u) => u.estado === appliedFilters.estado);
    }
    if (appliedFilters.rol) {
      result = result.filter((u) => u.rol === appliedFilters.rol);
    }

    setFilteredUsers(result);
  }, [searchQuery, appliedFilters, allUsers]);

  return (
    <div className={styles["admin-container"]}>
      {/* Navbar fijo */}
      <NavbarAdmin
        notifOpen={notifOpen}
        setNotifOpen={setNotifOpen}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />

      {/* Layout: sidebar + contenido */}
      <div className={styles["admin-layout"]}>
        <SidebarAdmin hideUsers={true} className={styles["admin-sidebar"]} />

        <main className={styles["admin-content"]}>
          <h1 className={styles["page-title"]}>Gestión de Usuarios</h1>

          {/* 🔍 Buscador y filtros */}
          <SearchFilters
            onSearch={(query) => setSearchQuery(query)}
            onFilter={(filters) => setAppliedFilters(filters)}
          />

          {/* 📊 Tabla con resultados filtrados */}
          <TableUsers data={filteredUsers} currentAdmin={currentAdmin} />
        </main>
      </div>
    </div>
  );
}
