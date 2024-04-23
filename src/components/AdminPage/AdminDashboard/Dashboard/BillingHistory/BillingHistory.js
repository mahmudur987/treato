import React from "react";
import styles from "./BillingHistory.module.css";
import FilterSection from "./FilterSection/FilterSection";
import BillHistoryTable from "./BillHistoryTable/BillHistoryTable";
import Pagination from "./pagination/Pagination";
const BillingHistory = () => {
  return (
    <section className={styles.mainContainer}>
      <FilterSection />
      <BillHistoryTable />
      <Pagination />
    </section>
  );
};

export default BillingHistory;
