// src/components/Admin/MainAdmin.jsx
import { motion, AnimatePresence } from "framer-motion";
import { Users, FileText, Star, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { getUser, getToken } from "../../utils/auth";
import styles from "../../css/Admin/MainAdmin.module.css";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function MainAdmin() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({ nombre: "", apellido: "" });
  const [flippedCard, setFlippedCard] = useState(null);

  // Estado para stats y chart
  const [stats, setStats] = useState([
    {
      id: 1,
      title: "Usuarios Registrados",
      number: 0,
      sub: "Total de usuarios activos",
      icon: <Users size={28} color="#236AB9" />,
      chartColor: "#236AB9",
    },
    {
      id: 2,
      title: "Ofertas Publicadas",
      number: 0,
      sub: "Actualmente disponibles",
      icon: <FileText size={28} color="#0A2F5C" />,
      chartColor: "#0A2F5C",
    },
    {
      id: 3,
      title: "Postulaciones",
      number: 0,
      sub: "Recibidas este mes",
      icon: <Star size={28} color="#A7C5EB" />,
      chartColor: "#A7C5EB",
    },
    {
      id: 4,
      title: "Formulario (Contacto / Quejas / Sugerencias)",
      numbers: { contacto: 0, quejas: 0, sugerencias: 0 },
      icon: <FileText size={28} color="#FF8C42" />,
      chartColor: "#FF8C42",
    },
  ]);

  const [chartData, setChartData] = useState([
    { name: "Ene", value: 0 },
    { name: "Feb", value: 0 },
    { name: "Mar", value: 0 },
    { name: "Abr", value: 0 },
    { name: "May", value: 0 },
    { name: "Jun", value: 0 },
  ]);

  // Frases motivacionales para admin
  const frases = [
    "Admin, controla todo desde un solo lugar.",
    "Mantén el orden y supervisa tu plataforma.",
    "Cada acción cuenta para un mejor desempeño.",
    "Visualiza estadísticas y toma decisiones inteligentes.",
    "La administración eficiente empieza aquí.",
    "Los datos bien organizados son poder.",
  ];
  const [fraseIndex, setFraseIndex] = useState(0);

  // Verifica token y carga usuario
  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate("/iniciarsesion");
    } else {
      const storedData = getUser();
      if (storedData) setUsuario(storedData);
    }
  }, [navigate]);

  // Ciclo frases
  useEffect(() => {
    const interval = setInterval(() => {
      setFraseIndex((prev) => (prev + 1) % frases.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [frases.length]);

  // 🚀 Cargar datos del backend
  useEffect(() => {
    async function fetchAdminData() {
      try {
        const res = await fetch("http://localhost:4000/api/admin/dashboard"); 
        const data = await res.json();

        setStats((prev) =>
          prev.map((stat) => {
            if (stat.id === 1) return { ...stat, number: data.usuarios };
            if (stat.id === 2) return { ...stat, number: data.ofertas };
            if (stat.id === 3) return { ...stat, number: data.postulaciones };
            if (stat.id === 4) {
              return {
                ...stat,
                numbers: {
                  contacto: data.contacto,
                  quejas: data.quejas,
                  sugerencias: data.sugerencias,
                },
              };
            }
            return stat;
          })
        );

        if (data.chart) {
          setChartData(data.chart);
        }
      } catch (err) {
        console.error("Error cargando datos del admin:", err);
      }
    }

    fetchAdminData();
  }, []);

  return (
    <main className={styles["main-admin"]}>
      {/* Bienvenida */}
      <div className={styles["welcome-title"]}>
        <motion.h2
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          ¡Bienvenido Admin,{" "}
          <span className={styles["user-name"]}>
            {usuario.nombre} {usuario.apellido}
          </span>
          !
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

      {/* Tarjetas de estadísticas */}
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

              {stat.id !== 4 ? (
                <>
                  <p className={styles["stat-number"]}>{stat.number}</p>
                  <span className={styles["stat-sub"]}>{stat.sub}</span>
                </>
              ) : (
                // Para Formulario: mostrar los tres valores separados en grid
                  <div className={styles["formulario-stats-grid"]}>
                    <div className={styles["stat-item"]}>
                      <p className={styles["stat-number"]}>{stat.numbers.contacto}</p>
                      <span>Contacto</span>
                    </div>
                    <div className={styles["stat-item"]}>
                      <p className={styles["stat-number"]}>{stat.numbers.quejas}</p>
                      <span>Quejas</span>
                    </div>
                    <div className={styles["stat-item"]}>
                      <p className={styles["stat-number"]}>{stat.numbers.sugerencias}</p>
                      <span>Sugerencias</span>
                    </div>
                  </div>
              )}

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
                    stroke={stat.chartColor}
                    strokeWidth={3}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
