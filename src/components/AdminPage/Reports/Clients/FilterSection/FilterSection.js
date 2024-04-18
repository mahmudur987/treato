import React, { useState } from "react";
import styles from "./FilterSection.module.css";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineFileDownload } from "react-icons/md";
import CustomSelect4 from "../../../../Select/CustomeSelect4/CustomSelect4";

const Options = ["Male", "Female", "Every one"];
const FilterSection = () => {
  const [selectedGender, setSelectedGender] = useState("Gender");

  return (
    <div className={styles.mainContainerWrapper}>
      <div className={styles.mainContainer}>
        <div className={styles.searchWrapper}>
          <span>
            <IoSearchOutline />
          </span>
          <input type="text" placeholder="Search by name or email" />
        </div>

        <div className={styles.selectsWrapper}>
          <CustomSelect4
            options={Options}
            onChange={setSelectedGender}
            value={selectedGender}
          />

          <div className={styles.btnWrapper}>
            <button>Download</button>
            <span>
              <MdOutlineFileDownload />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
