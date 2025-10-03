// src/components/Admin/Modals/AdminActionModal.jsx
import React, { useState, useEffect } from "react";
import {
  FaUserEdit,
  FaTrash,
  FaToggleOn,
  FaToggleOff,
  FaInfoCircle,
} from "react-icons/fa";
import styles from "../../../css/Admin/ModalAdminAction.module.css";

export default function AdminActionModal({ modal, setModal, confirmModal }) {
  const { type, user } = modal;

  // Estado local para inputs de edición
  const [editFields, setEditFields] = useState({
    nombre: user?.nombre || "",
    apellido: user?.apellido || "",
    correo: user?.correo || "",
  });

  // -------------------- LOG INICIAL --------------------
  console.log("🟢 [AdminActionModal] Modal abierto con:", {
    type,
    user,
    editFields,
  });

  // Actualizar campos cuando cambia el usuario
  useEffect(() => {
    if (user) {
      console.log("🔄 [useEffect] Actualizando editFields por cambio de usuario:", user);
      setEditFields({
        nombre: user.nombre || "",
        apellido: user.apellido || "",
        correo: user.correo || "",
      });
    }
  }, [user]);

  const closeModal = () => {
    console.log("❌ [AdminActionModal] Cerrando modal");
    setModal({ show: false, type: "", user: null });
  };

  const getTitle = () => {
    if (type === "edit") return "Editar Usuario";
    if (type === "delete") return "Eliminar Usuario";
    if (type === "status") return "Cambiar Estado de Usuario";
  };

  const getIcon = () => {
    if (type === "edit") return <FaUserEdit className={styles.mainIcon} />;
    if (type === "delete") return <FaTrash className={styles.mainIcon} />;
    if (type === "status")
      return user?.estado === 1 ? (
        <FaToggleOn className={styles.mainIcon} />
      ) : (
        <FaToggleOff className={styles.mainIcon} />
      );
  };

  const handleConfirm = () => {
    console.log("✅ [handleConfirm] Acción confirmada:", { type, user, editFields });

    if (!user) {
      console.error("⚠️ [handleConfirm] No hay usuario seleccionado en el modal");
      return;
    }

    if (type === "edit") {
      console.log("✏️ [handleConfirm] Enviando datos de edición:", editFields);
      confirmModal(editFields); // pasamos los nuevos datos
    } else {
      console.log("🗑️/🔄 [handleConfirm] Acción de eliminar o cambiar estado para:", user);
      confirmModal(); // delete o status solo necesitan el id
    }

    closeModal();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          {getIcon()}
          <h2>{getTitle()}</h2>
        </div>

        <div className={styles.modalBody}>
          {type === "edit" && (
            <p>
              Para editar al usuario <strong>{user?.nombre} {user?.apellido}</strong>, ingresa los nuevos datos.
            </p>
          )}
          {type === "delete" && (
            <p>
              Estás a punto de eliminar al usuario <strong>{user?.nombre} {user?.apellido}</strong>.
            </p>
          )}
          {type === "status" && (
            <p>
              Cambiar estado de <strong>{user?.nombre} {user?.apellido}</strong>:{" "}
              {user?.estado === 1 ? "Actualmente Activo" : "Actualmente Suspendido"}.
            </p>
          )}

          {type === "edit" && (
            <div className={styles.inputGrid}>
              <div className={styles.inputCell}>
                <label>
                  <FaUserEdit /> Nuevo Nombre
                  <span className={styles.tooltip}>
                    <FaInfoCircle />
                    <span className={styles.tooltipText}>Ingresa el nuevo nombre</span>
                  </span>
                </label>
                <input
                  type="text"
                  value={editFields.nombre}
                  onChange={(e) => {
                    console.log("⌨️ Nombre cambiado:", e.target.value);
                    setEditFields({ ...editFields, nombre: e.target.value });
                  }}
                  className={styles.modalInput}
                  placeholder="Nuevo nombre"
                />
              </div>
              <div className={styles.inputCell}>
                <label>
                  <FaUserEdit /> Nuevo Apellido
                  <span className={styles.tooltip}>
                    <FaInfoCircle />
                    <span className={styles.tooltipText}>Ingresa el nuevo apellido</span>
                  </span>
                </label>
                <input
                  type="text"
                  value={editFields.apellido}
                  onChange={(e) => {
                    console.log("⌨️ Apellido cambiado:", e.target.value);
                    setEditFields({ ...editFields, apellido: e.target.value });
                  }}
                  className={styles.modalInput}
                  placeholder="Nuevo apellido"
                />
              </div>
              <div className={styles.inputCell}>
                <label>
                  <FaUserEdit /> Nuevo Correo
                  <span className={styles.tooltip}>
                    <FaInfoCircle />
                    <span className={styles.tooltipText}>Ingresa el nuevo correo</span>
                  </span>
                </label>
                <input
                  type="email"
                  value={editFields.correo}
                  onChange={(e) => {
                    console.log("⌨️ Correo cambiado:", e.target.value);
                    setEditFields({ ...editFields, correo: e.target.value });
                  }}
                  className={styles.modalInput}
                  placeholder="nuevo@correo.com"
                />
              </div>
            </div>
          )}
        </div>

        <div className={styles.modalActions}>
          <button onClick={closeModal} className={styles.btnCancel}>
            Cancelar
          </button>
          <button onClick={handleConfirm} className={styles.btnConfirm}>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
