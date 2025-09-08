import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Home,
  FileText,
  Star,
  History,
  Bell,
  LogOut,
  User,
  Settings,
  Eye
} from "lucide-react";
import "../css/Employer.css";
import logo from "../assets/logos.png";
import CreateOffer from "../components/CreateOffer"; // ✅ IMPORTA BIEN

// /assets para el carrusel
import img1 from "../assets/carrusel1.jpg";
import img2 from "../assets/carrusel2.jpg";
import img3 from "../assets/carrusel3.jpg";

// Imagen para la help
import helpImg from "../assets/ofertab.jpg";

export default function Employer() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  //  formulario
  const [showForm, setShowForm] = useState(false);

  // frases motivadoras
  const frases = [
    "Hoy es un gran día para encontrar talento.",
    "El éxito empieza con una gran contratación.",
    "Conecta con quienes harán crecer tu empresa.",
    "Cada oferta publicada es una nueva oportunidad.",
    "El talento correcto transforma cualquier negocio."
  ];

  const usuario = "Alejo";
  const fraseMotivadora = frases[Math.floor(Math.random() * frases.length)];

  // carrusel
  const slides = [
    { id: 1, text: "Encuentra al mejor talento en minutos.", img: img1 },
    { id: 2, text: "Publica ofertas de empleo fácilmente.", img: img2 },
    { id: 3, text: "Gestiona postulaciones en un solo lugar.", img: img3 }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);

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
              <FileText size={18} /> <span className="item-label">Ofertas</span>
            </li>
            <li>
              <Star size={18} /> <span className="item-label">Favoritos</span>
            </li>
            <li>
              <History size={18} /> <span className="item-label">Historial</span>
            </li>
            <li>
              <Bell size={18} /> <span className="item-label">Notificaciones</span>
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
              ¡Bienvenido! a WorkBank.W,{" "}
              <span className="user-name">{usuario}</span>
            </motion.h2>
            <p>{fraseMotivadora}</p>
          </div>

          {/* Carrusel */}
          <div className="carousel">
            {slides.map((slide, index) => (
              <motion.div
                key={slide.id}
                className={`carousel-slide ${
                  index === currentSlide ? "active" : ""
                }`}
                style={{ backgroundImage: `url(${slide.img})` }}
                initial={false}
                animate={{
                  scale: index === currentSlide ? 1 : 0.9,
                  opacity: index === currentSlide ? 1 : 0.6
                }}
                transition={{ duration: 0.6 }}
              >
                <div className="carousel-text">
                  <p>{slide.text}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Indicadores */}
          <div className="carousel-indicators">
            {slides.map((_, index) => (
              <span
                key={index}
                className={index === currentSlide ? "active" : ""}
                onClick={() => setCurrentSlide(index)}
              ></span>
            ))}
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
