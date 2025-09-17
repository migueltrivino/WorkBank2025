import React from "react";

function MainApplications({ idUsuario }) {
  // Aquí puedes traer las postulaciones de tu API según el usuario
  return (
    <div>
      <h2>Postulaciones de usuario {idUsuario}</h2>
      {/* Aquí mapeas tus postulaciones */}
    </div>
  );
}

export default MainApplications;
