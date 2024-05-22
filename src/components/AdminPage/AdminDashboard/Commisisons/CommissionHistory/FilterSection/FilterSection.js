import React, { useState } from "react";
import styles from "./FilterSection.module.css";
import { GoDownload } from "react-icons/go";
import CustomSelect4 from "../../../../../Select/CustomeSelect4/CustomSelect4";

const FilterSection = ({ value }) => {
  const {
    PaymentStatus,
    PaymentDate,
    selectedPaymentDate,
    setSelectedPaymentDate,
    selectedPaymentStatus,
    setSelectedPaymentStatus,
  } = value;
  return (
    <div className={styles.mainContainer}>
      <div className={styles.searchWrapper}>
        <h3>Commission History</h3>
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
        <div className={styles.action}>
          <button>
            <span>Download</span>
            <GoDownload style={{ fontSize: "20px" }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
