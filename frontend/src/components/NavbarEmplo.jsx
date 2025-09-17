import { useState, useRef, useEffect } from "react";
import { Bell, LogOut, User, Settings, Eye } from "lucide-react";
import logo from "../assets/logos.png";
import "../css/NavbarEmplo.css";

export default function Navbar({ notifOpen, setNotifOpen, menuOpen, setMenuOpen }) {
  const notifRef = useRef(null);
  const profileRef = useRef(null);

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

  return (
    <nav className="employer-navbar">
      <div className="logo">
        <img src={logo} alt="WorkBank Logo" className="logo-img" />
        <h1>WorkBank.W</h1>
      </div>

      <div className="nav-right">
        {/* Notificaciones */}
        <div className="notif-menu" ref={notifRef}>
          <Bell
            size={22}
            className="notif-icon"
            onClick={() => setNotifOpen(!notifOpen)}
          />
          {notifOpen && (
            <div className="notif-dropdown">
              <p><strong>Notificaciones</strong></p>
              <ul>
                <li>
                  📢 Nueva postulación en tu oferta
                  <button><Eye size={16} /></button>
                </li>
                <li>
                  ✅ Tu oferta fue publicada
                  <button><Eye size={16} /></button>
                </li>
                <li>
                  👤 Un candidato actualizó su perfil
                  <button><Eye size={16} /></button>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Perfil */}
        <div className="profile-menu" ref={profileRef}>
          <img
            src="https://i.pravatar.cc/40"
            alt="perfil"
            className="profile-img"
            onClick={() => setMenuOpen(!menuOpen)}
          />
          {menuOpen && (
            <div className="dropdown">
              <button><User size={16} /> Mi perfil</button>
              <button><Settings size={16} /> Configuración</button>
              <button><LogOut size={16} /> Cerrar sesión</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
