import React, { memo, useContext, useEffect, useMemo, useState } from "react";
import styles from "./FilterSection.module.css";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineFileDownload } from "react-icons/md";

import CustomSelect4 from "../../../../Select/CustomeSelect4/CustomSelect4";
import { reportContext } from "../../../../../pages/partnerPages/Reports/Reports";
import axiosInstance from "../../../../../services/axios";
import { toast } from "react-toastify";

const DaysOptions = [
  "Last 1 year",
  "Last 7 days",
  "Last 30 days",
  "Last 3 months",
  "All Time",
];
const StatusOptions = ["Upcoming", "Completed", "Cancelled", "no-show", "All"];
const BookingTypeOptions = ["Online ", "On-site", "All"];
const FilterSection = ({ setAppointmentsQuery, data }) => {
  const { commonSearch, setATransactionId, selectedItems } =
    useContext(reportContext);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState(null);
  const [selectedDays, setSelectedDays] = useState("Last 1 Year");
  const [day, setDay] = useState(365);
  const [selectedStatus, setSelectedStatus] = useState("Status");
  const [selectedBookingType, setSelectedBookingType] =
    useState("Booking Type");
  const [name, setName] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchText(value);

    // Regular expression to match a transaction ID pattern (adjust as needed)
    const transactionIdPattern = /\b\w{24}\b/; // Example: 16 alphanumeric characters

    // Extract transaction ID
    const transactionIdMatch = value.match(transactionIdPattern);
    console.log(transactionIdMatch);
    if (transactionIdMatch) {
      setATransactionId(transactionIdMatch[0]);

      // Extract name by removing the transaction ID from input
      setName(value.replace(transactionIdMatch[0], "").trim());
    } else {
      setATransactionId("");
      setName(value.trim());
    }
  };

  useEffect(() => {
    if (selectedDays === "Last 7 days") {
      setDay(7);
    }
    if (selectedDays === "Last 30 days") {
      setDay(30);
    }
    if (selectedDays === "Last 3 months") {
      setDay(90);
    }
    if (selectedDays === "Last 1 year") {
      setDay(365);
    }
  }, [selectedDays]);

  const appointmentsQuery = useMemo(() => {
    return (
      (day !== "All Time" ? `days=${day}` : "") +
      (selectedStatus !== "Status" && selectedStatus !== "All"
        ? `&status=${selectedStatus.toLowerCase()}`
        : "") +
      (selectedBookingType !== "Booking Type" && selectedBookingType !== "All"
        ? `&bookingType=${selectedBookingType.toLowerCase()}`
        : "") +
      (name ? `&search=${name}` : "") +
      (commonSearch ? `&search=${commonSearch}` : "")
    );
  }, [day, selectedBookingType, selectedStatus, name, commonSearch]);

  useEffect(() => {
    setAppointmentsQuery(appointmentsQuery);
  }, [appointmentsQuery, setAppointmentsQuery]);

  let downloadItem = data?.data?.filter((x) => {
    return selectedItems.includes(x?.transactionId);
  });

  const downloadCSV = (data) => {
    // Flatten data
    const flattenedData = data?.map((entry) => ({
      dateforService: entry.dateforService,
      status: entry.status,
      payment_mode: entry.payment_mode,
      service_name: entry.services.map((s) => s.service_name).join(", "),
      updatedAt: entry.updatedAt,
      offerDiscount: entry.offerDiscount,
      clientName: entry.clientName,
      clientEmail: entry.clientEmail,
      transactionId: entry.transactionId,
      stylist: entry.stylist,
      final_amount: entry.final_amount,
    }));

    // Create CSV string
    const headers = Object.keys(flattenedData[0]).join(",");
    const rows = flattenedData
      .map((row) =>
        Object.values(row)
          .map((value) => `"${value}"`) // Quote values to handle commas in text
          .join(",")
      )
      .join("\n");

    const csvString = `${headers}\n${rows}`;

    // Trigger download
    const blob = new Blob([csvString], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "AppointmentData.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownLoad = async () => {
    if (downloadItem.length > 0) {
      console.log("Download local ");
      downloadCSV(downloadItem);
    } else {
      try {
        setLoading(true);
        const headers = {
          token: localStorage.getItem("jwtToken"),
        };

        const { data } = await axiosInstance.post(
          `reports/generateAppointmentsFile?${appointmentsQuery}`,
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
            options={DaysOptions}
            onChange={setSelectedDays}
            value={selectedDays}
          />
          <CustomSelect4
            options={StatusOptions}
            onChange={setSelectedStatus}
            value={selectedStatus}
          />
          <CustomSelect4
            options={BookingTypeOptions}
            onChange={setSelectedBookingType}
            value={selectedBookingType}
          />
          <div className={styles.btnWrapper}>
            <button type="button" onClick={handleDownLoad} disabled={loading}>
              <span>{loading ? "Loading" : "Download"}</span>
              <span>
                <MdOutlineFileDownload />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;

export const MemoizedFilterSection1 = memo(FilterSection);
