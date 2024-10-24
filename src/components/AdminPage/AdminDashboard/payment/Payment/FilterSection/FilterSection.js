import React, { memo, useState } from "react";
import styles from "./FilterSection.module.css";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineFileDownload } from "react-icons/md";
import CustomSelect4 from "../../../../../Select/CustomeSelect4/CustomSelect4";

const FilterSection = ({ value }) => {
  const {
    selectedPaymentMode,
    setSelectedPaymentMode,
    selectedPaymentStatus,
    setSelectedPaymentStatus,
    PaymentMode,
    PaymentStatus,
  } = value;
  return (
    <div className={styles.mainContainerWrapper}>
      <div className={styles.mainContainer}>
        <div className={styles.searchWrapper}>
          <label htmlFor="search">
            <span>
              <IoSearchOutline />
            </span>
          </label>
          <input
            id="search"
            type="text"
            placeholder="Search by name or transaction ID"
            className={styles.input}
          />
        </div>

        <div className={styles.selectsWrapper}>
          <CustomSelect4
            options={PaymentStatus}
            onChange={setSelectedPaymentStatus}
            value={selectedPaymentStatus}
          />
          <CustomSelect4
            options={PaymentMode}
            onChange={setSelectedPaymentMode}
            value={selectedPaymentMode}
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
export const MemoizedFilterSection5 = memo(FilterSection);
