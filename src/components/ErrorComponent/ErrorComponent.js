// Error.js
import React from "react";
import styles from "./ErrorComponent.module.css";
import img1 from "../../assets/svgs/icon (12).svg";
const ErrorComponent = ({ message, onClose }) => {
  return (
    <div className={styles.error}>
      <span>{message ? message : "Error"}</span>
      <button className={styles.closeButton} onClick={onClose}>
        <img src={img1} alt="" />
      </button>
    </div>
  );
};

export default ErrorComponent;
