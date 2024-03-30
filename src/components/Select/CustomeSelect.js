// CustomSelect.js
import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import styles from "./customeSelect.module.css";

const CustomSelect = ({ options, onChange, value }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (selectedValue) => {
    onChange(selectedValue);
    setIsOpen(false);
  };

  return (
    <div className={styles.customSelect} ref={selectRef}>
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
      {isOpen && <div className={styles.backgroundOverlay}></div>}
    </div>
  );
};

export default CustomSelect;
