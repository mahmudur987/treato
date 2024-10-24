import React, { memo, useContext, useEffect, useState } from "react";
import styles from "./FilterSection.module.css";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineFileDownload } from "react-icons/md";
import CustomSelect4 from "../../../../Select/CustomeSelect4/CustomSelect4";
import { reportContext } from "../../../../../pages/partnerPages/Reports/Reports";
import { toast } from "react-toastify";

const Options = ["Male", "Female", "All", "Non-binary", "Other"];
const FilterSection = ({ setClientsQuery }) => {
  const { commonSearch } = useContext(reportContext);
  const [selectedGender, setSelectedGender] = useState("Gender");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    let querystring = `${searchText ? `search=${searchText}` : ""}${
      commonSearch ? `search=${commonSearch}` : ""
    }${
      (searchText || commonSearch) &&
      selectedGender !== "Gender" &&
      selectedGender !== "All"
        ? "&"
        : ""
    }${
      selectedGender !== "Gender" && selectedGender !== "All"
        ? `gender=${selectedGender.toLowerCase()}`
        : ""
    }`;

    setClientsQuery(querystring);
  }, [selectedGender, searchText, setClientsQuery, commonSearch]);

  const handleDownload = () => {
    // Log the event if necessary for tracking purposes
    console.log("Download feature is currently under maintenance.");

    // Inform the user
    toast.info("This feature is under maintenance. Please check back later.");
  };

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
            <button type="button" onClick={handleDownload}>
              Download
            </button>
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
export const MemoizedFilterSection2 = memo(FilterSection);
