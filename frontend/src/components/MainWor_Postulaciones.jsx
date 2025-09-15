

export default function MainWor_Postulaciones({ idUsuario }) {
  // Ejemplo de postulaciones
  const postulaciones = [
    {
      id: 1,
      oferta: "Aseo en Oficina",
      estado: "En revisión",
      fecha: "10/09/2025",
    },
    {
      id: 2,
      oferta: "Cuidado de Niños",
      estado: "Aceptada",
      fecha: "05/09/2025",
    },
    {
      id: 3,
      oferta: "Paseador de Mascotas",
      estado: "Rechazada",
      fecha: "01/09/2025",
    },
  ];

  return (
    <main className="postulaciones-container">
      <h1 className="titulo">Mis Postulaciones</h1>
      <p className="subtitulo">
        Mostrando postulaciones del usuario con ID: {idUsuario}
      </p>
      <div className="postulaciones-grid">
        {postulaciones.map((post) => (
          <div key={post.id} className="postulacion-card">
            <h2>{post.oferta}</h2>
            <p>
              <strong>Estado:</strong> {post.estado}
            </p>
            <p>
              <strong>Fecha:</strong> {post.fecha}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
