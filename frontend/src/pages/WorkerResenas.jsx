import { useState } from "react";
import Navbar from "../components/NavbarEmplo";
import Sidebar from "../components/SidebarWorker";
import MainWor_Resenas from "../components/MainWor_Resenas";
import styles from "../css/Employer.module.css";
import "../css/MainWor_Resenas.module.css";
import { getUser } from "../utils/auth";

function WorkerResenas() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const user = getUser(); // Obtenemos usuario del localStorage
  const idUsuario = user?.id_usuario || null; // Protege si no hay usuario

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
        <div className="resenas-container">
          {idUsuario ? (
            <MainWor_Resenas idUsuario={idUsuario} />
          ) : (
            <p>No hay usuario logueado</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default WorkerResenas;