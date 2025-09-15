import { useEffect, useState } from "react";
import "../css/MainOffers.css"; 

export default function MainOffers({ idUsuario }) {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/ofertas/usuario/${idUsuario}`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setOffers(data);
      } catch (err) {
        console.error("Error al cargar ofertas:", err);
      } finally {
        
        setTimeout(() => setLoading(false), 1200);
      }
    };

    if (idUsuario) fetchOffers();
  }, [idUsuario]);

  if (loading) {
    return (
      <div className="loader-page">
        <div className="pencil-loader"></div>
        <p>Cargando ofertas...</p>
      </div>
    );
  }

  return (
    <main className="main-offers">
      <h2 className="offers-header">Mis Ofertas</h2>
      <div className="offers-scroll">
        <div className="offers-container">
          {offers.length > 0 ? (
            offers.map((offer) => (
              <div key={offer.id_oferta} className="offer-card">
                <h3 className="offer-title">{offer.titulo_oferta}</h3>
                <p className="offer-desc">{offer.descripcion_oferta}</p>
                <p>
                  <strong>Publicación:</strong> {offer.fecha_publicacion ? new Date(offer.fecha_publicacion).toLocaleDateString() : 'No definida'}
                </p>
                <p>
                  <strong>Vencimiento:</strong> {offer.fecha_vencimiento ? new Date(offer.fecha_vencimiento).toLocaleDateString() : 'No definida'}
                </p>
                <p><strong>Servicio:</strong> {offer.id_servicio}</p>
                <p><strong>Categoría:</strong> {offer.id_categoria}</p>
                <button className="main-offer-btn">Ver detalles</button>
              </div>
            ))
          ) : (
            <p className="no-offers">No has creado ofertas todavía.</p>
          )}
        </div>
      </div>
    </main>
  );
}



