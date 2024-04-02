// Toggle.js

import React from "react";
import styles from "./ToggleButton.module.css";

const ToggleButton = ({ isOn, handleToggle }) => {
  return (
    <label className={styles.switch}>
      <input type="checkbox" checked={isOn} onChange={handleToggle} />
      <span className={styles.slider}></span>
    </label>
  );
};

export default ToggleButton;
