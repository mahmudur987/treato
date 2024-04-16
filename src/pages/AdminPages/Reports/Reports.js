import React, { useState } from "react";
import styles from "./Reports.module.css";
import ReportsPageHeader from "../../../components/AdminPage/Reports/PageHeader/PageHeader";
import FilterSection from "../../../components/AdminPage/Reports/Appointments/FilterSection/FilterSection";
const Reports = () => {
  const [pageDetails, setPageDetails] = useState("Appointments");

  return (
    <main className={styles.mainContainer}>
      <ReportsPageHeader
        pageDetails={pageDetails}
        setPageDetails={setPageDetails}
      />
      {pageDetails === "Appointments" && (
        <section className={styles.appointments}>
          <FilterSection />
          Reports
        </section>
      )}
    </main>
  );
};

export default Reports;
