import React, { memo, useContext, useEffect, useMemo, useState } from "react";
import styles from "./FilterSection.module.css";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineFileDownload } from "react-icons/md";
import CustomSelect4 from "../../../../Select/CustomeSelect4/CustomSelect4";
import { reportContext } from "../../../../../pages/partnerPages/Reports/Reports";
import { toast } from "react-toastify";
import axiosInstance from "../../../../../services/axios";

const Options = ["Male", "Female", "All", "Non-binary", "Other"];
const FilterSection = ({ setClientsQuery }) => {
  const { commonSearch } = useContext(reportContext);
  const [selectedGender, setSelectedGender] = useState("Gender");
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const clientsQuery = useMemo(() => {
    return `${searchText ? `search=${searchText}` : ""}${
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
  }, [selectedGender, searchText, commonSearch]);

  useEffect(() => {
    setClientsQuery(clientsQuery);
  }, [clientsQuery, setClientsQuery]);

  const handleDownload = async () => {
    try {
      setLoading(true);
      const headers = {
        token: localStorage.getItem("jwtToken"),
      };

      const { data } = await axiosInstance.post(
        `reports/generateClientsFile?${clientsQuery}`,
        {},
        { headers }
      );

      if (data?.fileUrl) {
        // Create a link element to trigger the download
        const link = document.createElement("a");
        link.href = data.fileUrl;
        link.download = "schedules.csv"; // Set the filename for the downloaded file
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); // Cleanup

        // Show success toast
        toast.success("CSV downloaded successfully!");
      } else {
        throw new Error("File URL not found in response.");
      }
    } catch (error) {
      // Show error toast
      toast.error("An error occurred while downloading the CSV.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
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
              {loading ? "Loading" : "Download"}
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
