import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Bookmark, Star, CheckCircle, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { getUser, getToken } from "../utils/auth";
import helpImg from "../assets/Workerimg.png";
import styles from "../css/EmployerInicio.module.css";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

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
  const [usuario, setUsuario] = useState({ nombre: "", apellido: "" });
  const [flippedCard, setFlippedCard] = useState(null);

  // Chequeo de token
  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate("/iniciarsesion");
    } else {
      const storedData = getUser();
      if (storedData) setUsuario(storedData);
    }
  }, [navigate]);

  // Rotación de frases
  useEffect(() => {
    const interval = setInterval(() => {
      setFraseIndex((prev) => (prev + 1) % frases.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [frases.length]);

  // Datos para gráficas
  const chartData = [
    { name: "Ene", value: 5 },
    { name: "Feb", value: 12 },
    { name: "Mar", value: 7 },
    { name: "Abr", value: 15 },
    { name: "May", value: 10 },
    { name: "Jun", value: 18 },
  ];

  const stats = [
    {
      id: 1,
      title: "Postulaciones",
      number: 5,
      sub: "En proceso actualmente",
      icon: <Briefcase size={28} color="#2563eb" />,
    },
    {
      id: 2,
      title: "Ofertas guardadas",
      number: 8,
      sub: "Para revisar más tarde",
      icon: <Bookmark size={28} color="#f59e0b" />,
    },
    {
      id: 3,
      title: "Reseñas recibidas",
      number: 4.7,
      sub: "Promedio de empleadores",
      icon: <Star size={28} color="#eab308" />,
    },
    {
      id: 4,
      title: "Contratos",
      number: 12,
      sub: "Completados este mes",
      icon: <CheckCircle size={28} color="#10b981" />,
    },
  ];

  return (
    <main className={styles["main-container"]}>
      {/* Bienvenida */}
      <div className={styles["welcome-title"]}>
        <motion.h2
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className={styles["typewriter"]}>
            ¡Bienvenido Trabajador,{" "}
            <span className={styles["user-name"]}>
              {usuario.nombre} {usuario.apellido}
            </span>
            !
          </span>
        </motion.h2>

        {/* Frases motivacionales */}
        <div className={styles["frases-container"]}>
          <AnimatePresence mode="wait">
            <motion.p
              key={fraseIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 1 }}
              className={styles.frase}
            >
              {frases[fraseIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      {/* === TARJETAS DE ESTADÍSTICAS CON VOLTEO === */}
      <div className={styles["stats-container"]}>
        {stats.map((stat) => (
          <div
            key={stat.id}
            className={`${styles["stat-card"]} ${
              flippedCard === stat.id ? styles.flipped : ""
            }`}
          >
            {/* Frente */}
            <div className={styles["card-front"]}>
              <div className={styles["card-header"]}>
                {stat.icon}
                <h3>{stat.title}</h3>
              </div>
              <p className={styles["stat-number"]}>{stat.number}</p>
              <span className={styles["stat-sub"]}>{stat.sub}</span>
              <button
                className={styles["ver-mas-btn"]}
                onClick={() => setFlippedCard(stat.id)}
              >
                Ver más
              </button>
            </div>

            {/* Reverso */}
            <div className={styles["card-back"]}>
              <button
                className={styles["close-btn"]}
                onClick={() => setFlippedCard(null)}
              >
                <X size={22} />
              </button>
              <div className={styles["card-header"]}>
                {stat.icon}
                <h3>{stat.title}</h3>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#2563eb"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        ))}
      </div>

      {/* Card de ayuda */}
      <div className={styles["help-card"]}>
        <img src={helpImg} alt="ayuda" className={styles["help-img"]} />
        <div className={styles["help-text"]}>
          <h2>¿Buscas nuevas oportunidades?</h2>
          <p>Explora las ofertas disponibles y postúlate a la que más te guste.</p>
          <button
            className={styles["offer-btn"]}
            onClick={() => navigate("/worker/ofertas")}
          >
            Buscar ofertas...
          </button>
        </div>
      </div>
    </main>
  );
}
