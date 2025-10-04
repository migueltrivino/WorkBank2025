// src/components/Admin/TableUsers.jsx
import React, { useState, useEffect } from "react";
import { FaEye, FaEdit, FaTrash, FaStar } from "react-icons/fa";
import styles from "../../../css/Admin/TableUsers.module.css";
import Vermas from "../../Loaders/Vermas";
import UserDetail from "./UserDetails";
import useToast from "../../toast/useToast";
import AdminActionModal from "../Modals/AdminActionModal";

function TableUsers({ currentAdmin, data = [], filters }) {
  const [users, setUsers] = useState([]);
  const [expandedUserId, setExpandedUserId] = useState(null);
  const [loadingUserId, setLoadingUserId] = useState(null);
  const { showToast } = useToast();

  const [modal, setModal] = useState({
    show: false,
    type: "",
    user: null,
  });

  // Cuando cambia la prop data actualizamos el estado interno
  useEffect(() => {
    setUsers(Array.isArray(data) ? data : []);
  }, [data]);

  // -------------------- Expandir fila (trae detalle completo) --------------------
  const handleView = async (userId) => {
    if (expandedUserId === userId) {
      setExpandedUserId(null);
      return;
    }

    setExpandedUserId(userId);
    setLoadingUserId(userId);

    try {
      const res = await fetch(`http://localhost:4000/api/admin/users/${userId}`);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const fullUser = await res.json();

      setUsers((prev) =>
        prev.map((u) => (u.id_usuario === userId ? { ...u, ...fullUser } : u))
      );
      showToast("✅ Detalles del usuario cargados", "success");
    } catch (err) {
      console.error("❌ Error al cargar detalles:", err);
      showToast("❌ Error al cargar detalles del usuario", "error");
    } finally {
      setLoadingUserId(null);
    }
  };

  // -------------------- Modal --------------------
  const openModal = (type, user) => {
    setModal({ show: true, type, user });
  };

  const closeModal = () => {
    setModal({ show: false, type: "", user: null });
  };

  // -------------------- Confirmar acción --------------------
  const confirmModal = async (payloadFromModal) => {
    const { type, user } = modal;
    if (!currentAdmin?.id_usuario) {
      showToast("❌ ID de admin no disponible", "error");
      return;
    }

    try {
      // Editar
      if (type === "edit") {
        const res = await fetch(
          `http://localhost:4000/api/admin/users/${user.id_usuario}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              adminId: currentAdmin.id_usuario,
              nombre: payloadFromModal.nombre,
              apellido: payloadFromModal.apellido,
              correo: payloadFromModal.correo,
            }),
          }
        );
        if (!res.ok) throw new Error("Error al actualizar usuario");
        const updatedUser = await res.json();
        setUsers((prev) =>
          prev.map((u) => (u.id_usuario === user.id_usuario ? updatedUser : u))
        );
        showToast("✅ Usuario actualizado correctamente", "success");
      }

      // Eliminar
      if (type === "delete") {
        const res = await fetch(
          `http://localhost:4000/api/admin/users/${user.id_usuario}`,
          {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ adminId: currentAdmin.id_usuario }),
          }
        );
        if (!res.ok) throw new Error("Error al eliminar usuario");
        setUsers((prev) => prev.filter((u) => u.id_usuario !== user.id_usuario));
        showToast("✅ Usuario eliminado correctamente", "success");
      }

      // Cambiar estado
      if (type === "status") {
        const newEstado = user.estado === 1 ? 0 : 1;
        const res = await fetch(
          `http://localhost:4000/api/admin/users/${user.id_usuario}/status`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              adminId: currentAdmin.id_usuario,
              estado: newEstado,
            }),
          }
        );
        if (!res.ok) throw new Error("Error al cambiar estado");
        setUsers((prev) =>
          prev.map((u) =>
            u.id_usuario === user.id_usuario ? { ...u, estado: newEstado } : u
          )
        );
        showToast(
          `✅ Usuario ${newEstado === 1 ? "activado" : "desactivado"} correctamente`,
          "success"
        );
      }

      closeModal();
    } catch (err) {
      showToast(`❌ ${err.message}`, "error");
    }
  };

  // -------------------- Render --------------------
  return (
    <div className={styles.usersAdmin}>
      <div className={styles.headerTop}>
        <h1 className={styles.title}></h1>
      </div>

      <div className={styles.usersTableWrapper}>
        <table className={styles.usersTable}>
          <thead>
            <tr>
              <th>Foto</th>
              <th>Nombre</th>
              <th>Rol</th>
              <th>Registro</th>
              <th>Estado</th>
              <th>Calificación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <React.Fragment key={user.id_usuario}>
                <tr className={`${styles.userRow} ${user.estado === 0 ? styles.rowInactive : ""}`}>
                  <td>
                    <img
                      src={user.imagen_perfil || "https://via.placeholder.com/80"}
                      alt={user.nombre}
                      className={styles.userPhoto}
                    />
                  </td>
                  <td>{user.nombre} {user.apellido}</td>
                  <td>{user.rol_nombre || "Usuario"}</td>
                  <td>{user.fecha_creacion ? new Date(user.fecha_creacion).toLocaleDateString() : ""}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${user.estado === 1 ? styles.active : styles.suspended}`}>
                      {user.estado === 1 ? "Activo" : "Suspendido"}
                    </span>
                  </td>
                  <td>
                    <span className={styles.rating}>
                      <FaStar className={styles.starIcon} /> {user.calificacion ?? 0}
                    </span>
                  </td>
                  <td>
                    <div className={styles.userActions}>
                      <button className={`${styles.btn} ${styles.btnView}`} onClick={() => handleView(user.id_usuario)} title="Ver más"><FaEye /></button>
                      <button className={`${styles.btn} ${styles.btnEdit}`} onClick={() => openModal("edit", user)} title="Editar usuario"><FaEdit /></button>
                      <button className={`${styles.btn} ${styles.btnDelete}`} onClick={() => openModal("delete", user)} title="Eliminar usuario"><FaTrash /></button>
                      <label className={styles.switch}>
                        <input type="checkbox" checked={user.estado === 1} onChange={() => openModal("status", user)} />
                        <span className={styles.slider}></span>
                      </label>
                    </div>
                  </td>
                </tr>

                {expandedUserId === user.id_usuario && (
                  <tr className={styles.detailsRow}>
                    <td colSpan="7">
                      {loadingUserId === user.id_usuario ? (
                        <div className={styles.loaderContainer}><Vermas /></div>
                      ) : (
                        <UserDetail user={user} />
                      )}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {modal.show && (
        <AdminActionModal
          modal={modal}
          setModal={setModal}
          confirmModal={confirmModal}
          currentAdmin={currentAdmin}
        />
      )}
    </div>
  );
}

export default TableUsers;
