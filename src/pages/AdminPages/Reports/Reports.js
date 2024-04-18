import React, { useState } from "react";
import styles from "./Reports.module.css";
import ReportsPageHeader from "../../../components/AdminPage/Reports/PageHeader/PageHeader";
import FilterSection1 from "../../../components/AdminPage/Reports/Appointments/FilterSection/FilterSection";
import AppointmentsTable from "../../../components/AdminPage/Reports/Appointments/AppoinmentsTable/AppointmentsTable";
import { IoArrowBack, IoSearchOutline } from "react-icons/io5";
import FilterSection2 from "../../../components/AdminPage/Reports/Clients/FilterSection/FilterSection";
import ClientsTable from "../../../components/AdminPage/Reports/Clients/ClientsTable/ClientsTable";
import FilterSection3 from "../../../components/AdminPage/Reports/BillAndPayment/FilterSection/FilterSection";
import BillAndPaymentTable from "../../../components/AdminPage/Reports/BillAndPayment/BillAndPaymentTable/BillAndPaymentsTable";

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
          <FilterSection1 />
          <AppointmentsTable />
        </section>
      )}
      {pageDetails === "Clients" && (
        <section className={styles.appointments}>
          <FilterSection2 />
          <ClientsTable />
        </section>
      )}
      {pageDetails === "Billing & Payment" && (
        <section className={styles.appointments}>
          <FilterSection3 />
          <BillAndPaymentTable />
        </section>
      )}
    </main>
  );
};

export default Reports;
