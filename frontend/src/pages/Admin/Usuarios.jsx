//frontend/src/pages/Admin/Usuarios.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import UserDetails from "../../components/Admin/Usuarios/UserDetails";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    axios.get("/api/admin/users")
      .then(res => setUsuarios(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleSelectUser = (id) => {
    axios.get(`/api/admin/users/${id}`)
      .then(res => setSelectedUser(res.data))
      .catch(err => console.error(err));
  };

  return (
    <div className="admin-users">
      <div className="users-list">
        {usuarios.map(u => (
          <button key={u.id_usuario} onClick={() => handleSelectUser(u.id_usuario)}>
            {u.nombre} {u.apellido}
          </button>
        ))}
      </div>

      {selectedUser && <UserDetails user={selectedUser} />}
    </div>
  );
}
