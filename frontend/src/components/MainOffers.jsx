import { useState, useEffect } from "react";
import styles from "../css/MainOffers.module.css";
import { getUser } from "../utils/auth"; // <-- tu helper para obtener usuario

export default function MainOffers() {
  const user = getUser();
  const [offers, setOffers] = useState([]);
  const [editOffer, setEditOffer] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [filter, setFilter] = useState("");

  // ==========================
  // Cargar ofertas del usuario
  // ==========================
  useEffect(() => {
    if (!user) return;
    fetch(`http://localhost:4000/api/ofertas/usuario/${user.id_usuario}`)
      .then((res) => res.json())
      .then((data) => setOffers(data))
      .catch((err) => console.error("Error al cargar ofertas:", err));
  }, [user]);

  // ==========================
  // Eliminar oferta
  // ==========================
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowConfirmDelete(true);
  };

  const confirmDelete = async () => {
    try {
      const res = await fetch(`http://localhost:4000/api/ofertas/${deleteId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Error eliminando oferta");
      setOffers(offers.filter((o) => o.id_oferta !== deleteId));
      setShowConfirmDelete(false);
      setDeleteId(null);
    } catch (err) {
      console.error(err);
    }
  };

  // ==========================
  // Editar oferta
  // ==========================
  const handleEdit = (offer) => {
    setEditOffer(offer);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

    const updated = {
      titulo_oferta: form.get("titulo"),
      descripcion_oferta: form.get("descripcion"),
      pago: parseFloat(form.get("precio")),
      fecha_vencimiento: form.get("fecha"),
      id_servicio: parseInt(form.get("servicio")),
      id_categoria: parseInt(form.get("categoria")),
    };

    try {
      const res = await fetch(`http://localhost:4000/api/ofertas/${editOffer.id_oferta}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      if (!res.ok) throw new Error("Error actualizando oferta");
      const data = await res.json();
      setOffers(offers.map((o) => (o.id_oferta === editOffer.id_oferta ? data.offer : o)));
      setShowForm(false);
      setEditOffer(null);
    } catch (err) {
      console.error(err);
    }
  };

  // ==========================
  // Filtrado
  // ==========================
  const filteredOffers = offers.filter((offer) => {
    const text = filter.toLowerCase();
    return (
      offer.titulo_oferta.toLowerCase().includes(text) ||
      offer.descripcion_oferta.toLowerCase().includes(text) ||
      offer.pago.toString().includes(text) ||
      new Date(offer.fecha_vencimiento).toLocaleDateString().includes(text)
    );
  });

  return (
    <main className={styles["main-offers"]}>
      <h2 className={styles["offers-header"]}>Mis Ofertas</h2>

      {/* 🔍 Input filtro */}
      <div className={styles["filter-container"]}>
        <div className={styles["filter-input-wrapper"]}>
          <span className={styles["filter-icon"]}>🔍</span>
          <input
            type="text"
            placeholder="Buscar ofertas..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className={styles["filter-input"]}
          />
        </div>
      </div>

      {/* ========================== */}
      {/* Ofertas */}
      {/* ========================== */}
      <div className={styles["offers-container"]}>
        {filteredOffers.length > 0 ? (
          filteredOffers.map((offer) => (
            <div key={offer.id_oferta} className={styles["offer-card"]}>
              <h3>{offer.titulo_oferta}</h3>
              <p>{offer.descripcion_oferta}</p>
              <div className={styles["offer-meta"]}>
                <span><strong>Vencimiento:</strong> {new Date(offer.fecha_vencimiento).toLocaleDateString()}</span>
                <span><strong>Servicio:</strong> {offer.id_servicio}</span>
                <span><strong>Categoría:</strong> {offer.id_categoria}</span>
                <span><strong>Pago:</strong> ${offer.pago}</span>
              </div>
              <div className={styles["offer-actions"]}>
                <button onClick={() => handleEdit(offer)} className={styles["btn-update"]}>Actualizar</button>
                <button onClick={() => handleDeleteClick(offer.id_oferta)} className={styles["btn-delete"]}>Eliminar</button>
              </div>
            </div>
          ))
        ) : (
          <p className={styles["no-results"]}>No se encontraron ofertas</p>
        )}
      </div>

      {/* ========================== */}
      {/* Modal Confirm Delete */}
      {/* ========================== */}
      {showConfirmDelete && (
        <div className={styles["modal-backdrop"]}>
          <div className={styles["confirm-modal"]}>
            <p>¿Estás seguro que quieres eliminar esta oferta?</p>
            <div className={styles["form-actions"]}>
              <button onClick={confirmDelete} className={styles["btn-delete"]}>Sí, eliminar</button>
              <button onClick={() => setShowConfirmDelete(false)} className={styles["btn-cancel"]}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {/* ========================== */}
      {/* Modal Edit Offer */}
      {/* ========================== */}
      {showForm && (
        <div className={styles["modal-backdrop"]}>
          <div className={styles["modal"]}>
            <h3>Editar Oferta</h3>
            <form onSubmit={handleSubmit} className={styles["edit-form"]}>
              <label>
                Título
                <input type="text" name="titulo" defaultValue={editOffer.titulo_oferta} required />
              </label>
              <label>
                Descripción
                <textarea name="descripcion" defaultValue={editOffer.descripcion_oferta} required />
              </label>
              <label>
                Pago
                <input type="number" name="precio" defaultValue={editOffer.pago} required />
              </label>
              <label>
                Fecha de vencimiento
                <input type="date" name="fecha" defaultValue={editOffer.fecha_vencimiento.split("T")[0]} required />
              </label>
              <label>
                Servicio
                <input type="number" name="servicio" defaultValue={editOffer.id_servicio} required />
              </label>
              <label>
                Categoría
                <input type="number" name="categoria" defaultValue={editOffer.id_categoria} required />
              </label>
              <div className={styles["form-actions"]}>
                <button type="submit" className={styles["btn-update"]}>Guardar</button>
                <button type="button" onClick={() => setShowForm(false)} className={styles["btn-cancel"]}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
