// src/components/ConfirmacionEmail.jsx
import React, { useState, useRef, useEffect } from "react";
import styles from "../css/ConfirmacionEmail.module.css";
import useToast from "./toast/useToast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ConfirmacionEmail({ email }) {
  const [codigo, setCodigo] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0); // contador cooldown
  const { showToast } = useToast();
  const navigate = useNavigate();
  const inputsRef = useRef([]);

  // ⚡ Enviar código automáticamente al montar (usa resend-code)
  useEffect(() => {
    const sendInitialCode = async () => {
      try {
        await axios.post("http://localhost:4000/api/auth/resend-code", { email });
        showToast("📧 Código enviado a tu correo", "success");
      } catch (error) {
        showToast(
          `❌ Error al enviar el código: ${
            error.response?.data?.message || "Inténtalo más tarde"
          }`,
          "error"
        );
      }
    };
    if (email) sendInitialCode();
  }, [email]);

  useEffect(() => {
    let timer;
    if (resendCooldown > 0) {
      timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  // Cambio de cada celda
  const handleChange = (e, index) => {
    const val = e.target.value.toUpperCase().replace(/[^0-9A-Z]/g, "");
    const newCodigo = [...codigo];
    newCodigo[index] = val.slice(0, 1);
    setCodigo(newCodigo);
    if (val && index < 5) inputsRef.current[index + 1]?.focus();
  };

  // Backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !codigo[index] && index > 0) {
      const newCodigo = [...codigo];
      newCodigo[index - 1] = "";
      setCodigo(newCodigo);
      inputsRef.current[index - 1]?.focus();
    }
  };

  // Pegar código completo
  const handlePaste = (e) => {
    const pasteData = e.clipboardData
      .getData("text")
      .toUpperCase()
      .replace(/[^0-9A-Z]/g, "");
    if (pasteData.length === 6) {
      setCodigo(pasteData.split(""));
      inputsRef.current[5]?.focus();
    } else {
      showToast("❌ El código pegado debe tener 6 caracteres", "error");
    }
    e.preventDefault();
  };

  // Verificar código
  const handleVerify = async () => {
    const codeStr = codigo.join("");
    if (codeStr.length !== 6) {
      showToast("❌ El código debe tener 6 caracteres", "error");
      return;
    }

    try {
      setLoading(true);
      await axios.post("http://localhost:4000/api/auth/confirm-email", { correo: email, token: codeStr });
      showToast("✅ Correo confirmado correctamente!", "success");
      navigate("/iniciarsesion", { replace: true });
    } catch (error) {
      showToast(
        `❌ ${error.response?.data?.message || "Código incorrecto"}`,
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  // Reenviar código
  const handleResend = async () => {
    if (resendCooldown > 0) return;
    try {
      setResending(true);
      await axios.post("http://localhost:4000/api/auth/resend-code", { email });
      showToast("✅ Código reenviado correctamente!", "success");
      setResendCooldown(30); // 30 segundos de cooldown
    } catch (error) {
      showToast("❌ Error al reenviar el código", "error");
    } finally {
      setResending(false);
    }
  };

  // Animación inputs
  const handleFocus = (index) =>
    inputsRef.current[index]?.classList.add("active");
  const handleBlur = (index) =>
    inputsRef.current[index]?.classList.remove("active");

  return (
    <div className={styles["form-panel"]}>
      <h2 className={styles.title}>✅ Registro completado</h2>
      <p className={styles.text}>
        Hemos enviado un correo de confirmación a tu bandeja de entrada.
        Por favor, ingresa el código de verificación de 6 caracteres.
      </p>

      <div className={styles["code-inputs"]}>
        {codigo.map((value, index) => (
          <input
            key={index}
            ref={(el) => (inputsRef.current[index] = el)}
            type="text"
            value={value}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            maxLength={1}
            onFocus={() => handleFocus(index)}
            onBlur={() => handleBlur(index)}
            className={value ? styles["input-animated"] : ""}
          />
        ))}
      </div>

      <button
        className={styles.button}
        onClick={handleVerify}
        disabled={loading}
      >
        {loading ? "Verificando..." : "Verificar código"}
      </button>

      <button
        className={styles.button}
        onClick={handleResend}
        disabled={resending || resendCooldown > 0}
        style={{ backgroundColor: "#236AB9" }}
      >
        {resending
          ? "Reenviando..."
          : resendCooldown > 0
          ? `Reenviar código (${resendCooldown}s)`
          : "Reenviar código"}
      </button>

      <p className={styles.textSmall}>
        Si no encuentras el correo, revisa la carpeta de <strong>spam</strong> o{" "}
        <strong>correo no deseado</strong>.
      </p>
    </div>
  );
}

export default ConfirmacionEmail;
