import { useState, useContext } from "react";
import Navbar from "../components/NavbarEmplo";
import Sidebar from "../components/SidebarEmplo";
import MainPostulaciones from "../components/MainPostulaciones"; 
import { AuthContext } from "../context/AuthContext"; 

function EmployerPostulaciones() {
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
            <MainPostulaciones idUsuario={user.id} />   
          ) : (
            <p>Cargando usuario...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default EmployerPostulaciones;

