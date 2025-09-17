import { useState, useContext } from "react";
import Navbar from "../components/NavbarEmplo";
import Sidebar from "../components/SidebarEmplo";
import MainOffers from "../components/MainOffers";
import { AuthContext } from "../context/AuthContext"; // ruta ajustable

function EmployerOffers() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  // Obtener usuario del contexto
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
          {user ? <MainOffers idUsuario={user.id} /> : <p>Cargando usuario...</p>}
        </div>
      </div>
    </div>
  );
}

export default EmployerOffers;

