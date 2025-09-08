import React, { useState } from "react";
import "../css/CreateOffer.css";

export default function CreateOfferForm({ onClose }) {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaVencimiento, setFechaVencimiento] = useState("");
  const [idServicio, setIdServicio] = useState("");
  const [idCategoria, setIdCategoria] = useState("");
  const [idUsuario, setIdUsuario] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevaOferta = {
      titulo_oferta: titulo,
      descripcion_oferta: descripcion,
      fecha_vencimiento: fechaVencimiento,
      id_servicio: parseInt(idServicio),
      id_categoria: parseInt(idCategoria),
      id_usuario: parseInt(idUsuario),
      fecha_publicacion: new Date().toISOString().split("T")[0]
    };

    try {
      const res = await fetch("http://localhost:5000/api/ofertas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevaOferta)
      });
      const data = await res.json();
      console.log("Respuesta del backend:", data);
      onClose();
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Crear Nueva Oferta</h2>
        <form onSubmit={handleSubmit} className="form-vertical">
          
          <div className="form-group">
            <label className="form-label">Título de la oferta</label>
            <input
              type="text"
              placeholder="Ej: Paseo de mascotas"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Descripción de la oferta</label>
            <textarea
              placeholder="Ej: Pasear perros 2 veces al día"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label className="form-label">Fecha de vencimiento</label>
            <input
              type="date"
              value={fechaVencimiento}
              onChange={(e) => setFechaVencimiento(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Servicio</label>
            <select
              value={idServicio}
              onChange={(e) => setIdServicio(e.target.value)}
              required
            >
              <option value="">Seleccione un servicio</option>
              <option value="1">Limpieza</option>
              <option value="2">Cuidado de niños</option>
              <option value="3">Paseo de mascotas</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Categoría</label>
            <select
              value={idCategoria}
              onChange={(e) => setIdCategoria(e.target.value)}
              required
            >
              <option value="">Seleccione una categoría</option>
              <option value="1">Hogar</option>
              <option value="2">Cuidado</option>
              <option value="3">Otros</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">ID del usuario</label>
            <input
              type="number"
              placeholder="Ej: 5"
              value={idUsuario}
              onChange={(e) => setIdUsuario(e.target.value)}
              required
            />
          </div>

          <div className="form-buttons">
            <button type="submit" className="btn-create">Crear</button>
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


