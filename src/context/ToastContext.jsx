// Toast Context - Notification State Management

import { createContext, useContext, useState } from 'react';

const ToastContext = createContext();

export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToastContext must be used within ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'info', duration = 3000, autoClose = true) => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    
    const newToast = {
      id,
      message,
      type,
      duration,
      autoClose,
    };

    setToasts((prevToasts) => [...prevToasts, newToast]);

    return id;
  };

  const removeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  const clearAllToasts = () => {
    setToasts([]);
  };

  const value = {
    toasts,
    showToast,
    removeToast,
    clearAllToasts,
  };

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
};

