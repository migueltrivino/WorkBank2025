import { Routes, Route } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { AuthProvider } from "./context/AuthContext";  


import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Oportunidades from "./components/Oportunidades";
import ConocerMas from "./components/ConocerMas";
import Contactanos from "./components/Contactanos";
import Registro from "./pages/Registro";
import IniciarSesion from "./pages/IniciarSesion"


import EmployerDashboard from "./pages/Employer";
import EmployerOffers from "./pages/EmployerOffers";
import EmployerPostulaciones from "./pages/EmployerPostulaciones";
import EmployerResenas from "./pages/EmployerResenas";
import CompleteProfile from "./pages/CompleteProfile";


import WorkerInicio from "./pages/WorkerInicio";
import WorkerOfertas from "./pages/WorkerOfertas";
import WorkerPostulaciones from "./pages/WorkerPostulaciones";


function App() {
  return (
    <>

      <Routes>
        <Route path="/" element={
          <>
            <Navbar />
            <Hero />
            <section id="about"><About /></section>
            <section id="oportunidades"><Oportunidades /></section>
            <ConocerMas />
            <section id="contacto"><Contactanos /></section>
          </>
        } />

        <Route path="/employer" element={<EmployerDashboard />} />
        <Route path="/misofertas" element={<EmployerOffers />} />
        <Route path="/postulaciones" element={<EmployerPostulaciones />} />
        <Route path="/resenas" element={<EmployerResenas />} />
        <Route path="/profile" element={<CompleteProfile />} />

        {/*Rutas auth*/}
        <Route path="/worker" element={<WorkerInicio />} />
        <Route path="/worker/ofertas" element={<WorkerOfertas />} />
        <Route path="/worker/postulaciones" element={<WorkerPostulaciones />} />

        {/*Rutas auth*/}
        <Route path="/registro" element={<Registro />} />
        <Route path="/iniciarsesion" element={<IniciarSesion />} />
      

      </Routes>
    </>
  );
}

export default App;