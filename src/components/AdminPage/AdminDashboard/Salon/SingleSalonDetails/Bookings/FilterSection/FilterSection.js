import React, { useState } from "react";
import styles from "./FilterSection.module.css";
import CustomSelect4 from "../../../../../../Select/CustomeSelect4/CustomSelect4";

const FilterSection = ({ data }) => {
  const {
    Month,
    BookingStatus,
    selectedBookingStatus,
    setSelectedBookingStatus,
    selectedMonth,
    setSelectedMonth,
  } = data;
  return (
    <div className={styles.mainContainer}>
      <div className={styles.searchWrapper}>
        <h3>Bookings</h3>
      </div>

      <div className={styles.selectsWrapper}>
        <CustomSelect4
          options={BookingStatus}
          onChange={setSelectedBookingStatus}
          value={selectedBookingStatus}
        />
        <CustomSelect4
          options={Month}
          onChange={setSelectedMonth}
          value={selectedMonth}
        />
      </div>
    </div>
  );
};

export default FilterSection;
