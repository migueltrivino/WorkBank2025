import { useEffect, useState } from "react";
import "../css/MainOffers.css"; 

export default function MainOffers({ idUsuario }) {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar ofertas del usuario 
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/ofertas/usuario/${idUsuario}`);
        const data = await res.json();
        setOffers(data);
      } catch (err) {
        console.error("Error al cargar ofertas:", err);
      } finally {
        setLoading(false);
      }
    };

    if (idUsuario) {
      fetchOffers();
    }
  }, [idUsuario]);

  if (loading) return <p>Cargando ofertas...</p>;

  return (
    <main className="main-offers">
      <h2>Mis Ofertas</h2>
      <div className="offers-grid">
        {offers.length > 0 ? (
          offers.map((offer) => (
            <div key={offer.id_oferta} className="offer-card">
              <h3>{offer.titulo_oferta}</h3>
              <p>{offer.descripcion_oferta}</p>
              <p><strong>Publicación:</strong> {new Date(offer.fecha_publicacion).toLocaleDateString()}</p>
              <p><strong>Vencimiento:</strong> {new Date(offer.fecha_vencimiento).toLocaleDateString()}</p>
              <p><strong>Servicio:</strong> {offer.id_servicio}</p>
              <p><strong>Categoría:</strong> {offer.id_categoria}</p>
            </div>
          ))
        ) : (
          <p>No has creado ofertas todavía.</p>
        )}
      </div>
    </main>
  );
}
