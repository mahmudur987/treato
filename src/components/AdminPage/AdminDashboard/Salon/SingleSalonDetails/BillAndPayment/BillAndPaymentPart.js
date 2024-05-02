import React from "react";
import styles from "./BillAndPaymentPart.module.css";
import FilterSection from "./FilterSection/FilterSection";
import BillAndPaymentPartTable from "./BillAndPaymentTable/BillAndPaymentsTable";
import Commission from "./Commission/Commission";

const BillAndPaymentPart = () => {
  return (
    <section className={styles.mainContainer}>
      <Commission />
      <FilterSection />
      <BillAndPaymentPartTable />
    </section>
  );
};

export default BillAndPaymentPart;
