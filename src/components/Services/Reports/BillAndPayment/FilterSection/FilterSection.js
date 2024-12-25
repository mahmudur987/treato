import React, { memo, useContext, useEffect, useMemo, useState } from "react";
import styles from "./FilterSection.module.css";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineFileDownload } from "react-icons/md";
import CustomSelect4 from "../../../../Select/CustomeSelect4/CustomSelect4";
import { reportContext } from "../../../../../pages/partnerPages/Reports/Reports";
import { toast } from "react-toastify";
import axiosInstance from "../../../../../services/axios";
const PaymentStatus = ["Upcoming", "Cancelled", "Completed", "Refunded", "All"];
const PaymentMode = ["offline", "Online", "on-site", "All"];
const downloadCSV = (data) => {
  if (!Array.isArray(data)) {
    console.error("Data is not an array. Please provide valid array data.");
    return;
  }

  // Helper function to escape values for CSV
  const escapeCSVValue = (value) => {
    if (value === null || value === undefined) return ""; // Handle null/undefined
    const stringValue = String(value); // Convert to string
    if (
      stringValue.includes(",") ||
      stringValue.includes('"') ||
      stringValue.includes("\n")
    ) {
      // Wrap with double quotes and escape existing double quotes
      return `"${stringValue.replace(/"/g, '""')}"`;
    }
    return stringValue;
  };

  // Helper function to convert JSON to CSV
  const convertToCSV = (data) => {
    const headers = [
      "Client Name",
      "Client Email",
      "Appointment Date",
      "Stylist Name",
      "Status",
      "Amount",
      "Payment Mode",
      "Paid On",
      "Overdue",
      "Tax",
      "Commission",
      "Invoice",
      "Transaction ID",
      "Service Name",
      "Price",
      "Time Taken by Service",
      "Is Suggested",
      "Available For",
      "Tax and Fees",
    ];

    // Add headers
    let csvRows = [headers.join(",")];

    // Process rows
    data.forEach((item) => {
      const {
        clientName,
        clientEmail,
        appointmentDate,
        stylistName,
        status,
        amount,
        paymentMode,
        paidOn,
        overdue,
        tax,
        comm,
        invoice,
        transactionId,
        serviceData,
      } = item;

      // For each service in serviceData, create a row
      serviceData.forEach((service) => {
        const row = [
          escapeCSVValue(clientName),
          escapeCSVValue(clientEmail),
          escapeCSVValue(appointmentDate),
          escapeCSVValue(stylistName),
          escapeCSVValue(status),
          escapeCSVValue(amount),
          escapeCSVValue(paymentMode),
          escapeCSVValue(paidOn),
          escapeCSVValue(overdue),
          escapeCSVValue(tax),
          escapeCSVValue(comm),
          escapeCSVValue(invoice),
          escapeCSVValue(transactionId),
          escapeCSVValue(service.service_name),
          escapeCSVValue(service.price),
          escapeCSVValue(service.time_takenby_service),
          escapeCSVValue(service.isSuggested),
          escapeCSVValue(service.availableFor),
          escapeCSVValue(service.taxAndFees),
        ];
        csvRows.push(row.join(","));
      });
    });

    return csvRows.join("\n");
  };

  const csvData = convertToCSV(data);

  // Create a Blob and a link element for downloading
  const blob = new Blob([csvData], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Billing History.csv";
  a.click();
  URL.revokeObjectURL(url);
};

const FilterSection = ({ setBillQuery, data }) => {
  const { commonSearch, setTransactionId, selectedRows } =
    useContext(reportContext);
  const [loading, setLoading] = useState(false);
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

  const billQuery = useMemo(() => {
    return `${
      selectedPaymentStatus !== "All" &&
      selectedPaymentStatus !== "Payment Status"
        ? `status=${selectedPaymentStatus.toLocaleLowerCase()}`
        : ""
    }${
      selectedPaymentMode !== "All" && selectedPaymentMode !== "Payment Mode"
        ? `&mode=${selectedPaymentMode.toLocaleLowerCase()}`
        : ""
    }${commonSearch || name ? `&search=${commonSearch || name}` : ""}`;
  }, [selectedPaymentStatus, selectedPaymentMode, commonSearch, name]);

  useEffect(() => {
    setBillQuery(billQuery);
  }, [billQuery, setBillQuery]);
  let downloadItem = data?.filter((x) => {
    return selectedRows.includes(x?.transactionId);
  });

  console.log(downloadItem);

  const handleDownLoad = async () => {
    if (downloadItem.length > 0) {
      downloadCSV(downloadItem);
    } else {
      try {
        setLoading(true);
        const headers = {
          token: localStorage.getItem("jwtToken"),
        };

        const { data } = await axiosInstance.post(
          `reports/generateSalonBillingFile?${billQuery}`,
          {},
          { headers }
        );

        if (data?.fileUrl) {
          // Create a link element to trigger the download
          const link = document.createElement("a");
          link.href = data.fileUrl;
          link.download = "schedules.csv"; // Set the filename for the downloaded file
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link); // Cleanup

          // Show success toast
          toast.success("CSV downloaded successfully!");
        } else {
          throw new Error("File URL not found in response.");
        }
      } catch (error) {
        // Show error toast
        toast.error("An error occurred while downloading the CSV.");
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }
  };

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
          <div className={styles.btnWrapper} onClick={handleDownLoad}>
            <button>{loading ? "Loading" : "Download"}</button>
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
