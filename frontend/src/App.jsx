import { Routes, Route } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css'

// Componentes 
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Oportunidades from "./components/Oportunidades";
import ConocerMas from "./components/ConocerMas";
import Contactanos from "./components/Contactanos";

// Páginas
import Registro from "./pages/Registro";
import EmployerDashboard from "./pages/Employer";
import EmployerOffers from "./pages/EmployerOffers";

function App() {
  return (
    <Routes>
      {/*  principal */}
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

      {/* Rutas del empleador */}
      <Route path="/employer" element={<EmployerDashboard />} />
      <Route path="/misofertas" element={<EmployerOffers />} />

      {/* Registro */}
      <Route path="/registro" element={<Registro />} />
    </Routes>
  );
}

export default App;

