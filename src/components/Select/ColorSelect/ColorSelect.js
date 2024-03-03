// ColorSelect.js

import React, { useState } from "react";
import styles from "./ColorSelect.module.css";

const ColorSelect = () => {
  const [selectedColor, setSelectedColor] = useState("yellow");
  const [isOptionsVisible, setOptionsVisible] = useState(false);
  const options = [
    { label: "Red", color: "#FF0000" },
    { label: "Red", color: "#FF0000" },
    { label: "Green", color: "#00FF00" },
    { label: "Green", color: "#00FF00" },
    { label: "Green", color: "#00FF00" },
    { label: "Green", color: "#00FF00" },
    { label: "Blue", color: "#0000FF" },
    { label: "Blue", color: "#0000FF" },
    { label: "Blue", color: "#0000FF" },
    { label: "Blue", color: "#0000FF" },
  ];
  const handleColorChange = (color) => {
    setSelectedColor(color);
    setOptionsVisible(false);
  };

  const toggleOptionsVisibility = () => {
    setOptionsVisible(!isOptionsVisible);
  };

  return (
    <div className={styles.colorSelect} onClick={toggleOptionsVisibility}>
      <div
        className={styles.selectedColor}
        style={{ backgroundColor: selectedColor }}
      ></div>
      {isOptionsVisible && (
        <div className={styles.optionsContainer}>
          {options.map((option) => (
            <div
              key={option.color}
              className={`${styles.option}`}
              onClick={() => handleColorChange(option.color)}
              style={{ backgroundColor: `${option.color}` }}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorSelect;
