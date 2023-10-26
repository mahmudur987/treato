import React from "react";
import styles from "./LoadSpinner.module.css";
import { LoadSpinnerIcon } from "../../assets/images/icons";
const LoadSpinner = () => {
  return (
    <div className={styles.loaderContainer}>
      <img
        src={LoadSpinnerIcon} // Replace with the actual path to your SVG file
        alt="Loading Spinner"
        className={styles.spinner}
      />
    </div>
  );
};

export default LoadSpinner;
