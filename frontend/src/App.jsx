  import { Routes, Route } from "react-router-dom";
  import '@fortawesome/fontawesome-free/css/all.min.css';
  import Navbar from "./components/Navbar";
  import Hero from "./components/Hero";
  import About from "./components/About";
  import Oportunidades from "./components/Oportunidades";
  import ConocerMas from "./components/ConocerMas";
  import Contactanos from "./components/Contactanos";
  import Registro from "./pages/Registro";
  import IniciarSesion from "./pages/IniciarSesion"
  

  function App() {
    return (
      <>

        <Routes>
          <Route path="/" element={
            <>
              <Navbar />
              <Hero />
              <About />
              <Oportunidades />
              <ConocerMas />
              <Contactanos />
            </>
          } />

          <Route path="/registro" element={<Registro />} />
          <Route path="/iniciarsesion" element={<IniciarSesion />} />
        

        </Routes>
      </>
    );
  }

  export default App;