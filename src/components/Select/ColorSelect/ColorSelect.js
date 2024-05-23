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

      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M6 9L12 15L18 9"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
    </div>
  );
};

export default ColorSelect;
