import React, { useState } from "react";
import RegistroPanel from "./RegistroPanel";
import RegistroFoto from "./RegistroFoto";
import ConfirmacionCorreo from "./ConfirmacionEmail";

function RegistroFlow() {
  const [step, setStep] = useState(1);       // Paso actual
  const [userId, setUserId] = useState(null); // Guardamos id_usuario del backend

  return (
    <div>
      {/* Paso 1: Registro básico */}
      {step === 1 && (
        <RegistroPanel
          onNext={(id) => {
            setUserId(id);  // ⚡ Guardamos userId
            setStep(2);     // Avanzamos al Paso 2
          }}
        />
      )}

      {/* Paso 2: Foto y descripción */}
      {step === 2 && (
        <RegistroFoto
          userId={userId}     // ⚡ Pasamos userId al componente
          onNext={() => setStep(3)} // Avanzamos al Paso 3
        />
      )}

      {/* Paso 3: Confirmación de correo */}
      {step === 3 && <ConfirmacionCorreo />}
    </div>
  );
}

export default RegistroFlow;
