import React from "react";
import styles from "./BookingsPart.module.css";
import FilterSection from "./FilterSection/FilterSection";
import BookingsPartTable from "./BookingsTable/BookingsPartTable";

const BookingsPart = () => {
  return (
    <section className={styles.mainContainer}>
      <FilterSection />
      <BookingsPartTable />
    </section>
  );
};

export default BookingsPart;
