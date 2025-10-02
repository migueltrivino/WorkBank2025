import { useState } from "react";
import Navbar from "../components/NavbarEmplo";
import Sidebar from "../components/SidebarEmplo";
import MainOffers from "../components/MainOffers";
import styles from "../css/Employer.module.css";

function EmployerOffers() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  //  Usuario simulado
  const user = { id_usuario: 1, nombre: "Usuario Demo" };

  return (
    <div className="employer-container">
      <Navbar
        notifOpen={notifOpen}
        setNotifOpen={setNotifOpen}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />
      <div className={styles.layout}>
        <Sidebar />
        <div className={`${styles.main} main-scroll`}>
          {user ? (
            <MainOffers idUsuario={user.id_usuario} />
          ) : (
            <p>Cargando usuario...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default EmployerOffers;

