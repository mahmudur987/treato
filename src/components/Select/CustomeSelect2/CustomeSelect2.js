// CustomSelect.js
import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import styles from "./CustomeSelect2.module.css";
import { useLocation } from "react-router-dom";
import { downArrow } from "../ColorSelect/ColorSelect";

const CustomSelect2 = ({ options, onChange, value, teamMembers }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
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
    <div className={styles.selectWrapper} ref={selectRef}>
      <div className={styles.customSelect}>
        <div className={styles.selectHeader} onClick={handleToggle}>
          {options && (
            <p
              className={styles.wrapper}
              style={{
                fontSize: `${
                  pathname === "/partner/dashboard/addappoinment" ||
                  "partner/dashboard"
                    ? "16px"
                    : ""
                }`,
              }}
            >
              {value}
            </p>
          )}
          {teamMembers && (
            <p
              className={styles.wrapper}
              style={{
                fontSize: `${
                  pathname === "/partner/dashboard/addappoinment" ||
                  "partner/dashboard"
                    ? "16px"
                    : ""
                }`,
              }}
            >
              <img loading="lazy" src={value?.imageUrl} alt="" />
              <span>{value?.name}</span>
            </p>
          )}
        </div>
        {isOpen && (
          <div
            style={{ backgroundColor: "white" }}
            className={styles.optionsContainer}
          >
            {options?.map((option, i) => (
              <div
                key={i}
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
                  <img loading="lazy" src={option?.imageUrl} alt="" />
                  <span>{option?.name}</span>
                </p>
              </div>
            ))}
          </div>
        )}
        {isOpen && <div className={styles.backgroundOverlay}></div>}
      </div>
      <span className={styles.icon} onClick={handleToggle}>
        <img src={downArrow} alt="" />
      </span>
    </div>
  );
};

export default CustomSelect2;
