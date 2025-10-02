import { useState } from "react";
import Navbar from "../components/NavbarEmplo";
import SidebarWorker from "../components/SidebarWorker";
import MainWor_Ofertas from "../components/MainWor_Ofertas";
import styles from "../css/Employer.module.css"; // 🔹 Importar como "styles"

export default function WorkerInicio() {  
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <div className={styles["employer-container"]}>
      <Navbar
        notifOpen={notifOpen}
        setNotifOpen={setNotifOpen}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />
      <div className={styles.layout}>
        <SidebarWorker />
        <MainWor_Ofertas/> 
      </div>
    </div>
  );
}