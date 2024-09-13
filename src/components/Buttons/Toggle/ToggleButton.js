// Toggle.js

import React from "react";
import styles from "./ToggleButton.module.css";

const ToggleButton = ({ isOn, handleToggle, data }) => {
  return (
    <label className={styles.switch}>
      <input
        type="checkbox"
        checked={isOn}
        onChange={(e) => handleToggle(data)}
      />
      <span className={styles.slider}></span>
    </label>
  );
};

export default ToggleButton;
