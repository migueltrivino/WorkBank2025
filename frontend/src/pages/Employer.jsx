import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  FileText,
  Star,
  History,
  Bell,
  LogOut,
  User,
  Settings,
  Eye,
  Briefcase,
  Users,
  MessageSquare,
  CheckCircle
} from "lucide-react";
import "../css/Employer.css";
import logo from "../assets/logos.png";
import CreateOffer from "../components/CreateOffer";

// Imagen para la help
import helpImg from "../assets/ofertab.jpg";

export default function Employer() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  // formulario
  const [showForm, setShowForm] = useState(false);

  // frases motivadoras (rotan solas cada 10s)
  const frases = [
    "Hoy es un gran día para encontrar talento.",
    "El éxito empieza con una gran contratación.",
    "Conecta con quienes harán crecer tu empresa.",
    "Cada oferta publicada es una nueva oportunidad.",
    "El talento correcto transforma cualquier negocio."
  ];
  const [fraseIndex, setFraseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFraseIndex((prev) => (prev + 1) % frases.length);
    }, 10000); // 10s
    return () => clearInterval(interval);
  }, [frases.length]);

  const usuario = "Alejo";

  return (
    <div className="employer-container">
      {/* NAVBAR SUPERIOR */}
      <nav className="employer-navbar">
        <div className="logo">
          <img src={logo} alt="WorkBank Logo" className="logo-img" />
          <h1>WorkBank.W</h1>
        </div>
        <div className="nav-right">
          {/* Notificaciones */}
          <div className="notif-menu">
            <Bell
              size={22}
              className="notif-icon"
              onClick={() => setNotifOpen(!notifOpen)}
            />
            {notifOpen && (
              <div className="notif-dropdown">
                <p>
                  <strong>Notificaciones</strong>
                </p>
                <ul>
                  <li>
                    📢 Nueva postulación en tu oferta
                    <button>
                      <Eye size={16} />
                    </button>
                  </li>
                  <li>
                    ✅ Tu oferta fue publicada
                    <button>
                      <Eye size={16} />
                    </button>
                  </li>
                  <li>
                    👤 Un candidato actualizó su perfil
                    <button>
                      <Eye size={16} />
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Foto de perfil */}
          <div className="profile-menu">
            <img
              src="https://i.pravatar.cc/40"
              alt="perfil"
              className="profile-img"
              onClick={() => setMenuOpen(!menuOpen)}
            />
            {menuOpen && (
              <div className="dropdown">
                <button>
                  <User size={16} /> Mi perfil
                </button>
                <button>
                  <Settings size={16} /> Configuración
                </button>
                <button>
                  <LogOut size={16} /> Cerrar sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="layout">
        {/* SIDEBAR */}
        <aside className="sidebar">
          <ul>
            <li>
              <Home size={18} /> <span className="item-label">Inicio</span>
            </li>
            <li>
              <FileText size={18} /> <span className="item-label">Mis ofertas</span>
            </li>
            <li>
              <Star size={18} /> <span className="item-label">Postulaciones</span>
            </li>
            <li>
              <History size={18} /> <span className="item-label">Reseñas</span>
            </li>
            <li>
              <Bell size={18} /> <span className="item-label">Historial</span>
            </li>
          </ul>
        </aside>

        {/* MAIN */}
        <main className="main-container">
          {/* Bienvenida */}
          <div className="welcome-title">
            <motion.h2
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <span className="typewriter">
                ¡Bienvenido! a WorkBank.W,{" "}
                <span className="user-name">{usuario}</span>
              </span>
            </motion.h2>

            {/* Frases motivacionales dinámicas */}
            <div className="frases-container">
              <AnimatePresence mode="wait">
                <motion.p
                  key={fraseIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 1 }}
                  className="frase"
                >
                  {frases[fraseIndex]}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          {/* === ESTADÍSTICAS === */}
          <div className="stats-container">
            <div className="stat-card">
              <Briefcase size={28} color="#2563eb" />
              <h3>Ofertas activas</h3>
              <p className="stat-number">12</p>
              <span className="stat-sub">En curso actualmente</span>
            </div>
            <div className="stat-card">
              <Users size={28} color="#16a34a" />
              <h3>Postulaciones</h3>
              <p className="stat-number">87</p>
              <span className="stat-sub">Últimos 30 días</span>
            </div>
            <div className="stat-card">
              <MessageSquare size={28} color="#f59e0b" />
              <h3>Reseñas</h3>
              <p className="stat-number">4.8</p>
              <span className="stat-sub">Promedio de candidatos</span>
            </div>
            <div className="stat-card">
              <CheckCircle size={28} color="#10b981" />
              <h3>Contrataciones</h3>
              <p className="stat-number">34</p>
              <span className="stat-sub">Completadas este mes</span>
            </div>
          </div>

          {/* Card de ayuda */}
          <div className="help-card">
            <img src={helpImg} alt="ayuda" className="help-img" />
            <div className="help-text">
              <h2>¿Necesitas ayuda?</h2>
              <p>Publica tu primera oferta y empieza a conectar con talento.</p>
              <button className="offer-btn" onClick={() => setShowForm(true)}>
                + Crear nueva oferta
              </button>
            </div>
          </div>

          {/* el formulario */}
          {showForm && <CreateOffer onClose={() => setShowForm(false)} />}
        </main>
      </div>
    </div>
  );
}

