import React from "react";
import RegistroPanel from "../components/RegistroPanel";
import InformacionFormulario from "../components/InformacionFormularios";
import '../css/container.css'

function Registro() {
  return (
    <div className="container">
      <RegistroPanel/>
      <InformacionFormulario/>
    </div>
  );
}

export default Registro;