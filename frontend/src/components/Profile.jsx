// components/Profile.jsx
import "../css/Profile.css";
import { useNavigate } from "react-router-dom";

export default function WorkerProfile() {
  const navigate = useNavigate();

  // Datos de ejemplo basados en tu base de datos
  const userData = {
    nombre: "Carlos",
    apellido: "Gómez",
    correo: "carlosgomez@gmail.com",
    imagen_perfil: "https://i.pravatar.cc/150",
    descripcion: "Especialista en cuidado de mascotas con más de 5 años de experiencia",
    servicio: "Cuidado de perros",
    categoria: "Mascotas",
    puntuacion_promedio: 4.8,
    proyectos_completados: 45,
    estado: "Disponible",
    ubicacion: "Bogotá, Colombia",
    telefono: "+57 300 123 4567",
    experiencia: "5 años"
  };

  const reseñas = [
    {
      id: 1,
      autor: "María Hernández",
      puntaje: 5,
      contenido: "Excelente servicio, muy responsable con mi perro Max",
      fecha: "2025-05-11"
    },
    {
      id: 2,
      autor: "José Martínez",
      puntaje: 4.5,
      contenido: "Muy puntual y cariñoso con las mascotas",
      fecha: "2025-05-15"
    },
    {
      id: 3,
      autor: "Laura Sánchez",
      puntaje: 4.8,
      contenido: "Lo recomiendo totalmente, mi perro lo adora",
      fecha: "2025-05-20"
    }
  ];

  const ofertasRecientes = [
    {
      id: 1,
      titulo: "Paseo diario para Buddy",
      descripcion: "Necesito alguien que pasee a mi perro todas las tardes",
      fecha: "2025-06-25",
      estado: "Activa"
    },
    {
      id: 2,
      titulo: "Cuidado de mascotas en fin de semana",
      descripcion: "Busco cuidador para mis 2 perros este fin de semana",
      fecha: "2025-06-20",
      estado: "Completada"
    },
    {
      id: 3,
      titulo: "Guardería para perro pequeño",
      descripcion: "Necesito cuidado para mi perro pequeño durante el día",
      fecha: "2025-06-18",
      estado: "Activa"
    }
  ];

  // Función para renderizar estrellas
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="fas fa-star"></i>);
    }
    
    if (hasHalfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt"></i>);
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star"></i>);
    }
    
    return stars;
  };

  // Función para regresar al dashboard de worker
  const handleGoBack = () => {
    navigate('/worker');
  };

  // Función para ver todas las reseñas
  const handleViewAllReviews = () => {
    // Aquí puedes agregar la navegación a la página de todas las reseñas
    console.log("Ver todas las reseñas");
  };

  // Función para ver todas las ofertas
  const handleViewAllOffers = () => {
    // Aquí puedes agregar la navegación a la página de todas las ofertas
    console.log("Ver todas las ofertas");
  };

  return (
    <div className="profile-container">
      {/* Header con título y botón de regresar */}
      <div className="profile-header-top">
        <button className="back-button" onClick={handleGoBack}>
          <i className="fas fa-arrow-left"></i>
        </button>
        <h1 className="profile-main-title">Mi Perfil</h1>
        <div className="header-spacer"></div>
      </div>

      {/* Columna izquierda - Perfil del usuario */}
      <div className="profile-sidebar">
        <div className="profile-header">
          <img
            src={userData.imagen_perfil}
            alt="Foto de perfil"
            className="profile-avatar"
          />
          <div className="profile-rating">
            {renderStars(userData.puntuacion_promedio)}
            <span className="rating-value">({userData.puntuacion_promedio})</span>
          </div>
          <h1 className="profile-name">{userData.nombre} {userData.apellido}</h1>
          <p className="profile-title">{userData.servicio}</p>
          <div className={`profile-status ${userData.estado.toLowerCase()}`}>
            {userData.estado}
          </div>
        </div>

        <div className="profile-stats">
          <div className="stat">
            <div className="stat-number">{userData.proyectos_completados}+</div>
            <div className="stat-label">Proyectos Realizados</div>
          </div>
          <div className="stat">
            <div className="stat-number">{userData.experiencia}</div>
            <div className="stat-label">Experiencia</div>
          </div>
        </div>

        <div className="profile-info">
          <h3>Información de Contacto</h3>
          <div className="contact-item">
            <i className="fas fa-envelope"></i>
            <span>{userData.correo}</span>
          </div>
          <div className="contact-item">
            <i className="fas fa-phone"></i>
            <span>{userData.telefono}</span>
          </div>
          <div className="contact-item">
            <i className="fas fa-map-marker-alt"></i>
            <span>{userData.ubicacion}</span>
          </div>
        </div>

        <div className="profile-actions">
          <button className="btn-primary">Contactar</button>
          <button className="btn-secondary">Editar Perfil</button>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="profile-main">
        {/* Sección de Desempeño */}
        <div className="performance-section">
          <h2>Desempeño</h2>
          <div className="performance-card">
            <p className="performance-description">{userData.descripcion}</p>
          </div>
        </div>

        {/* Contenido en dos columnas */}
        <div className="content-grid">
          {/* Columna de Reseñas */}
          <div className="column-wrapper">
            <div className="section-header">
              <h2>Reseñas y Comentarios</h2>
            </div>
            <div className="cards-container">
              {reseñas.map((reseña, index) => (
                <div 
                  key={reseña.id} 
                  className="review-card"
                  style={{ '--animation-order': index }}
                >
                  <div className="review-header">
                    <div className="reviewer-info">
                      <strong>{reseña.autor}</strong>
                      <span className="review-date">{reseña.fecha}</span>
                    </div>
                    <div className="review-stars">
                      {renderStars(reseña.puntaje)}
                    </div>
                  </div>
                  <p className="review-content">{reseña.contenido}</p>
                </div>
              ))}
            </div>
            <button className="view-all-btn" onClick={handleViewAllReviews}>
              Ver todas las reseñas
            </button>
          </div>

          {/* Columna de Ofertas */}
          <div className="column-wrapper">
            <div className="section-header">
              <h2>Ofertas Realizadas Recientemente</h2>
            </div>
            <div className="cards-container">
              {ofertasRecientes.map((oferta, index) => (
                <div 
                  key={oferta.id} 
                  className="offer-card"
                  style={{ '--animation-order': index }}
                >
                  <div className="offer-header">
                    <h3 className="offer-title">{oferta.titulo}</h3>
                    <span className={`offer-status ${oferta.estado.toLowerCase()}`}>
                      {oferta.estado}
                    </span>
                  </div>
                  <p className="offer-description">{oferta.descripcion}</p>
                  <div className="offer-footer">
                    <span className="offer-date">{oferta.fecha}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="view-all-btn" onClick={handleViewAllOffers}>
              Ver todas las ofertas
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}