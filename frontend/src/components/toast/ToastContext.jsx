// src/components/toast/ToastContext.jsx
import { createContext } from "react";

const ToastContext = createContext({
  showToast: () => {}, // función por defecto
});

export default ToastContext;
