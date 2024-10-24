// components/ToastProvider.js
import React, { createContext, useContext, useState } from "react";
import Toast from "./Toast";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message) => {
    setToasts((prevToasts) => [...prevToasts, message]);
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.slice(1));
    }, 3000); // Affiche chaque toast pendant 3 secondes
  };

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      {toasts.map((message, index) => (
        <Toast key={index} message={message} />
      ))}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  return useContext(ToastContext);
};
