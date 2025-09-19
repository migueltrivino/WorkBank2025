import { useState } from "react";
import Navbar from "../components/NavbarEmplo";
import Sidebar from "../components/SidebarEmplo";
import MainPostulaciones from "../components/MainPostulaciones"; 
import { getUser } from "../utils/auth"; // <-- usamos la función para leer localStorage
import styles from "../css/Employer.module.css";

function EmployerPostulaciones() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const user = getUser(); // <-- obtenemos el usuario del localStorage

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
          {user ? (
            <MainPostulaciones idUsuario={user.id_usuario} /> 
          ) : (
            <p>No hay usuario logueado</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default EmployerPostulaciones;