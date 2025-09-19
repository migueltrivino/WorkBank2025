import { useState } from "react";
import Navbar from "../components/NavbarEmplo";
import Sidebar from "../components/SidebarWorker";
import MainWor_Historial from "../components/MainWor_Historial";
import styles from "../css/Employer.module.css";
import "../css/MainWor_Historial.css";
import { getUser } from "../utils/auth"; // Función para obtener usuario del localStorage

function WorkerHistorial() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const user = getUser(); // Obtenemos el usuario logueado del localStorage

  return (
    <div className={styles["employer-container"]}>
      <Navbar
        notifOpen={notifOpen}
        setNotifOpen={setNotifOpen}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />
      <div className={styles.layout}>
        <Sidebar />
        <div className="historial-container">
          {user ? (
            <MainWor_Historial idUsuario={user.id_usuario} />
          ) : (
            <p>No hay usuario logueado</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default WorkerHistorial;