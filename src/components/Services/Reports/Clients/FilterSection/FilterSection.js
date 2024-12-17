import React, { memo, useContext, useEffect, useMemo, useState } from "react";
import styles from "./FilterSection.module.css";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineFileDownload } from "react-icons/md";
import CustomSelect4 from "../../../../Select/CustomeSelect4/CustomSelect4";
import { reportContext } from "../../../../../pages/partnerPages/Reports/Reports";
import { toast } from "react-toastify";
import axiosInstance from "../../../../../services/axios";
const downloadCSV = (data) => {
  if (!Array.isArray(data)) {
    console.error("Data is not an array. Please provide valid array data.");
    return;
  }

  // Helper function to escape values for CSV
  const escapeCSVValue = (value) => {
    if (value === null || value === undefined) return ""; // Handle null/undefined
    const stringValue = String(value); // Convert to string
    if (
      stringValue.includes(",") ||
      stringValue.includes('"') ||
      stringValue.includes("\n")
    ) {
      // Wrap with double quotes and escape existing double quotes
      return `"${stringValue.replace(/"/g, '""')}"`;
    }
    return stringValue;
  };

  // Helper function to convert JSON to CSV
  const convertToCSV = (data) => {
    const headers = [
      "first_name",
      "last_name",

      "lastVisit",
      "fileurl",

      "email",
      "gender",
      "dob",
      "totalAmount",
    ];

    // Add headers
    let csvRows = [headers.join(",")];

    // Process rows
    data.forEach((item) => {
      const row = [
        escapeCSVValue(item.clientDetails?.first_name),
        escapeCSVValue(item.clientDetails?.last_name),

        escapeCSVValue(item.lastVisit),
        escapeCSVValue(item.fileurl),

        escapeCSVValue(item.clientDetails?.email),
        escapeCSVValue(item.clientDetails?.gender),
        escapeCSVValue(item.clientDetails?.dob),
        escapeCSVValue(item.totalAmount),
      ];
      csvRows.push(row.join(","));
    });

    return csvRows.join("\n");
  };

  const csvData = convertToCSV(data);

  // Create a Blob and a link element for downloading
  const blob = new Blob([csvData], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Clients.csv";
  a.click();
  URL.revokeObjectURL(url);
};
const Options = ["Male", "Female", "All", "Non-binary", "Other"];
const FilterSection = ({ setClientsQuery, data }) => {
  const { commonSearch, selectedClients } = useContext(reportContext);
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
  let downloadItem = data?.data?.filter((x) => {
    return selectedClients.includes(
      x?.clientDetails?.first_name + " " + x?.clientDetails?.last_name
    );
  });
  console.log(downloadItem, "downloadItem");

  const handleDownload = async () => {
    if (downloadItem.length > 0) {
      downloadCSV(downloadItem);
    } else {
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
