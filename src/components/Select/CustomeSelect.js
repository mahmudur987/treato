// CustomSelect.js
import React, { useState } from "react";
import classNames from "classnames";
import styles from "./customeSelect.module.css";

const CustomSelect = ({ options, onChange, value }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (selectedValue) => {
    onChange(selectedValue);
    setIsOpen(false);
  };

  return (
    <div className={styles.customSelect}>
      <div className={styles.selectHeader} onClick={handleToggle}>
        <p>{value}</p>
      </div>
      {isOpen && (
        <div className={styles.optionsContainer}>
          {options.map((option) => (
            <div
              key={option}
              className={classNames(styles.option, {
                [styles.selected]: option === value,
              })}
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
