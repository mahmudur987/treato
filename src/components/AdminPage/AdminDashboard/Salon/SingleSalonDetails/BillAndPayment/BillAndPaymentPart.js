import React, { useState } from "react";
import styles from "./BillAndPaymentPart.module.css";
import FilterSection from "./FilterSection/FilterSection";
import BillAndPaymentPartTable from "./BillAndPaymentTable/BillAndPaymentsTable";
import Commission from "./Commission/Commission";
import { generatePastMonths } from "../Bookings/BookingsPart";
import { useParams } from "react-router-dom";
import { useSalonBillAndPayment } from "../../../../../../services/superAdmin/Dashboard";
import LoadSpinner from "../../../../../LoadSpinner/LoadSpinner";
import ErrorComponent from "../../../../../ErrorComponent/ErrorComponent";
import NoDataDisplay from "../../../../../NodataToDisplay/NoDataDisplay";
function filterDataByStatusAndMonth(data, month) {
  return data?.filter((item) => {
    const appointmentMonth = new Date(item.appointmentDate).toLocaleString(
      "default",
      { month: "long", year: "numeric" }
    );

    console.log(appointmentMonth, month);

    return appointmentMonth === month;
  });
}
const BillAndPaymentPart = () => {
  const PaymentStatus = ["Complete", "Upcoming", "All"];
  const PaymentMode = ["On-site", "Online", "All"];
  const month = generatePastMonths();
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState("Status");
  const [selectedPaymentMode, setSelectedPaymentMode] =
    useState("Payment Mode");
  const [date, setDate] = useState(month[1]);
  const { id } = useParams();

  let filter = `id=${id}`;

  if (selectedPaymentMode !== "All" && selectedPaymentMode !== "Payment Mode") {
    filter += `&mode=${selectedPaymentMode.toLocaleLowerCase()}`;
  }

  if (selectedPaymentStatus !== "All" && selectedPaymentStatus !== "Status") {
    filter += `&status=${selectedPaymentStatus.toLocaleLowerCase()}`;
  }

  const { data, isLoading, isError, error } = useSalonBillAndPayment(filter);

  // console.log(data?.data);

  const value = {
    PaymentStatus,
    PaymentMode,
    month,
    selectedPaymentStatus,
    setSelectedPaymentStatus,
    selectedPaymentMode,
    setSelectedPaymentMode,
    date,
    setDate,
  };
  const filteredData = filterDataByStatusAndMonth(data?.data, date);

  console.log(filteredData);
  return (
    <section className={styles.mainContainer}>
      <Commission />
      <FilterSection value={value} />

      {isLoading && <LoadSpinner />}
      {isError && <ErrorComponent />}

      {data && !isLoading && !isError && data?.data?.length > 0 && (
        <BillAndPaymentPartTable data={filteredData} />
      )}
      {data && !isLoading && !isError && data?.data?.length === 0 && (
        <NoDataDisplay />
      )}
    </section>
  );
};

export default BillAndPaymentPart;
