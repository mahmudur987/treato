import React, { createContext, useState } from "react";
import styles from "./Reports.module.css";
import ReportsPageHeader from "../../../components/Services/Reports/PageHeader/PageHeader";
import FilterSection1 from "../../../components/Services/Reports/Appointments/FilterSection/FilterSection";
import AppointmentsTable from "../../../components/Services/Reports/Appointments/AppoinmentsTable/AppointmentsTable";
import FilterSection2 from "../../../components/Services/Reports/Clients/FilterSection/FilterSection";
import ClientsTable from "../../../components/Services/Reports/Clients/ClientsTable/ClientsTable";
import FilterSection3 from "../../../components/Services/Reports/BillAndPayment/FilterSection/FilterSection";
import BillAndPaymentTable from "../../../components/Services/Reports/BillAndPayment/BillAndPaymentTable/BillAndPaymentsTable";
import { IoArrowBack, IoSearchOutline } from "react-icons/io5";
import { useAppointmentsReport } from "../../../services/Report";

export const reportContext = createContext({});

const Reports = () => {
  const [pageDetails, setPageDetails] = useState("Appointments");
  const [appointmentQuery, setAppointmentsQuery] = useState("");
  const {
    data: appointments,
    isLoading: appointmentsIsLoading,
    isError,
    error,
  } = useAppointmentsReport(appointmentQuery);

  console.log(appointments);

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
          <FilterSection1 setAppointmentsQuery={setAppointmentsQuery} />
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
