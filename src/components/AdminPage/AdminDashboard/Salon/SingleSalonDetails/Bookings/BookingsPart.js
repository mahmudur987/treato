import React from "react";
import styles from "./BookingsPart.module.css";
import FilterSection from "./FilterSection/FilterSection";
import BookingsPartTable from "./BookingsTable/BookingsPartTable";
import { useSalonDetailsBookings } from "../../../../../../services/superAdmin/Dashboard";
import LoadSpinner from "../../../../../LoadSpinner/LoadSpinner";
import ErrorComponent from "../../../../../ErrorComponent/ErrorComponent";
import { useParams } from "react-router-dom";
import NoDataDisplay from "../../../../../NodataToDisplay/NoDataDisplay";

const BookingsPart = () => {
  let { id } = useParams();
  const { data, isLoading, isError, error } = useSalonDetailsBookings(id);

  return (
    <section className={styles.mainContainer}>
      <FilterSection />

      {isLoading && <LoadSpinner />}

      {isError && <ErrorComponent message={error ? error.message : "Error"} />}
      {data && !isLoading && !isError && data?.data?.length > 0 && (
        <BookingsPartTable data={data?.data} />
      )}
      {data && !isLoading && !isError && data?.data?.length === 0 && (
        <NoDataDisplay />
      )}
    </section>
  );
};

export default BookingsPart;
