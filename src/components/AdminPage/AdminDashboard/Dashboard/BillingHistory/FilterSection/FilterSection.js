import React, { useState } from "react";
import styles from "./FilterSection.module.css";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineFileDownload } from "react-icons/md";
import CustomSelect4 from "../../../../../Select/CustomeSelect4/CustomSelect4";
const PaymentStatus = ["Paid", "Due", "Refunded"];
const PaymentDate = ["Cash", "Online Payment"];

const FilterSection = () => {
  const [selectedPaymentStatus, setSelectedPaymentStatus] =
    useState("All Bookings ");
  const [selectedPaymentDate, setSelectedPaymentDate] =
    useState("October 2023");

  return (
    <div className={styles.mainContainer}>
      <div className={styles.searchWrapper}>
        <h3>Billing History</h3>
      </div>

      <div className={styles.selectsWrapper}>
        <CustomSelect4
          options={PaymentStatus}
          onChange={setSelectedPaymentStatus}
          value={selectedPaymentStatus}
        />
        <CustomSelect4
          options={PaymentDate}
          onChange={setSelectedPaymentDate}
          value={selectedPaymentDate}
        />
      </div>
    </div>
  );
};

export default FilterSection;
