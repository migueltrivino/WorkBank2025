import { useState } from "react";
import Navbar from "../components/NavbarEmplo";
import Sidebar from "../components/SidebarEmplo";
import MainHistorial from "../components/MainHistorial";
import { getUser } from "../utils/auth";
import styles from "../css/Employer.module.css";

function EmployerHistorial() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);


  const user = getUser();

  return (
    <div className={styles.employerContainer}>
      {/* Navbar con control de menú y notificaciones */}
      <Navbar
        notifOpen={notifOpen}
        setNotifOpen={setNotifOpen}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />

      <div className={styles.layout}>
        {/* Barra lateral */}
        <Sidebar />

        {/* Contenedor principal con scroll */}
        <div className={styles.mainScroll}>
          {user ? (
            <MainHistorial idUsuario={user.id_usuario} />
          ) : (
            <p className={styles.noUser}>⚠️ No hay usuario logueado</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default EmployerHistorial;
