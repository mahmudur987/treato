// CustomSelect.js
import React, { useState } from "react";
import classNames from "classnames";
import styles from "./CustomeSelect2.module.css";

const CustomSelect2 = ({ options, onChange, value, teamMembers }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (selectedValue) => {
    onChange(selectedValue);
    setIsOpen(false);
  };

  return (
    <div className={styles.selectWrapper}>
      <div className={styles.customSelect}>
        <div className={styles.selectHeader} onClick={handleToggle}>
          {options && <p className={styles.wrapper}>{value}</p>}
          {teamMembers && (
            <p className={styles.wrapper}>
              <img src={value?.imageUrl} alt="" />
              <span>{value?.name}</span>
            </p>
          )}
        </div>
        {isOpen && (
          <div
            style={{ backgroundColor: "white" }}
            className={styles.optionsContainer}
          >
            {options?.map((option) => (
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
            {teamMembers?.map((option) => (
              <div
                key={option}
                className={classNames(styles.option, {
                  [styles.selected]: option === value,
                })}
                onClick={() => handleSelect(option)}
              >
                <p className={styles.wrapper}>
                  <img src={option?.imageUrl} alt="" />
                  <span>{option?.name}</span>
                </p>
              </div>
            ))}
          </div>
        )}
        {isOpen && <div className={styles.backgroundOverlay}></div>}
      </div>
      <span className={styles.icon}>
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

export default CustomSelect2;
