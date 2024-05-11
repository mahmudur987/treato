import React, { useState } from "react";
import styles from "./FilterSection.module.css";
import CustomSelect4 from "../../../../../Select/CustomeSelect4/CustomSelect4";
import { MdOutlineGridView } from "react-icons/md";
import { IoMenu } from "react-icons/io5";
const PaymentStatus = ["City", "Division", "State"];
const PaymentDate = ["Date", "Name"];
const FilterSection = ({ viewBy, setViewBy, count }) => {
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState("City ");
  const [selectedPaymentDate, setSelectedPaymentDate] = useState("Sort By");
  return (
    <div className={styles.mainContainer}>
      <div className={styles.searchWrapper}>
        <h3>All Salons ({count})</h3>
      </div>
      <div className={styles.Wrapper}>
        <div onClick={() => setViewBy((pre) => !pre)} className={styles.viewBy}>
          <button className={viewBy ? styles.active : styles.notActive}>
            <MdOutlineGridView />
          </button>
          <button className={!viewBy ? styles.active : styles.notActive}>
            <IoMenu />
          </button>
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
    </div>
  );
};

export default FilterSection;
