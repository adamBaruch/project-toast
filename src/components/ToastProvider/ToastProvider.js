import React from "react";

export const ToastContext = React.createContext();
function ToastProvider({ children }) {
  const [message, setMessage] = React.useState("");
  const [variant, setVariant] = React.useState("notice");
  const [toasts, setToasts] = React.useState([]);

  const addToast = () => {
    const newToastInfo = {
      message,
      variant,
      id: crypto.randomUUID(),
    };
    const newToastsList = [...toasts, newToastInfo];
    setToasts(newToastsList);
  };

  const removeToast = (toastId) => {
    const filteredToastsList = toasts.filter((item) => item.id !== toastId);
    setToasts(filteredToastsList);
  };

  React.useEffect(() => {
    const removeAllToasts = () => {
      setToasts([]);
    };

    window.addEventListener("keydown", (event) => {
      if (event.code === "Escape") {
        removeAllToasts();
      }
    });
    return () => {
      window.removeEventListener("keydown", removeAllToasts);
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
  };

  return (
    <ToastContext.Provider value={contextProps}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
