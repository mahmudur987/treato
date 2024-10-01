import React, { useState } from "react";
import styles from "./FilterSection.module.css";
import { GoDownload } from "react-icons/go";
import CustomSelect4 from "../../../../../Select/CustomeSelect4/CustomSelect4";
import { FaSearch } from "react-icons/fa";

const FilterSection = ({ value }) => {
  const {
    PaymentStatus,
    PaymentDate,
    selectedPaymentDate,
    setSelectedPaymentDate,
    selectedPaymentStatus,
    setSelectedPaymentStatus,
    setSearchText,
  } = value;
  return (
    <>
      <div className={styles.header}>
        <h3>Commission History</h3>
      </div>

      <div className={styles.mainContainer}>
        <div className={styles.searchWrapper}>
          <label htmlFor="search">
            <span>
              <FaSearch />
            </span>
          </label>
          <input
            id="search"
            type="text"
            placeholder="Search by name or transaction ID"
            className={styles.input}
            onChange={(e) => setSearchText(e.target.value)}
          />
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
              <GoDownload className={styles.goDownload} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSection;
