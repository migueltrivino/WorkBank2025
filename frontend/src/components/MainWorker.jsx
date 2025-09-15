import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Bookmark, Star, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import helpImg from "../assets/Workerimg.png";

export default function MainWorker() {
  const frases = [
    "Cada día es una oportunidad para crecer.",
    "El esfuerzo de hoy es el éxito de mañana.",
    "Conecta con empleadores que valoran tu talento.",
    "Postúlate y demuestra de lo que eres capaz.",
    "Tu trabajo transforma vidas, empieza por la tuya.",
    "Cada postulación es un paso más cerca de tu meta.",
  ];

  const [fraseIndex, setFraseIndex] = useState(0);
  const navigate = useNavigate(); 

  useEffect(() => {
    const interval = setInterval(() => {
      setFraseIndex((prev) => (prev + 1) % frases.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [frases.length]);

  const usuario = "Yennifer";

  return (
    <main className="main-container">
      {/* Bienvenida */}
      <div className="welcome-title">
        <motion.h2
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="typewriter">
            ¡Bienvenido a WorkBank.W,{" "}
            <span className="user-name">{usuario}</span>!
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

      {/* === ESTADÍSTICAS DEL TRABAJADOR === */}
      <div className="stats-container">
        <div className="stat-card">
          <Briefcase size={28} color="#2563eb" />
          <h3>Postulaciones</h3>
          <p className="stat-number">5</p>
          <span className="stat-sub">En proceso actualmente</span>
        </div>
        <div className="stat-card">
          <Bookmark size={28} color="#f59e0b" />
          <h3>Ofertas guardadas</h3>
          <p className="stat-number">8</p>
          <span className="stat-sub">Para revisar más tarde</span>
        </div>
        <div className="stat-card">
          <Star size={28} color="#eab308" />
          <h3>Reseñas recibidas</h3>
          <p className="stat-number">4.7</p>
          <span className="stat-sub">Promedio de empleadores</span>
        </div>
        <div className="stat-card">
          <CheckCircle size={28} color="#10b981" />
          <h3>Contratos</h3>
          <p className="stat-number">12</p>
          <span className="stat-sub">Completados este mes</span>
        </div>
      </div>

      {/* Card de ayuda */}
      <div className="help-card">
        <img src={helpImg} alt="ayuda" className="help-img" />
        <div className="help-text">
          <h2>¿Buscas nuevas oportunidades?</h2>
          <p>Explora las ofertas disponibles y postúlate a la que más te guste.</p>
          <button
            className="offer-btn"
            onClick={() => navigate("/worker/ofertas")}
          >
            Buscar ofertas...
          </button>
        </div>
      </div>
    </main>
  );
}

