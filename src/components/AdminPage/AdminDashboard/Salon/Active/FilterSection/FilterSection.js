import React, { useState } from "react";
import styles from "./FilterSection.module.css";
import CustomSelect4 from "../../../../../Select/CustomeSelect4/CustomSelect4";
import { MdOutlineGridView } from "react-icons/md";
import { IoMdMenu } from "@react-icons/all-files/io/IoMdMenu";

const FilterSection = ({ viewBy, setViewBy, count, value }) => {
  const {
    City,
    selectedCity,
    setSelectedCity,
    SortBy,
    selectedSortBy,
    setSelectedSortBy,
  } = value;
  return (
    <div className={styles.mainContainer}>
      <div className={styles.searchWrapper}>
        <h3>All Salons ({count})</h3>
      </div>
      <div className={styles.Wrapper}>
        <div onClick={() => setViewBy((pre) => !pre)} className={styles.viewBy}>
          <button className={viewBy ? styles.active : styles.notActive}>
            <MdOutlineGridView />
          </button>
          <button className={!viewBy ? styles.active : styles.notActive}>
            <IoMdMenu />
          </button>
        </div>
        <div className={styles.selectsWrapper}>
          <CustomSelect4
            options={City}
            onChange={setSelectedCity}
            value={selectedCity}
          />
          <CustomSelect4
            options={SortBy}
            onChange={setSelectedSortBy}
            value={selectedSortBy}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
