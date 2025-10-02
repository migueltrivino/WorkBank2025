import styles from "../css/EmployerInicio.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Users, MessageSquare, CheckCircle, X } from "lucide-react";
import helpImg from "../assets/ofertab.jpg";
import CreateOffer from "./CreateOffer";
import { useState, useEffect } from "react";
import { getUser } from "../utils/auth";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function Main() {
  const [showForm, setShowForm] = useState(false);
  const [usuario, setUsuario] = useState({ nombre: "", apellido: "" });
  const [flippedCard, setFlippedCard] = useState(null);

  const frases = [
    "Hoy es un gran día para encontrar talento.",
    "El éxito empieza con una gran contratación.",
    "Conecta con personas que están dispuestas a ayudarte.",
    "Cada oferta publicada es una nueva oportunidad.",
    "El talento correcto transforma.",
    "Las oportunidades nacen cuando alguien se atreve a ofrecerlas.",
    "Cada talento suma, cada esfuerzo cuenta.",
  ];
  const [fraseIndex, setFraseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFraseIndex((prev) => (prev + 1) % frases.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [frases.length]);

  useEffect(() => {
    const storedUser = getUser();
    if (storedUser) {
      setUsuario(storedUser);
    }
  }, []);

  const chartData = [
    { name: "Ene", value: 10 },
    { name: "Feb", value: 25 },
    { name: "Mar", value: 18 },
    { name: "Abr", value: 32 },
    { name: "May", value: 22 },
    { name: "Jun", value: 40 },
  ];

  const stats = [
    {
      id: 1,
      title: "Ofertas activas",
      number: 12,
      sub: "En curso actualmente",
      icon: <Briefcase size={28} color="#2563eb" />,
    },
    {
      id: 2,
      title: "Postulaciones",
      number: 87,
      sub: "Últimos 30 días",
      icon: <Users size={28} color="#16a34a" />,
    },
    {
      id: 3,
      title: "Reseñas",
      number: 4.8,
      sub: "Promedio de candidatos",
      icon: <MessageSquare size={28} color="#f59e0b" />,
    },
    {
      id: 4,
      title: "Contrataciones",
      number: 34,
      sub: "Completadas este mes",
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
          Bienvenido <span className={styles["trabajador-title"]}>Empleador</span>,{" "}
          <span className={styles["user-name"]}>
            {usuario.nombre} {usuario.apellido}
          </span>
        </motion.h2>

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

      {/* === TARJETAS DE ESTADÍSTICAS === */}
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
          <h2>¿Necesitas ayuda?</h2>
          <p>Publica tu primera oferta y empieza a conectar con talento.</p>
          <button
            className={styles["offer-btn"]}
            onClick={() => setShowForm(true)}
          >
            + Crear nueva oferta
          </button>
        </div>
      </div>

      {showForm && <CreateOffer onClose={() => setShowForm(false)} />}
    </main>
  );
}
