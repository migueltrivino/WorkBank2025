  import { Routes, Route } from "react-router-dom";
  import '@fortawesome/fontawesome-free/css/all.min.css'
  import Navbar from "./components/Navbar";
  import Hero from "./components/Hero";
  import About from "./components/About";
  import Oportunidades from "./components/Oportunidades";
  import ConocerMas from "./components/ConocerMas";
  import Contactanos from "./components/Contactanos";
  import Registro from "./pages/Registro";
  import EmployerDashboard from "./pages/Employer";


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
          <Route path="/registro" element={<Registro />} />
        </Routes>
      </>
    );
  }

  export default App;