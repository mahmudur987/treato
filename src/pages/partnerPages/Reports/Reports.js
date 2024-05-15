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
import {
  useAppointmentsReport,
  useClientsReport,
} from "../../../services/Report";
import LoadSpinner from "../../../components/LoadSpinner/LoadSpinner";
import ErrorComponent from "../../../components/ErrorComponent/ErrorComponent";

export const reportContext = createContext({});

const Reports = () => {
  const [pageDetails, setPageDetails] = useState("Appointments");
  const [appointmentQuery, setAppointmentsQuery] = useState("");
  const [clientsQuery, setClientsQuery] = useState("");
  const {
    data: appointments,
    isLoading: appointmentsIsLoading,
    isError: appointmentsIsError,
    error: appointmentsError,
  } = useAppointmentsReport(appointmentQuery);

  const {
    data: clients,
    isLoading: clientsIsLoading,
    isError: clientsIsError,
    error: clientsError,
  } = useClientsReport(clientsQuery);

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
        <section>
          <FilterSection1 setAppointmentsQuery={setAppointmentsQuery} />
          {appointmentsIsLoading && <LoadSpinner />}

          {appointments && !appointmentsIsLoading && !appointmentsIsError && (
            <AppointmentsTable data={appointments} />
          )}

          {appointmentsIsError && (
            <ErrorComponent message={appointmentsError.message ?? "Error"} />
          )}
        </section>
      )}
      {pageDetails === "Clients" && (
        <section>
          <FilterSection2 setClientsQuery={setClientsQuery} />
          {clientsIsLoading && <LoadSpinner />}
          {clients && !clientsIsLoading && !clientsError && (
            <ClientsTable data={clients} />
          )}
          {clientsIsError && (
            <ErrorComponent message={clientsError.message ?? "Error"} />
          )}
        </section>
      )}
      {pageDetails === "Billing & Payment" && (
        <section>
          <FilterSection3 />

          <BillAndPaymentTable />
        </section>
      )}
    </main>
  );
};

export default Reports;
