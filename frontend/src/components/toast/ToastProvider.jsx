// src/components/toast/ToastProvider.jsx
import React, { useState, useCallback } from "react";
import ToastContext from "./ToastContext";
import Toast from "./Toast";

export default function ToastProvider({ children }) {
  const [toast, setToast] = useState({ message: "", type: "" });

  const showToast = useCallback((message, type = "info") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast({ message: "", type: "" });
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast message={toast.message} type={toast.type} />
    </ToastContext.Provider>
  );
}
