import React from "react";
import styles from "./LoadSpinner.module.css";
import { LoadSpinnerIcon } from "../../assets/images/icons";
const LoadSpinner = () => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        minHeight: "400px",
        margin: "auto",
      }}
      className={styles.loaderContainer}
    >
      <img loading="lazy"
        src={LoadSpinnerIcon} // Replace with the actual path to your SVG file
        alt="Loading Spinner"
        className={styles.spinner}
      />
    </div>
  );
};

export default LoadSpinner;
