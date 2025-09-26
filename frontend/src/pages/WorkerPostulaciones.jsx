import { useState } from "react";
import Navbar from "../components/NavbarEmplo";
import Sidebar from "../components/SidebarWorker";
import MainWor_Postulaciones from "../components/MainWor_Postulaciones";
import styles from "../css/Employer.module.css";
import { getUser } from "../utils/auth"; // <-- importa tu función

function WorkerPostulaciones() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const user = getUser(); // <--- obtiene usuario del localStorage usando tu función

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
        <div className="postulaciones-container">
          {user ? (
            <MainWor_Postulaciones idUsuario={user.id_usuario} />
          ) : (
            <p>Cargando usuario...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default WorkerPostulaciones;