import React, { useEffect, useState } from "react";
import styles from "./FilterSection.module.css";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineFileDownload } from "react-icons/md";
import CustomSelect4 from "../../../../Select/CustomeSelect4/CustomSelect4";

const Options = ["Male", "Female", "All"];
const FilterSection = ({ setClientsQuery }) => {
  const [selectedGender, setSelectedGender] = useState("Gender");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    let querystring = `${searchText && `email=${searchText}`}${
      searchText &&
      selectedGender !== "Gender" &&
      selectedGender !== "All" &&
      "&"
    }${
      selectedGender !== "Gender" && selectedGender !== "All"
        ? `gender=${selectedGender.toLowerCase()}`
        : ""
    }`;

    setClientsQuery(querystring);
  }, [selectedGender, searchText]);
  return (
    <div className={styles.mainContainerWrapper}>
      <div className={styles.mainContainer}>
        <div className={styles.searchWrapper}>
          <span>
            <IoSearchOutline />
          </span>
          <input
            type="text"
            placeholder="Search by name or email"
            onChange={(e) => setSearchText(e.target.value)}
          />
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
