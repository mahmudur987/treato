import React, { useEffect, useState } from "react";
import styles from "./FilterSection.module.css";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineFileDownload } from "react-icons/md";
import CustomSelect4 from "../../../../Select/CustomeSelect4/CustomSelect4";

const DaysOptions = [
  "Last 1 year",
  "Last 7 days",
  "Last 30 days",
  "Last 3 months",
  "All Time",
];
const StatusOptions = ["Upcoming", "Complete", "Cancelled", "No Show "];
const BookingTypeOptions = ["Online ", "On-site"];
const FilterSection = ({ setAppointmentsQuery }) => {
  const [searchText, setSearchText] = useState(null);
  const [selectedDays, setSelectedDays] = useState("Last 1 Year");
  const [day, setDay] = useState(365);
  const [selectedStatus, setSelectedStatus] = useState("Status");
  const [selectedBookingType, setSelectedBookingType] =
    useState("Booking Type");
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
    setAppointmentsQuery(
      `days=${day}&status=${
        selectedStatus === "Status" ? "upcoming" : selectedStatus.toLowerCase()
      }&bookingType=${
        selectedBookingType === "Booking Type"
          ? "on-site"
          : selectedBookingType.toLowerCase()
      }${searchText ? `&search=${searchText}` : ""}`
    );
  }, [day, selectedBookingType, selectedStatus, searchText]);
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
            onChange={(e) => setSearchText(e.target.value)}
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
