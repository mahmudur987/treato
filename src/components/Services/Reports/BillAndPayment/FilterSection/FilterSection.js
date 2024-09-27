import React, { useState } from "react";
import styles from "./FilterSection.module.css";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineFileDownload } from "react-icons/md";
import CustomSelect4 from "../../../../Select/CustomeSelect4/CustomSelect4";
const PaymentStatus = ["Paid", "Due", "Refunded"];
const PaymentMode = ["Cash", "Online Payment"];

const FilterSection = ({ setBillQuery }) => {
  const [selectedPaymentStatus, setSelectedPaymentStatus] =
    useState("Payment Status ");
  const [selectedPaymentMode, setSelectedPaymentMode] =
    useState("Payment Mode ");
  let url =
    "date=2024-07-16&status=started&mode=online&tranid=6645ec25779765f555b98a4d&name=rahul";
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
