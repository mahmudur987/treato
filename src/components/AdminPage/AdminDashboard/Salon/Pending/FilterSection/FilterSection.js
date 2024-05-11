import React, { useState } from "react";
import styles from "./FilterSection.module.css";
import CustomSelect4 from "../../../../../Select/CustomeSelect4/CustomSelect4";
import { MdOutlineGridView } from "react-icons/md";
import { IoMenu } from "react-icons/io5";
const Options = ["City", "Division", "State"];
const FilterSection = ({ viewBy, setViewBy, selectedSalon, count }) => {
  const [selectedOptions, setSelectedOptions] = useState("City ");
  return (
    <div className={styles.mainContainer}>
      <div className={styles.searchWrapper}>
        <h3>Pending ({count})</h3>
        <div className={styles.topButtonWrapper}>
          <button>
            Approve
            {selectedSalon.length > 0 ? (
              <span style={{ marginLeft: "7px" }}>{selectedSalon.length}</span>
            ) : (
              "All"
            )}
          </button>
        </div>
      </div>
      <div className={styles.Wrapper}>
        <div onClick={() => setViewBy((pre) => !pre)} className={styles.viewBy}>
          <button className={viewBy ? styles.active : styles.notActive}>
            <MdOutlineGridView />
          </button>
          <button className={!viewBy ? styles.active : styles.notActive}>
            <IoMenu />
          </button>
        </div>
        <div className={styles.selectsWrapper}>
          <CustomSelect4
            options={Options}
            onChange={setSelectedOptions}
            value={selectedOptions}
          />
          <div className={styles.buttonWrapper}>
            <button>
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
