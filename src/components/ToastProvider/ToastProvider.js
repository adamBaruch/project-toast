import React from "react";

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

  React.useEffect(() => {
    const onEscKeydown = (event) => {
      if (event.code === "Escape") {
        setToasts([]);
      }
    };
    window.addEventListener("keydown", onEscKeydown);
    return () => {
      window.removeEventListener("keydown", onEscKeydown);
    };
  }, []);

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
