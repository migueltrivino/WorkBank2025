// src/components/Admin/UsersAdmin.jsx
import { useState, useEffect } from "react";
import NavbarAdmin from "../NavbarAdmin";
import SidebarAdmin from "../SidebarAdmin";
import styles from "../../../css/Admin/UsersAdmin.module.css";
import TableUsers from "./TableUsers";

export default function UsersAdmin() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("user"); // Ajusta la clave si es otra
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

  return (
    <div className={styles["admin-container"]}>
      <NavbarAdmin
        notifOpen={notifOpen}
        setNotifOpen={setNotifOpen}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />
      <div className={styles["admin-layout"]}>
        <SidebarAdmin hideUsers={true} />
        <main className={styles["admin-content"]}>
          <h1 className={styles["page-title"]}>Gestión de Usuarios</h1>
          <TableUsers currentAdmin={currentAdmin} />
        </main>
      </div>
    </div>
  );
}
