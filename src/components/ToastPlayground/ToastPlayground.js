import React from "react";
import Button from "../Button";
import styles from "./ToastPlayground.module.css";
import ToastShelf from "../ToastShelf";
import { ToastContext } from "../ToastProvider";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

function ToastPlayground() {
  const {
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
  } = React.useContext(ToastContext);

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>
      {toasts.length > 0 && (
        <ToastShelf toasts={toasts} removeToast={removeToast} />
      )}
      <div className={styles.controlsWrapper}>
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: "baseline" }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              id="message"
              className={styles.messageInput}
              value={message}
              onChange={(event) => {
                setMessage(event.target.value);
              }}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            {VARIANT_OPTIONS.map((option) => (
              <label htmlFor={`variant-${option}`}>
                <input
                  id={`variant-${option}`}
                  type="radio"
                  name="variant"
                  value={option}
                  checked={variant === option}
                  onChange={(event) => {
                    setVariant(event.target.value);
                  }}
                />
                {option}
              </label>
            ))}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Auto-Remove</div>
          <div className={styles.radioWrapper}>
            <input
              type="checkbox"
              name="autoRemove"
              checked={isAutoRemove}
              onChange={(event) => {
                setIsAutoRemove(event.target.checked);
              }}
            />
            <div className={styles.numberInputWrapper}>
              <div
                className={`${styles.label} ${!isAutoRemove && styles.disabled}`}
              >
                Duration
              </div>
              <input
                type="number"
                disabled={!isAutoRemove}
                value={removeDuration}
                onChange={(event) => {
                  setRemoveDuration(event.target.value);
                }}
              />
            </div>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            <Button onClick={() => addToast(message, variant)}>
              Pop Toast!
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ToastPlayground;
