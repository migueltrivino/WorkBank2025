import React, { useEffect, useState } from "react";
import styles from "../../css/Admin/UsersStats.module.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";
import {
  FaUser,
  FaUserCheck,
  FaUserTimes,
  FaUserPlus,
  FaChartPie,
  FaChartBar,
  FaChartLine,
} from "react-icons/fa";

export default function UsersStats() {
  const [stats, setStats] = useState(null);
  const [tab, setTab] = useState("resumen");

  useEffect(() => {
    fetch("http://localhost:4000/api/admin/users/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Error cargando estadísticas:", err));
  }, []);

  if (!stats) return <p>Cargando estadísticas...</p>;

  const COLORS = ["#236AB9", "#A7C5EB", "#0A2F5C", "#FFB703", "#E53E3E", "#38A169"];

  return (
    <div className={styles.statsContainer}>
      {/* 🔹 Pestañas */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${tab === "resumen" ? styles.active : ""}`}
          onClick={() => setTab("resumen")}
        >
          <FaUser /> Resumen
        </button>
        <button
          className={`${styles.tab} ${tab === "roles" ? styles.active : ""}`}
          onClick={() => setTab("roles")}
        >
          <FaChartPie /> Roles
        </button>
        <button
          className={`${styles.tab} ${tab === "confirmacion" ? styles.active : ""}`}
          onClick={() => setTab("confirmacion")}
        >
          <FaChartBar /> Confirmaciones
        </button>
        <button
          className={`${styles.tab} ${tab === "evolucion" ? styles.active : ""}`}
          onClick={() => setTab("evolucion")}
        >
          <FaChartLine /> Evolución
        </button>
      </div>

      {/* 🔹 Contenido de pestañas */}
      <div className={styles.tabContent}>
        {tab === "resumen" && (
          <div className={styles.cardsGrid}>
            <div className={styles.card}>
              <FaUser className={styles.icon} />
              <h3>Total usuarios</h3>
              <p>{stats.total}</p>
            </div>
            <div className={styles.card}>
              <FaUserCheck className={styles.icon} />
              <h3>Activos</h3>
              <p>{stats.activos}</p>
            </div>
            <div className={styles.card}>
              <FaUserTimes className={styles.icon} />
              <h3>Inactivos</h3>
              <p>{stats.inactivos}</p>
            </div>
            <div className={styles.card}>
              <FaUserPlus className={styles.icon} />
              <h3>Nuevos esta semana</h3>
              <p>{stats.nuevosSemana}</p>
            </div>
          </div>
        )}

        {tab === "roles" && (
          <div className={styles.chartBox}>
            <h2>Usuarios por Rol</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stats.roles}
                  dataKey="cantidad"
                  nameKey="rol"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {stats.roles.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        {tab === "confirmacion" && (
          <div className={styles.chartBox}>
            <h2>Confirmación de Cuentas</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={[
                  { name: "Confirmados", cantidad: stats.confirmados },
                  { name: "No Confirmados", cantidad: stats.noConfirmados },
                ]}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="cantidad" fill="#236AB9" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {tab === "evolucion" && (
          <div className={styles.chartBox}>
            <h2>Evolución Mensual</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={stats.mensual}>
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="cantidad" stroke="#9F7AEA" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
