import { useRef, useEffect, useState } from "react";
import { removeToken } from "../utils/auth"; 
import { useNavigate, useLocation } from "react-router-dom";
import { Bell, LogOut, User, Settings } from "lucide-react";
import logo from "../assets/logos.png";
import "../css/NavbarEmplo.css";

export default function Navbar({ notifOpen, setNotifOpen, menuOpen, setMenuOpen }) {
  const notifRef = useRef(null);
  const profileRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const [activeButton, setActiveButton] = useState("empleador"); // solo para indicador visual

  const handleLogout = () => {
    removeToken();
    navigate("/iniciarsesion");
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setNotifOpen, setMenuOpen]);

  // actualizar indicador según la ruta actual
  useEffect(() => {
    if (location.pathname.startsWith("/employer")) setActiveButton("empleador");
    else setActiveButton("trabajador");
  }, [location.pathname]);

  const handleNavigate = (page) => {
    setActiveButton(page); // actualiza indicador
    if (page === "trabajador") navigate("/worker");
    if (page === "empleador") navigate("/employer");
  };

  return (
    <nav className="employer-navbar">
      {/* Logo */}
      <div className="logo">
        <img src={logo} alt="WorkBank Logo" className="logo-img" />
        <h1>WorkBank.W</h1>
      </div>

      {/* Sección derecha */}
      <div className="nav-right">
        {/* ===== SWITCH VISUAL PARA CAMBIAR DE PÁGINA ===== */}
        <div className={`role-switch ${activeButton}`}>
          <div className="segment-indicator" aria-hidden="true" />
          <button
            type="button"
            className="segment-btn trabajador"
            onClick={() => handleNavigate("trabajador")}
          >
            Trabajador
          </button>
          <button
            type="button"
            className="segment-btn empleador"
            onClick={() => handleNavigate("empleador")}
          >
            Empleador
          </button>
        </div>

        {/* 🔔 Notificaciones */}
        <div className="notif-menu" ref={notifRef}>
          <Bell
            size={33}
            className="notif-icon"
            onClick={() => setNotifOpen(!notifOpen)}
          />
          {notifOpen && (
            <div className="notif-dropdown">
              <div className="notif-card">
                <img src="https://i.pravatar.cc/40?img=1" alt="user" />
                <div className="notif-info">
                  <h4>Nueva postulación en tu oferta</h4>
                  <p>Un candidato aplicó a tu publicación reciente.</p>
                  <span className="notif-link">Ver más</span>
                </div>
              </div>

              <div className="notif-card">
                <img src="https://i.pravatar.cc/40?img=2" alt="user" />
                <div className="notif-info">
                  <h4>Tu oferta fue publicada</h4>
                  <p>La oferta de Desarrollador Web ya está en línea.</p>
                  <span className="notif-link">Ver más</span>
                </div>
              </div>

              <div className="notif-card">
                <img src="https://i.pravatar.cc/40?img=3" alt="user" />
                <div className="notif-info">
                  <h4>Candidato actualizó su perfil</h4>
                  <p>Juan Pérez ha mejorado su experiencia laboral.</p>
                  <span className="notif-link">Ver más</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 👤 Perfil */}
        <div className="profile-menu" ref={profileRef}>
          <img
            src="https://i.pravatar.cc/40"
            alt="perfil"
            className="profile-img"
            onClick={() => setMenuOpen(!menuOpen)}
          />
          {menuOpen && (
            <div className="dropdown">
              {/* 🚀 Aquí le agregamos navigate */}
              <button onClick={() => navigate("/worker/profile")}>
                <User size={18} /> Mi perfil
              </button>
              <button><Settings size={18} /> Configuración</button>
              <button onClick={handleLogout}><LogOut size={18} /> Cerrar sesión</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
