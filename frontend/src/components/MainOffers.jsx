import { useEffect, useState } from "react";
import "../css/MainOffers.css";

function MainOffers({ idUsuario }) {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  // =========================
  // Cargar ofertas del usuario
  // =========================
  const fetchOffers = async () => {
    console.log("idUsuario en MainOffers:", idUsuario);
    try {
      const res = await fetch(`http://localhost:4000/api/ofertas/usuario/${idUsuario}`);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setOffers(data);
    } catch (err) {
      console.error("Error al cargar ofertas:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (idUsuario) fetchOffers();
  }, [idUsuario]);

  // =========================
  // Función para eliminar oferta
  // =========================
  const handleDelete = async (id_oferta) => {
    if (!window.confirm("¿Estás seguro de eliminar esta oferta?")) return;

    try {
      const res = await fetch(`http://localhost:4000/api/ofertas/${id_oferta}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Error al eliminar la oferta");

      setOffers(offers.filter((offer) => offer.id_oferta !== id_oferta));
      alert("Oferta eliminada correctamente");
    } catch (error) {
      console.error(error);
      alert("No se pudo eliminar la oferta");
    }
  };

  // =========================
  // Función para actualizar oferta (solo título y descripción)
  // =========================
  const handleUpdate = async (offer) => {
    const nuevoTitulo = prompt("Nuevo título de la oferta:", offer.titulo_oferta);
    if (!nuevoTitulo) return;

    const nuevaDescripcion = prompt("Nueva descripción de la oferta:", offer.descripcion_oferta);
    if (!nuevaDescripcion) return;

    try {
      const res = await fetch(`http://localhost:4000/api/ofertas/${offer.id_oferta}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo_oferta: nuevoTitulo,
          descripcion_oferta: nuevaDescripcion
        }),
      });

      if (!res.ok) throw new Error("Error al actualizar la oferta");

      const updatedOffer = await res.json();
      setOffers(
        offers.map((o) =>
          o.id_oferta === updatedOffer.offer.id_oferta ? updatedOffer.offer : o
        )
      );
      alert("Oferta actualizada correctamente");
    } catch (error) {
      console.error("Error al actualizar:", error);
      alert("No se pudo actualizar la oferta");
    }
  };

  // =========================
  // Loader
  // =========================
  if (loading) {
    return (
      <div className="loader-page">
        <div className="pencil-loader"></div>
        <p>Cargando ofertas...</p>
      </div>
    );
  }

  // =========================
  // Render
  // =========================
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
                  <strong>Publicación:</strong>{" "}
                  {offer.fecha_publicacion
                    ? new Date(offer.fecha_publicacion).toLocaleDateString("es-CO")
                    : "No definida"}
                </p>
                <p>
                  <strong>Vencimiento:</strong>{" "}
                  {offer.fecha_vencimiento
                    ? new Date(offer.fecha_vencimiento).toLocaleDateString("es-CO")
                    : "No definida"}
                </p>
                <p><strong>Servicio:</strong> {offer.id_servicio}</p>
                <p><strong>Categoría:</strong> {offer.id_categoria}</p>

                <div className="offer-actions">
                  <button
                    className="main-offer-btn update-btn"
                    onClick={() => handleUpdate(offer)}
                  >
                    Actualizar
                  </button>
                  <button
                    className="main-offer-btn delete-btn"
                    onClick={() => handleDelete(offer.id_oferta)}
                  >
                    Eliminar
                  </button>
                </div>
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

export default MainOffers;