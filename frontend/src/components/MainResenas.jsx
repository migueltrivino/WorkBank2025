import React, { useState, useEffect } from "react";
import styles from "../css/MainResenas.module.css";
import { getUser } from "../utils/auth"; // helper para obtener usuario logueado

export default function EmployerResenas() {
  // Obtener usuario logueado una sola vez
  const [user] = useState(getUser());
  const [resenas, setResenas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;

    const fetchResenas = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:4000/api/resenas/usuario/${user.id_usuario}`);
        if (!res.ok) throw new Error("Error al obtener reseñas");
        const data = await res.json();
        setResenas(data);
      } catch (err) {
        console.error("Error al cargar reseñas:", err);
        setError("No se pudieron cargar las reseñas.");
      } finally {
        setLoading(false);
      }
    };

    fetchResenas();
  }, [user.id_usuario]); // Solo depende del ID del usuario

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Reseñas de tus empleadores</h2>

      {loading ? (
        <p className={styles.cargando}>Cargando reseñas...</p>
      ) : error ? (
        <p className={styles.vacio}>{error}</p>
      ) : resenas.length === 0 ? (
        <p className={styles.vacio}>No tienes reseñas todavía.</p>
      ) : (
        <div className={styles.resenasGrid}>
          {resenas.map((resena) => (
            <div key={resena.id_resena} className={styles.card}>
              <div className={styles.profile}>
                <img
                  src={`https://i.pravatar.cc/60?u=${resena.id_resena}`}
                  alt={`${resena.autor_nombre} ${resena.autor_apellido}`}
                  className={styles.avatar}
                />
              </div>
              <div className={styles.info}>
                <h4 className={styles.user}>
                  {resena.autor_nombre} {resena.autor_apellido}
                </h4>
                <div className={styles.stars}>
                  {"★".repeat(resena.puntaje_resena)}
                  {"☆".repeat(5 - resena.puntaje_resena)}
                </div>
                <p className={styles.comment}>{resena.contenido_resena}</p>
                <p className={styles.date}>{resena.fecha_resena}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
