import { useState } from "react";
import Navbar from "../components/NavbarEmplo";
import Sidebar from "../components/SidebarEmplo";
import MainOffers from "../components/MainOffers"; 

function EmployerOffers() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);


  const idUsuario = 1; // por ahora fijar en 1

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
        <MainOffers idUsuario={idUsuario} /> 
      </div>
    </div>
  );
}

export default EmployerOffers;
