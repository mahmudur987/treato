import React, { useState } from "react";
import styles from "./FilterSection.module.css";

import CustomSelect4 from "../../../../../Select/CustomeSelect4/CustomSelect4";
import { Link } from "react-router-dom";

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
        <Link to={"/admin/commission"} className={styles.action}>
          <button>Set Commission %</button>
        </Link>
      </div>
    </div>
  );
};

export default FilterSection;
