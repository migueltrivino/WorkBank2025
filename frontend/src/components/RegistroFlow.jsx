import React, { useState } from "react";
import RegistroPanel from "./RegistroPanel";
import RegistroFoto from "./RegistroFoto";
import ConfirmacionEmail from "./ConfirmacionEmail";

function RegistroFlow() {
  const [step, setStep] = useState(1);       // Paso actual
  const [userId, setUserId] = useState(null); // Guardamos id_usuario del backend
  const [userEmail, setUserEmail] = useState("");

  return (
    <div>
      {/* Paso 1: Registro básico */}
      {step === 1 && (
        <RegistroPanel
          onNext={(id, email) => {
            setUserId(id);
            setUserEmail(email);
            setStep(2);
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
      {step === 3 && <ConfirmacionEmail email={userEmail} />}
    </div>
  );
}

export default RegistroFlow;
