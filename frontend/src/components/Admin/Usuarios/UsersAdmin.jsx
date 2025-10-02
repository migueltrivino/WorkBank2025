import { useState } from "react";
import NavbarAdmin from "../NavbarAdmin";
import SidebarAdmin from "../SidebarAdmin";
import styles from "../../../css/Admin/UsersAdmin.module.css";
import TableUsers from "./TableUsers"; // 👈 aquí está la tabla de usuarios

export default function UsersAdmin() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <div className={styles["admin-container"]}>
      {/* Navbar */}
      <NavbarAdmin
        notifOpen={notifOpen}
        setNotifOpen={setNotifOpen}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />

      <div className={styles["admin-layout"]}>
        {/* Sidebar (ocultamos botón de usuarios para no duplicar en la vista actual) */}
        <SidebarAdmin hideUsers={true} />

        {/* Contenido principal de la vista */}
        <main className={styles["admin-content"]}>
          <h1 className={styles["page-title"]}>Gestión de Usuarios</h1>
          <TableUsers />
        </main>
      </div>
    </div>
  );
}
