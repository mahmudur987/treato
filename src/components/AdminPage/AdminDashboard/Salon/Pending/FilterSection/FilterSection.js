import React, { useState } from "react";
import styles from "./FilterSection.module.css";
import CustomSelect4 from "../../../../../Select/CustomeSelect4/CustomSelect4";
import { MdOutlineGridView } from "react-icons/md";
import { IoMenu } from "react-icons/io5";

const FilterSection = ({ viewBy, setViewBy, selectedSalon, count, value }) => {
  const { City, selectedCity, setSelectedCity, handleApprove } = value;


  const theViewModal =()=>{
    setViewBy((pre) => !pre)
  }
  return (
    <div className={styles.mainContainer}>
      <div className={styles.searchWrapper}>
        <h3>Pending ({count})</h3>
        <div className={styles.topButtonWrapper}>
          <button>
            Approve
            {selectedSalon.length > 0 ? (
              <span className={styles.selLength}>{selectedSalon.length}</span>
            ) : (
              "All"
            )}
          </button>
        </div>
      </div>
      <div className={styles.Wrapper}>
        <div onClick={theViewModal} className={styles.viewBy}>
          <button className={viewBy ? styles.active : styles.notActive}>
            <MdOutlineGridView />
          </button>
          <button className={!viewBy ? styles.active : styles.notActive}>
            <IoMenu />
          </button>
        </div>
        <div className={styles.selectsWrapper}>
          <CustomSelect4
            options={City}
            onChange={setSelectedCity}
            value={selectedCity}
          />
          <div className={styles.buttonWrapper}>
            <button type="button" onClick={handleApprove}>
              Approve
              {selectedSalon.length > 0 ? (
                <span style={{ marginLeft: "7px" }}>
                  {selectedSalon.length}
                </span>
              ) : (
                "All"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
