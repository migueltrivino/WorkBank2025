// src/components/admin/Usuarios/UserDetails.jsx
import React from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaBriefcase,
  FaClipboardList,
  FaStar,
} from "react-icons/fa";
import styles from "../../../css/Admin/UserDetails.module.css";

export default function UserDetails({ user }) {
  if (!user) return null;

  // Desestructuramos los campos del usuario
  const {
    correo = "—",
    telefono = "—",
    direccion = "—",
    historial = {},
    reseñas = [],
    calificacion = "—",
    nombre,
    apellido,
  } = user;

  const { ofertas = 0, postulaciones = 0, reseñas: reseñasCount = 0 } = historial;

  // Función para renderizar estrellas
  const renderStars = (puntuacion) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={i <= puntuacion ? styles.starFilled : styles.starEmpty}
        />
      );
    }
    return stars;
  };

  return (
    <div className={styles.container}>
      {/* Left: Contacto */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h4>Contacto</h4>
        </div>
        <div className={styles.cardBody}>
          <div className={styles.contactRow}>
            <FaEnvelope className={styles.icon} />
            <div>
              <div className={styles.contactLabel}>Email</div>
              <div className={styles.contactValue}>{correo}</div>
            </div>
          </div>
          <div className={styles.contactRow}>
            <FaPhone className={styles.icon} />
            <div>
              <div className={styles.contactLabel}>Tel</div>
              <div className={styles.contactValue}>{telefono}</div>
            </div>
          </div>
          <div className={styles.contactRow}>
            <FaMapMarkerAlt className={styles.icon} />
            <div>
              <div className={styles.contactLabel}>Dirección</div>
              <div className={styles.contactValue}>{direccion}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Center: Historial */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h4>Historial</h4>
        </div>
        <div className={styles.cardBody}>
          <div className={styles.metrics}>
            <div className={styles.metricItem}>
              <FaBriefcase className={styles.metricIcon} />
              <div className={styles.metricNumber}>{ofertas}</div>
              <div className={styles.metricLabel}>Ofertas</div>
            </div>
            <div className={styles.metricItem}>
              <FaClipboardList className={styles.metricIcon} />
              <div className={styles.metricNumber}>{postulaciones}</div>
              <div className={styles.metricLabel}>Postulaciones</div>
            </div>
            <div className={styles.metricItem}>
              <FaStar className={styles.metricIcon} />
              <div className={styles.metricNumber}>{reseñasCount}</div>
              <div className={styles.metricLabel}>Reseñas</div>
            </div>
          </div>

          <div className={styles.globalRating}>
            <div className={styles.ratingLeft}>
              <FaStar className={styles.starBig} />
              <div className={styles.ratingNumber}>{calificacion}</div>
            </div>
            <div className={styles.ratingNote}>Valoración global</div>
          </div>
        </div>
      </div>

      {/* Right: Reseñas */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h4>Reseñas</h4>
        </div>
        <div className={styles.cardBody}>
          {reseñas.length > 0 ? (
            <ul className={styles.reviewsList}>
              {reseñas.map((r) => (
                <li key={r.id} className={styles.reviewItem}>
                  <div className={styles.reviewHeader}>
                    <span className={styles.reviewAuthor}>{r.autor || "Usuario"}</span>
                    <span className={styles.reviewRating}>{renderStars(r.puntuacion)}</span>
                  </div>
                  <div className={styles.reviewText}>{r.texto}</div>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.noReviews}>Sin reseñas aún</p>
          )}
        </div>
      </div>
    </div>
  );
}
