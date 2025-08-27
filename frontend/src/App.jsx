  import { Routes, Route } from "react-router-dom";
  import Navbar from "./components/Navbar";
  import Hero from "./components/Hero";
  import About from "./components/About";
  import Oportunidades from "./components/Oportunidades";
  import ConocerMas from "./components/ConocerMas";
  import Contactanos from "./components/Contactanos";
  import Registro from "./pages/Registro";

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
        </Routes>
      </>
    );
  }

  export default App;