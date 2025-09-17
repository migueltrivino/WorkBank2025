import NavbarEmplo from "../components/NavbarEmplo";

function History() {
  const history = [
    { job: "Desarrollador Frontend", candidate: "Juan M.", date: "12/09/2025" },
    { job: "Diseñador UX/UI", candidate: "Ana G.", date: "05/09/2025" },
    { job: "Project Manager", candidate: "Luis F.", date: "28/08/2025" },
  ];

  return (
    <div className="flex">
      {/* Sidebar fijo */}
      <NavbarEmplo />

      {/* Contenido principal */}
      <div className="flex-1 p-8 bg-gradient-to-b from-blue-100 to-blue-200 min-h-screen">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Historial de Contrataciones</h1>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-3">Puesto</th>
                <th className="p-3">Candidato</th>
                <th className="p-3">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item, index) => (
                <tr key={index} className="border-b hover:bg-blue-50">
                  <td className="p-3">{item.job}</td>
                  <td className="p-3">{item.candidate}</td>
                  <td className="p-3">{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default History;

