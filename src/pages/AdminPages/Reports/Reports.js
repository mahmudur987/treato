import React, { useState } from "react";
import styles from "./Reports.module.css";
import ReportsPageHeader from "../../../components/AdminPage/Reports/PageHeader/PageHeader";
import FilterSection from "../../../components/AdminPage/Reports/Appointments/FilterSection/FilterSection";
import AppointmentsTable from "../../../components/AdminPage/Reports/Appointments/AppoinmentsTable/AppointmentsTable";
import { IoArrowBack, IoSearchOutline } from "react-icons/io5";

const Reports = () => {
  const [pageDetails, setPageDetails] = useState("Appointments");

  return (
    <main className={styles.mainContainer}>
      <div className={styles.top}>
        <span>
          <IoArrowBack />
        </span>
        <h3>Reports</h3>
        <p>
          <IoSearchOutline />
        </p>
      </div>

      <ReportsPageHeader
        pageDetails={pageDetails}
        setPageDetails={setPageDetails}
      />
      {pageDetails === "Appointments" && (
        <section className={styles.appointments}>
          <FilterSection />
          <AppointmentsTable />
        </section>
      )}
    </main>
  );
};

export default Reports;
