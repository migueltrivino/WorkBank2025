import React, { useState, useEffect } from "react";
import { FaEye, FaEdit, FaTrash, FaStar } from "react-icons/fa";
import styles from "../../../css/Admin/TableUsers.module.css";
import Vermas from "../../Loaders/Vermas";
import UserDetail from "./UserDetails";

function TableUsers() {
  const [users, setUsers] = useState([]);
  const [expandedUserId, setExpandedUserId] = useState(null);
  const [loadingUserId, setLoadingUserId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [adminPass, setAdminPass] = useState("");

  // ⚡ Traer todos los usuarios desde la base de datos
  useEffect(() => {
    fetch("http://localhost:4000/api/admin/users") // Ruta completa al backend
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error al cargar usuarios:", err));
  }, []);

  // Expandir fila y traer datos completos del usuario
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
        prev.map((u) => (u.id_usuario === userId ? fullUser : u))
      );
    } catch (err) {
      console.error("Error al cargar detalles del usuario:", err);
    } finally {
      setLoadingUserId(null);
    }
  };

  // Editar usuario
  const handleEdit = (user) => console.log("Editar usuario:", user);

  // Eliminar usuario
  const handleDelete = (user) => {
    if (window.confirm(`¿Seguro que deseas eliminar a ${user.nombre}?`)) {
      console.log("Eliminar usuario:", user);
    }
  };

  // Abrir modal para confirmar cambio de estado
  const handleToggleStatus = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  // Confirmar cambio de estado con contraseña
  const confirmToggle = () => {
    if (adminPass === "admin123") {
      alert(
        `Usuario ${selectedUser.nombre} cambiado de estado correctamente.`
      );
      setShowModal(false);
      setAdminPass("");
    } else {
      alert("Contraseña incorrecta. Intenta de nuevo.");
    }
  };

  return (
    <div className={styles.usersAdmin}>
      {/* Header con animación */}
      <div className={styles.headerTop}>
        <h1 className={styles.title}>Administración de Usuarios</h1>
        <div className={styles.typewriter}>
          <div className="slide"><i></i></div>
          <div className="paper"></div>
          <div className="keyboard"></div>
        </div>
      </div>

      {/* Contenedor scrollable de la tabla */}
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
                <tr
                  className={`${styles.userRow} ${
                    user.estado === 0 ? styles.rowInactive : ""
                  }`}
                >
                  <td>
                    <img
                      src={user.imagen_perfil || "https://via.placeholder.com/80"}
                      alt={user.nombre}
                      className={styles.userPhoto}
                    />
                  </td>
                  <td className={styles.userName}>{user.nombre} {user.apellido}</td>
                  <td>{user.rol_nombre || "Usuario"}</td>
                  <td>{new Date(user.fecha_creacion).toLocaleDateString()}</td>
                  <td>
                    <span
                      className={`${styles.statusBadge} ${
                        user.estado === 1
                          ? styles.active
                          : styles.suspended
                      }`}
                    >
                      {user.estado === 1 ? "Activo" : "Suspendido"}
                    </span>
                  </td>
                  <td>
                    <span className={styles.rating}>
                      <FaStar className={styles.starIcon} /> {user.calificacion || 0}
                    </span>
                  </td>
                  <td>
                    <div className={styles.userActions}>
                      <button
                        className={`${styles.btn} ${styles.btnView}`}
                        onClick={() => handleView(user.id_usuario)}
                        title="Ver más"
                      >
                        <FaEye />
                      </button>
                      <button
                        className={`${styles.btn} ${styles.btnEdit}`}
                        onClick={() => handleEdit(user)}
                        title="Editar usuario"
                      >
                        <FaEdit />
                      </button>
                      <button
                        className={`${styles.btn} ${styles.btnDelete}`}
                        onClick={() => handleDelete(user)}
                        title="Eliminar usuario"
                      >
                        <FaTrash />
                      </button>
                      <label className={styles.switch}>
                        <input
                          type="checkbox"
                          checked={user.estado === 1}
                          onChange={() => handleToggleStatus(user)}
                        />
                        <span className={styles.slider}></span>
                      </label>
                    </div>
                  </td>
                </tr>

                {/* Fila expandida */}
                {expandedUserId === user.id_usuario && (
                  <tr className={styles.detailsRow}>
                    <td colSpan="7">
                      {loadingUserId === user.id_usuario ? (
                        <div className={styles.loaderContainer}>
                          <Vermas />
                        </div>
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

      {/* Modal Seguridad */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Confirmar acción</h2>
            <p>
              Para cambiar el estado del usuario{" "}
              <strong>{selectedUser?.nombre}</strong>, ingresa tu contraseña de
              administrador:
            </p>
            <input
              type="password"
              value={adminPass}
              onChange={(e) => setAdminPass(e.target.value)}
              placeholder="Contraseña de admin"
              className={styles.modalInput}
            />
            <div className={styles.modalActions}>
              <button onClick={() => setShowModal(false)}>Cancelar</button>
              <button onClick={confirmToggle}>Confirmar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TableUsers;
