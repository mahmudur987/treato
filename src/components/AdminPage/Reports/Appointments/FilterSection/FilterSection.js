import React, { useState } from "react";
import styles from "./FilterSection.module.css";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineFileDownload } from "react-icons/md";
import CustomSelect2 from "../../../../Select/CustomeSelect2/CustomeSelect2";
const FilterSection = () => {
  const [selectedDays, setSelectedDays] = useState("last 7 days ");
  const DaysOptions = ["Last 7 days", "last 30 days"];
  return (
    <div className={styles.mainContainer}>
      <div className={styles.searchWrapper}>
        <span>
          <IoSearchOutline />
        </span>
        <input type="text" placeholder="Search by name or transaction ID" />
      </div>

      <CustomSelect2
        options={DaysOptions}
        onChange={setSelectedDays}
        value={selectedDays}
      />
      <div className={styles.btnWrapper}>
        <button>
          Download
          <MdOutlineFileDownload />
        </button>
      </div>
    </div>
  );
};

export default FilterSection;
