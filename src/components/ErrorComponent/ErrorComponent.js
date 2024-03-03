// Error.js
import React from "react";
import styles from "./ErrorComponent.module.css";

const ErrorComponent = ({ message, onClose }) => {
  return (
    <div className={styles.error}>
      <span>{message ? message : "Error"}</span>
      <button className={styles.closeButton} onClick={onClose}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
};

export default ErrorComponent;
