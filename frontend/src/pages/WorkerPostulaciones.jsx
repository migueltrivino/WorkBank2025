import { useState, useContext } from "react";
import Navbar from "../components/NavbarEmplo";
import Sidebar from "../components/SidebarEmplo";
import MainWor_Postulaciones from "../components/MainWor_Postulaciones";
import { AuthContext } from "../context/AuthContext";

function WorkerPostulaciones() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const { user } = useContext(AuthContext);

  return (
    <div className="employer-container">
      <Navbar
        notifOpen={notifOpen}
        setNotifOpen={setNotifOpen}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />
      <div className="layout">
        <Sidebar />
        <div className="main-scroll">
          {user ? (
            <MainWor_Postulaciones idUsuario={user.id} />
          ) : (
            <p>Cargando usuario...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default WorkerPostulaciones;

