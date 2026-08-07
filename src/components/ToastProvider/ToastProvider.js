import React from "react";
import useKeydown from "../../hooks/use-keydown";

export const ToastContext = React.createContext();
function ToastProvider({ children }) {
  const [message, setMessage] = React.useState("");
  const [variant, setVariant] = React.useState("notice");
  const [toasts, setToasts] = React.useState([]);
  const [isAutoRemove, setIsAutoRemove] = React.useState(false);
  const [removeDuration, setRemoveDuration] = React.useState(3);

  const addToast = React.useCallback((toastMessage, toastVariant) => {
    const newToastInfo = {
      message: toastMessage,
      variant: toastVariant,
      id: crypto.randomUUID(),
    };
    setToasts((currToasts) => [...currToasts, newToastInfo]);
  }, []);

  const removeToast = React.useCallback((toastId) => {
    setToasts((currToasts) => currToasts.filter((item) => item.id !== toastId));
  }, []);

  // dismiss all toasts by clicking Esc key
  const handleDismissAll = React.useCallback(() => {
    setToasts([]);
  }, []);

  useKeydown("Escape", handleDismissAll);

  const contextProps = {
    toasts,
    addToast,
    removeToast,
    message,
    setMessage,
    variant,
    setVariant,
    isAutoRemove,
    setIsAutoRemove,
    removeDuration,
    setRemoveDuration,
  };

  return (
    <ToastContext.Provider value={contextProps}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
