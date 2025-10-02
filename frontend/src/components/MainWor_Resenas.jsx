import React, { useState, useEffect } from "react";
import styles from "../css/MainWor_Resenas.module.css";
import { getUser } from "../utils/auth"; // helper para obtener usuario logueado
import axios from "axios";

export default function MainWor_Resenas() {
  const user = getUser(); // usuario logueado
  const [resenas, setResenas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchResenas = async () => {
      try {
        const { data } = await axios.get(`http://localhost:4000/api/resenas/usuario/${user.id_usuario}`);
        setResenas(data);
      } catch (error) {
        console.error("Error al obtener reseñas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResenas();
  }, [user]);

  const renderStars = (puntaje) =>
    [...Array(5)].map((_, idx) => (
      <span
        key={idx}
        className={idx < puntaje ? styles.starFilled : styles.starEmpty}
        aria-hidden
      >
        ★
      </span>
    ));

  if (loading) return <p className={styles.loading}>Cargando reseñas...</p>;

  if (resenas.length === 0) return <p className={styles.noResults}>No tienes reseñas aún.</p>;

  return (
    <main className={styles.resenasContainer}>
      <div className={styles.headerTop}>
        <h1 className={styles.titulo}>Mis Reseñas</h1>
        <p className={styles.subtitulo}>Opiniones de usuarios — mira las estrellas</p>
      </div>

      <div className={styles.resenasWrapper}>
        <div className={styles.resenasGrid}>
          {resenas.map((r) => (
            <article key={r.id_resena} className={styles.resenaCard}>
              <div className={styles.cardHeader}>
                <img
                  src={`https://i.pravatar.cc/80?u=${r.id_resena}`} // placeholder de avatar
                  alt={`${r.autor_nombre} profile`}
                  className={styles.fotoPerfil}
                />
                <div className={styles.userInfo}>
                  <p className={styles.nombreUsuario}>
                    {r.autor_nombre} {r.autor_apellido}
                  </p>
                  <div className={styles.estrellas}>{renderStars(r.puntaje_resena)}</div>
                </div>
              </div>

              <p className={styles.contenido}>"{r.contenido_resena}"</p>

              <div className={styles.cardFooter}>
                <span className={styles.puntajeNumerico}>
                  {Number(r.puntaje_resena).toFixed(1)} / 5
                </span>
                <time className={styles.fecha}>
                  {new Date(r.fecha_resena).toLocaleDateString()}
                </time>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
