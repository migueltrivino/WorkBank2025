import { useState } from "react";
import SidebarEmplo from "../components/SidebarEmplo";
import NavbarEmplo from "../components/NavbarEmplo";
import "../components/SidebarEmplo.css";
import "./Reviews.css";

export default function Reviews() {
  const [notifOpen, setNotifOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [starFilter, setStarFilter] = useState("all");

  // Ejemplo de reseñas
  const reviews = [
    {
      stars: 4,
      comment: "Muy buen servicio, recomendado.",
      author: "Juan Pérez",
    },
    {
      stars: 3,
      comment: "Atención rápida y amable.",
      author: "María Gómez",
    },
    {
      stars: 5,
      comment: "Excelente experiencia, volvería a contratar.",
      author: "Luis Torres",
    },
    {
      stars: 2,
      comment: "El proceso fue sencillo pero podría mejorar.",
      author: "Ana Ruiz",
    },
  ];

  // Filtra las reseñas según el filtro seleccionado
  const filteredReviews =
    starFilter === "all"
      ? reviews
      : reviews.filter((r) => r.stars === Number(starFilter));

  return (
    <div>
      {/* Header tipo employer */}
      <NavbarEmplo
        notifOpen={notifOpen}
        setNotifOpen={setNotifOpen}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />

      {/* Breadcrumbs */}
      <nav className="breadcrumbs">
        <a href="/employer">Inicio</a>
        <span> &gt; </span>
        <span>Reseñas</span>
      </nav>

      <div className="reviews-page">
        <SidebarEmplo />
        <main className="reviews-container">
          <div
            className="reviews-header-title"
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <h2>Reseñas</h2>
              <div className="reviews-header-underline"></div>
            </div>
            <div className="reviews-filter">
              <label htmlFor="starFilter" style={{ marginRight: "8px" }}>
                Filtrar por estrellas:
              </label>
              <select
                id="starFilter"
                value={starFilter}
                onChange={(e) => setStarFilter(e.target.value)}
              >
                <option value="all">Todas</option>
                <option value="5">5 estrellas</option>
                <option value="4">4 estrellas</option>
                <option value="3">3 estrellas</option>
                <option value="2">2 estrellas</option>
                <option value="1">1 estrella</option>
              </select>
            </div>
          </div>
          <div className="reviews-grid">
            {filteredReviews.map((review, idx) => (
              <div className="review-card" key={idx}>
                <div className="review-stars">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className={i < review.stars ? "filled" : ""}>
                      ★
                    </i>
                  ))}
                </div>
                <p className="review-comment">{review.comment}</p>
                <p className="review-author">— {review.author}</p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
