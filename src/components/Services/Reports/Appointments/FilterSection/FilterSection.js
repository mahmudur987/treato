import React, { memo, useContext, useEffect, useState } from "react";
import styles from "./FilterSection.module.css";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineFileDownload } from "react-icons/md";

import CustomSelect4 from "../../../../Select/CustomeSelect4/CustomSelect4";
import { reportContext } from "../../../../../pages/partnerPages/Reports/Reports";

const DaysOptions = [
  "Last 1 year",
  "Last 7 days",
  "Last 30 days",
  "Last 3 months",
  "All Time",
];
const StatusOptions = ["Upcoming", "Completed", "Cancelled", "no-show", "All"];
const BookingTypeOptions = ["Online ", "On-site", "offline", "All"];
const FilterSection = ({ setAppointmentsQuery }) => {
  const { commonSearch, setATransactionId } = useContext(reportContext);

  const [searchText, setSearchText] = useState(null);
  const [selectedDays, setSelectedDays] = useState("Last 1 Year");
  const [day, setDay] = useState(365);
  const [selectedStatus, setSelectedStatus] = useState("Status");
  const [selectedBookingType, setSelectedBookingType] =
    useState("Booking Type");
  const [name, setName] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchText(value);

    // Regular expression to match a transaction ID pattern (adjust as needed)
    const transactionIdPattern = /\b\w{24}\b/; // Example: 16 alphanumeric characters

    // Extract transaction ID
    const transactionIdMatch = value.match(transactionIdPattern);
    if (transactionIdMatch) {
      setATransactionId(transactionIdMatch[0]);

      // Extract name by removing the transaction ID from input
      setName(value.replace(transactionIdMatch[0], "").trim());
    } else {
      setATransactionId("");
      setName(value.trim());
    }
  };

  useEffect(() => {
    if (selectedDays === "Last 7 days") {
      setDay(7);
    }
    if (selectedDays === "Last 30 days") {
      setDay(30);
    }
    if (selectedDays === "Last 3 months") {
      setDay(90);
    }
    if (selectedDays === "Last 1 year") {
      setDay(365);
    }
  }, [selectedDays]);

  useEffect(() => {
    let x =
      (day !== "All Time" ? `days=${day}` : "") +
      (selectedStatus !== "Status" && selectedStatus !== "All"
        ? `&status=${selectedStatus.toLowerCase()}`
        : "") +
      (selectedBookingType !== "Booking Type" && selectedBookingType !== "All"
        ? `&bookingType=${selectedBookingType.toLowerCase()}`
        : "") +
      (name ? `&search=${name}` : "") +
      (commonSearch ? `&search=${commonSearch}` : "");

    setAppointmentsQuery(x);
  }, [
    day,
    selectedBookingType,
    selectedStatus,
    searchText,
    commonSearch,
    setAppointmentsQuery,
  ]);

  const handleDownLoad = () => {};

  return (
    <div className={styles.mainContainerWrapper}>
      <div className={styles.mainContainer}>
        <div className={styles.searchWrapper}>
          <span>
            <IoSearchOutline />
          </span>
          <input
            type="text"
            placeholder="Search by name or transaction ID"
            onChange={handleInputChange}
          />
        </div>

        <div className={styles.selectsWrapper}>
          <CustomSelect4
            options={DaysOptions}
            onChange={setSelectedDays}
            value={selectedDays}
          />
          <CustomSelect4
            options={StatusOptions}
            onChange={setSelectedStatus}
            value={selectedStatus}
          />
          <CustomSelect4
            options={BookingTypeOptions}
            onChange={setSelectedBookingType}
            value={selectedBookingType}
          />
          <div className={styles.btnWrapper}>
            <button type="button" onClick={handleDownLoad}>
              <span>Download</span>
              <span>
                <MdOutlineFileDownload />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;

export const MemoizedFilterSection1 = memo(FilterSection);
