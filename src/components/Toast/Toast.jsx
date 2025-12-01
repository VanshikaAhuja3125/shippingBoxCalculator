// Notification Service

import { useEffect } from 'react';
import { useToastContext } from '../../context/ToastContext';
import styles from './Toast.module.css';

const Toast = () => {
  const { toasts, removeToast } = useToastContext();

  // Auto-remove toast after duration
  useEffect(() => {
    const timers = toasts
      .filter((toast) => toast.autoClose)
      .map((toast) => {
        return setTimeout(() => {
          removeToast(toast.id);
        }, toast.duration || 3000);
      });

    // Cleanup timers on unmount or when toasts change
    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [toasts, removeToast]);

  if (toasts.length === 0) {
    return null;
  }

  return (
    <div className={styles.toastContainer}>
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`${styles.toast} ${styles[toast.type]}`}
          onClick={() => removeToast(toast.id)}
        >
          <div className={styles.toastContent}>
            <span className={styles.toastIcon}>
              {toast.type === 'success' && '✓'}
              {toast.type === 'error' && '✕'}
              {toast.type === 'info' && 'ℹ'}
            </span>
            <span className={styles.toastMessage}>{toast.message}</span>
          </div>
          <button
            className={styles.closeButton}
            onClick={(e) => {
              e.stopPropagation();
              removeToast(toast.id);
            }}
            aria-label="Close"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default Toast;

