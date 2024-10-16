// ColorSelect.js

import React, { useState } from "react";
import styles from "./ColorSelect.module.css";

import icon from "../../../assets/svgs/icon (1).svg";

export const downArrow = icon;

const generateRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Function to generate an array of 10 random colors
const generateColorArray = () => {
  const colors = [];
  for (let i = 0; i < 10; i++) {
    colors.push(generateRandomColor());
  }
  return colors;
};
const options = [
  "#CEB739",
  "#DE6296",
  "#801A7F",
  "#B3B59C",
  "#111B1F",
  "#0D3FC0",
  "#D952DA",
  "#E5EF4D",
  "#EDE092",
  "#6a5acd",
  "#F12783",
  "#F12124",
  "#F18865",
];
const ColorSelect = ({ setColorCode, colorCode }) => {
  const [selectedColor, setSelectedColor] = useState(
    colorCode ? colorCode : options[0]
  );
  const [isOptionsVisible, setOptionsVisible] = useState(false);

  const handleColorChange = (color) => {
    setSelectedColor(color);
    setColorCode(color);
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
          {options.map((option, i) => (
            <div
              key={i}
              className={`${styles.option}`}
              onClick={() => handleColorChange(option)}
              style={{ backgroundColor: `${option}` }}
            ></div>
          ))}
        </div>
      )}

      <span>
        <img src={downArrow} alt="" />
      </span>
    </div>
  );
};

export default ColorSelect;
