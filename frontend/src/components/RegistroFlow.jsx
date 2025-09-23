import React, { useState } from "react";
import RegistroPanel from "./RegistroPanel";
import RegistroFoto from "./RegistroFoto";
import ConfirmacionEmail from "./ConfirmacionEmail";

function RegistroFlow() {
  const [step, setStep] = useState(1);       // Paso actual
  const [userId, setUserId] = useState(null); // Guardamos id_usuario del backend
  const [userEmail, setUserEmail] = useState(""); // ⚡ Guardamos correo aquí

  return (
    <div>
      {/* Paso 1: Registro básico */}
      {step === 1 && (
        <RegistroPanel
          onNext={(id, email) => {
            setUserId(id);
            setUserEmail(email?.trim() || ""); // ⚡ aseguramos que sea string
            setStep(2);
          }}
        />
      )}

      {/* Paso 2: Foto y descripción */}
      {step === 2 && (
        <RegistroFoto
          userId={userId}     
          onNext={() => setStep(3)} 
        />
      )}

      {/* Paso 3: Confirmación de correo */}
      {step === 3 && userEmail ? ( // ⚡ Solo renderiza si email está definido
        <ConfirmacionEmail email={userEmail} />
      ) : (
        <p>❌ No se pudo cargar la confirmación de correo.</p>
      )}
    </div>
  );
}

export default RegistroFlow;
