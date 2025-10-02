import { useState, useContext } from "react";
import Navbar from "../components/NavbarEmplo";
import Sidebar from "../components/SidebarEmplo";
import MainResenas from "../components/MainResenas"; 
import { AuthContext } from "../context/AuthContext"; 

function EmployerResenas() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);



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
          <MainResenas />
        </div>
      </div>
    </div>
  );
}

export default EmployerResenas;