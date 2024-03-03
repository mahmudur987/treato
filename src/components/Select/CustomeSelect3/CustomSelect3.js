// CustomSelect.js
import React, { useState } from "react";
import classNames from "classnames";
import styles from "./CusomeSelect3.module.css";
import { CiSearch } from "react-icons/ci";
const CustomSelect3 = ({ options, onChange, value }) => {
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
          <p className={styles.headerItems}>
            <span className={styles.headerItem}>{value.name}</span>
            <span className={styles.headerItem2}>{value.email}</span>
          </p>
        </div>
        {isOpen && (
          <div className={styles.optionsContainer}>
            <p className={styles.searchClient}>
              <span>
                <CiSearch />
              </span>

              <input name="search" type="text" placeholder="find client" />
            </p>

            {options.map((option) => (
              <div
                key={option}
                className={classNames(styles.option, {
                  [styles.selected]: option === value,
                })}
                onClick={() => handleSelect(option)}
              >
                <p>{option.name}</p>
                <span>{option.email}</span>
              </div>
            ))}
          </div>
        )}
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

export default CustomSelect3;
