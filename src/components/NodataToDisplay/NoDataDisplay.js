// NoDataDisplay.js

import React from "react";
import styles from "./NoDataDisplay.module.css";

const NoDataDisplay = ({ message }) => {
  return (
    <div className={styles.container}>
      <p>{message ? message : "No data to display"}</p>
    </div>
  );
};

export default NoDataDisplay;
