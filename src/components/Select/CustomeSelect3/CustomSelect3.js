// CustomSelect.js
import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import styles from "./CusomeSelect3.module.css";
import { CiSearch } from "react-icons/ci";
import { downArrow } from "../ColorSelect/ColorSelect";
const CustomSelect3 = ({ options, onChange, value, setSearchText }) => {
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
    <div className={styles.selectWrapper} ref={selectRef}>
      <div className={styles.customSelect}>
        <div className={styles.selectHeader} onClick={handleToggle}>
          <p className={styles.headerItems}>
            <span className={styles.headerItem}>{value.name}</span>
            <span className={styles.headerItem2}>{value.email}</span>
          </p>
        </div>
        {isOpen && (
          <div className={styles.optionsContainer}>
            <div className={styles.searchClientWrapper}>
              <p className={styles.searchClient}>
                <span>
                  <CiSearch />
                </span>

                <input
                  name="search"
                  type="text"
                  placeholder="find client"
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </p>
            </div>

            {options.map((option, i) => (
              <div
                key={i}
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
        <img src={downArrow} alt="" />
      </span>
    </div>
  );
};

export default CustomSelect3;
