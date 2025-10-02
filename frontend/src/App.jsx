import { Routes, Route } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';


import Home from "./pages/Home"
import Registro from "./pages/Registro";
import IniciarSesion from "./pages/IniciarSesion"


import EmployerDashboard from "./pages/Employer";
import EmployerOffers from "./pages/EmployerOffers";
import EmployerPostulaciones from "./pages/EmployerPostulaciones";
import EmployerResenas from "./pages/EmployerResenas";
import CompleteProfile from "./pages/CompleteProfile";
import EmployerHistorial from "./pages/EmployerHistorial";


import WorkerInicio from "./pages/WorkerInicio";
import WorkerOfertas from "./pages/WorkerOfertas";
import WorkerPostulaciones from "./pages/WorkerPostulaciones";
import WorkerResenas from "./pages/WorkerResenas";
import WorkerHistorial from "./pages/WorkerHistorial";


import AdminInicio from "./pages/Admin/adminInicio";
import UsersAdmin from "./components/Admin/Usuarios/UsersAdmin";


function App() {
  return (
    <>

      <Routes>
        <Route path="/" element={<Home/>}/>

        {/*Rutas employer*/}
        <Route path="/employer" element={<EmployerDashboard />} />
        <Route path="/employeroffers" element={<EmployerOffers />} />
        <Route path="/postulaciones" element={<EmployerPostulaciones />} />
        <Route path="/resenas" element={<EmployerResenas />} />
        <Route path="/profile" element={<CompleteProfile />} />
        <Route path="/historial" element={<EmployerHistorial />} />

        {/*Rutas worker*/}
        <Route path="/worker" element={<WorkerInicio />} />
        <Route path="/worker/ofertas" element={<WorkerOfertas />} />
        <Route path="/worker/postulaciones" element={<WorkerPostulaciones />} />
        <Route path="/worker/resenas" element={<WorkerResenas />} />
        <Route path="/worker/historial" element={<WorkerHistorial />} />

        {/*Rutas auth*/}
        <Route path="/registro" element={<Registro />} />
        <Route path="/iniciarsesion" element={<IniciarSesion />} />

        {/*Rutas admin*/}
        <Route path="/Admin" element={<AdminInicio />} />
        <Route path="/admin/usuarios" element={<UsersAdmin />} />

      

      </Routes>
    </>
  );
}

export default App;