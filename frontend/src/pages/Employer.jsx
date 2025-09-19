import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../utils/auth"; 
import Navbar from "../components/NavbarEmplo";
import Sidebar from "../components/SidebarEmplo";
import Main from "../components/EmployerInicio";
import styles from "../css/Employer.module.css";

export default function Employer() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const navigate = useNavigate();

  // Verificar JWT al montar la página
  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate("/iniciarsesion"); 
    }
  }, [navigate]);

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
        <Main />
      </div>
    </div>
  );
}