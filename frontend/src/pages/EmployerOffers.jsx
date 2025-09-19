import { useState, useEffect } from "react";
import Navbar from "../components/NavbarEmplo";
import Sidebar from "../components/SidebarEmplo";
import MainOffers from "../components/MainOffers";
import styles from "../css/Employer.module.css";
import { getUser } from "../utils/auth";

function EmployerOffers() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUser = getUser();
    setUser(loggedUser);
  }, []);

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
        <div className="main-scroll">
          {user && user.id_usuario ? (
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
