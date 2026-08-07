import React from "react";
import {
  AlertOctagon,
  AlertTriangle,
  CheckCircle,
  Info,
  X,
} from "react-feather";

import VisuallyHidden from "../VisuallyHidden";
import { ToastContext } from "../ToastProvider";

import styles from "./Toast.module.css";

const ICONS_BY_VARIANT = {
  notice: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  error: AlertOctagon,
};

function Toast({ variant = "notice", toastId, children }) {
  const Icon = ICONS_BY_VARIANT[variant] || Info;
  const { removeToast, isAutoRemove, removeDuration } =
    React.useContext(ToastContext);

  React.useEffect(() => {
    if (!isAutoRemove) return;

    const timeoutId = setTimeout(() => {
      removeToast(toastId);
    }, removeDuration * 1000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isAutoRemove, removeDuration, toastId, removeToast]);

  return (
    <div className={`${styles.toast} ${styles[variant]}`}>
      <div className={styles.iconContainer}>
        <Icon size={24} />
      </div>
      <p className={styles.content}>
        <VisuallyHidden>{variant}</VisuallyHidden>
        {children}
      </p>
      <button
        className={styles.closeButton}
        onClick={() => removeToast(toastId)}
        aria-label="Dismiss message"
        aria-live="off"
      >
        <X size={24} />
      </button>
    </div>
  );
}

export default Toast;
