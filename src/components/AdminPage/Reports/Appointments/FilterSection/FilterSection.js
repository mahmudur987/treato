import React, { useState } from "react";
import styles from "./FilterSection.module.css";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineFileDownload } from "react-icons/md";
import CustomSelect4 from "../../../../Select/CustomeSelect4/CustomSelect4";

const DaysOptions = [
  "Last 7 days",
  "Last 30 days",
  "Last 3 months",
  "Last 1 year ",
  "All Time",
];
const StatusOptions = ["Booked", "Complete", "Cancelled", "No Show "];
const BookingTypeOptions = ["Offline/ Walk-in", "Online "];
const FilterSection = () => {
  const [selectedDays, setSelectedDays] = useState("last 7 days ");
  const [selectedStatus, setSelectedStatus] = useState("Status ");
  const [selectedBookingType, setSelectedBookingType] =
    useState("Booking Type ");

  return (
    <div className={styles.mainContainerWrapper}>
      <div className={styles.mainContainer}>
        <div className={styles.searchWrapper}>
          <span>
            <IoSearchOutline />
          </span>
          <input type="text" placeholder="Search by name or transaction ID" />
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
