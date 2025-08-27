import React from "react";
import LeftPanel from "../components/LeftPanel";
import RightPanel from "../components/RightPanel";
import "../css/Registro.css";

function Registro() {
  return (
    <div className="container">
      <LeftPanel />
      <RightPanel />
    </div>
  );
}

export default Registro;