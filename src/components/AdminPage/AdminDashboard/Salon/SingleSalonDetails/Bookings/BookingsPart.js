import React, { useEffect, useState } from "react";
import styles from "./BookingsPart.module.css";
import FilterSection from "./FilterSection/FilterSection";
import BookingsPartTable from "./BookingsTable/BookingsPartTable";
import { useSalonDetailsBookings } from "../../../../../../services/superAdmin/Dashboard";
import LoadSpinner from "../../../../../LoadSpinner/LoadSpinner";
import ErrorComponent from "../../../../../ErrorComponent/ErrorComponent";
import { useParams } from "react-router-dom";
import NoDataDisplay from "../../../../../NodataToDisplay/NoDataDisplay";
import { useDispatch } from "react-redux";
import { updateAdminPage } from "../../../../../../redux/slices/AdminSlice";
// Filter function
function filterDataByStatusAndMonth(data, status, month) {
  return data
    ?.filter(
      (item) => status === "All" || item.booking_status === status.toLowerCase()
    )
    .filter((item) => {
      const appointmentMonth = new Date(item.appointment_date).toLocaleString(
        "default",
        { month: "long", year: "numeric" }
      );
      return appointmentMonth === month;
    });
}

export function generatePastMonths() {
  const months = [];
  let currentDate = new Date();

  // Loop for 12 months
  for (let i = 0; i < 12; i++) {
    // Get month and year
    let month = currentDate.toLocaleString("default", { month: "long" });
    let year = currentDate.getFullYear();

    // Add to array
    months.push(`${month} ${year}`);

    // Move to previous month
    currentDate.setMonth(currentDate.getMonth() - 1);
  }

  return months;
}

const BookingsPart = () => {
  const dispatch = useDispatch();
  let { id } = useParams();
  const BookingStatus = ["All", "Upcoming", "Complete", "Cancel"];
  const Month = generatePastMonths();
  const [selectedBookingStatus, setSelectedBookingStatus] = useState(
    BookingStatus[0]
  );
  const [selectedMonth, setSelectedMonth] = useState(Month[1]);
  const { data, isLoading, isError, error } = useSalonDetailsBookings(
    id,
    selectedBookingStatus
  );
  const filteredData = filterDataByStatusAndMonth(
    data?.data,
    selectedBookingStatus,
    selectedMonth
  );
  useEffect(() => {
    dispatch(updateAdminPage());
  }, [selectedMonth, selectedBookingStatus, data]);
  console.log(data?.data);
  const value = {
    Month,
    BookingStatus,
    selectedBookingStatus,
    setSelectedBookingStatus,
    selectedMonth,
    setSelectedMonth,
  };

  return (
    <section className={styles.mainContainer}>
      <FilterSection data={value} />

      {isLoading && <LoadSpinner />}

      {isError && <ErrorComponent message={error ? error.message : "Error"} />}
      {data && !isLoading && !isError && filteredData?.length > 0 && (
        <BookingsPartTable data={filteredData} />
      )}
      {data && !isLoading && !isError && filteredData?.length === 0 && (
        <NoDataDisplay />
      )}
    </section>
  );
};

export default BookingsPart;
