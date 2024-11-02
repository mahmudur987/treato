import React, { memo, useContext, useEffect, useState } from "react";
import styles from "./FilterSection.module.css";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineFileDownload } from "react-icons/md";
import CustomSelect4 from "../../../../Select/CustomeSelect4/CustomSelect4";
import { reportContext } from "../../../../../pages/partnerPages/Reports/Reports";
const PaymentStatus = ["Upcoming", "Cancelled", "Completed", "Refunded", "All"];
const PaymentMode = ["offline", "Online", "on-site", "All"];

const FilterSection = ({ setBillQuery }) => {
  const { commonSearch, setTransactionId } = useContext(reportContext);
  const [selectedPaymentStatus, setSelectedPaymentStatus] =
    useState("Payment Status");
  const [selectedPaymentMode, setSelectedPaymentMode] =
    useState("Payment Mode");
  const [searchText, setSearchText] = useState("");

  const [name, setName] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchText(value);

    // Regular expression to match a transaction ID pattern (adjust as needed)
    const transactionIdPattern = /\b\w{24}\b/; // Example: 16 alphanumeric characters

    // Extract transaction ID
    const transactionIdMatch = value.match(transactionIdPattern);
    if (transactionIdMatch) {
      setTransactionId(transactionIdMatch[0]);

      // Extract name by removing the transaction ID from input
      setName(value.replace(transactionIdMatch[0], "").trim());
    } else {
      setTransactionId("");
      setName(value.trim());
    }
  };

  let url = `${
    selectedPaymentStatus !== "All" &&
    selectedPaymentStatus !== "Payment Status"
      ? `status=${selectedPaymentStatus.toLocaleLowerCase()}`
      : ""
  }${
    selectedPaymentMode !== "All" && selectedPaymentMode !== "Payment Mode"
      ? `&mode=${selectedPaymentMode.toLocaleLowerCase()}`
      : ""
  }${commonSearch || name ? `&name=${commonSearch || name}` : ""}`;

  useEffect(() => {
    setBillQuery(url);
  }, [url, setBillQuery]);

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
            onChange={handleInputChange}
          />
        </div>

        <div className={styles.selectsWrapper}>
          <CustomSelect4
            options={PaymentStatus}
            onChange={setSelectedPaymentStatus}
            value={
              selectedPaymentStatus ? selectedPaymentStatus : "Payment Status"
            }
          />
          <CustomSelect4
            options={PaymentMode}
            onChange={setSelectedPaymentMode}
            value={selectedPaymentMode ? selectedPaymentMode : "Payment Mode"}
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

export const MemoizedFilterSection3 = memo(FilterSection);
