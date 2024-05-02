import React, { useState } from "react";
import styles from "./FilterSection.module.css";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineFileDownload } from "react-icons/md";
import CustomSelect4 from "../../../../../../Select/CustomeSelect4/CustomSelect4";

const PaymentStatus = ["Paid", "Due", "Refunded"];
const PaymentMode = ["Cash", "Online Payment"];

const FilterSection = () => {
  const [selectedPaymentStatus, setSelectedPaymentStatus] =
    useState(" Status ");
  const [selectedPaymentMode, setSelectedPaymentMode] =
    useState("Payment Mode ");
  const [date, setDate] = useState("October 2023");
  return (
    <div className={styles.mainContainerWrapper}>
      <div className={styles.mainContainer}>
        <div className={styles.Wrapper}>
          <h3>Billing History</h3>
        </div>

        <div className={styles.selectsWrapper}>
          <CustomSelect4
            options={PaymentStatus}
            onChange={setSelectedPaymentStatus}
            value={date}
          />
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
