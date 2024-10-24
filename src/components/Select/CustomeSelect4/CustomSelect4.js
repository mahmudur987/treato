// CustomSelect.js
import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import styles from "./CustomSelect4.module.css";
import { downArrow } from "../ColorSelect/ColorSelect";

const CustomSelect4 = ({ options, onChange, value, teamMembers }) => {
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
    <div
      className={styles.selectWrapper}
      ref={selectRef}
      onClick={handleToggle}
    >
      <div className={styles.customSelect}>
        <div className={styles.selectHeader}>
          {options && <p className={styles.wrapper}>{value === "no-show" ? "No-Show" : value}</p>}
          {teamMembers && (
            <p className={styles.wrapper}>
              <img loading="lazy" src={value?.imageUrl} alt="" />
              <span>{value?.name}</span>
            </p>
          )}
        </div>
        {isOpen && (
          <div className={styles.optionsContainer}>
            {options?.map((option) => (
              <div
                key={option}
                className={classNames(styles.option, {
                  [styles.selected]: option === value,
                })}
                onClick={() => handleSelect(option)}
              >
                {option === "no-show" ? "No-Show" : option}
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
                  <img loading="lazy" src={option?.imageUrl} alt="" />
                  <span>{option?.name}</span>
                </p>
              </div>
            ))}
          </div>
        )}
        {isOpen && <div className={styles.backgroundOverlay}></div>}
      </div>
      <span className={styles.icon}>
        <img src={downArrow} alt="" />
      </span>
    </div>
  );
};

export default CustomSelect4;
