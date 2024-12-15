import React, { createContext, useState } from "react";
import styles from "./Reports.module.css";
import ReportsPageHeader from "../../../components/Services/Reports/PageHeader/PageHeader";
import { MemoizedFilterSection1 } from "../../../components/Services/Reports/Appointments/FilterSection/FilterSection";
import { MemoizedAppointmentsTable } from "../../../components/Services/Reports/Appointments/AppoinmentsTable/AppointmentsTable";
import { MemoizedFilterSection2 } from "../../../components/Services/Reports/Clients/FilterSection/FilterSection";
import { MemoizedClientsTable } from "../../../components/Services/Reports/Clients/ClientsTable/ClientsTable";
import { MemoizedFilterSection3 } from "../../../components/Services/Reports/BillAndPayment/FilterSection/FilterSection";
import { MemoizedBillAndPaymentTable } from "../../../components/Services/Reports/BillAndPayment/BillAndPaymentTable/BillAndPaymentsTable";
import { IoArrowBack, IoSearchOutline } from "react-icons/io5";
import {
  useAppointmentsReport,
  useBillingReport,
  useClientsReport,
} from "../../../services/Report";
import LoadSpinner from "../../../components/LoadSpinner/LoadSpinner";
import ErrorComponent from "../../../components/ErrorComponent/ErrorComponent";
import NoDataDisplay from "../../../components/NodataToDisplay/NoDataDisplay";
import { Link } from "react-router-dom";

export const reportContext = createContext({});

const Reports = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState("Appointments");
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedClients, setSelectedClients] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const {
    data: appointments,
    isLoading: isAppointmentsLoading,
    isError: isAppointmentsError,
    error: appointmentsError,
  } = useAppointmentsReport(searchTerm);

  const {
    data: clients,
    isLoading: isClientsLoading,
    isError: isClientsError,
    error: clientsError,
  } = useClientsReport(searchTerm);

  const {
    data: billing,
    isLoading: isBillingLoading,
    isError: isBillingError,
    error: billingError,
  } = useBillingReport(searchTerm);

  const contextValue = {
    selectedItems,
    setSelectedItems,
    selectedClients,
    setSelectedClients,
    searchTerm,
    setSearchTerm,
    isSearching,
    setIsSearching,
  };

  const handleSearchToggle = () => {
    setIsSearching((prev) => !prev);
  };

  return (
    <reportContext.Provider value={contextValue}>
      <main className={styles.mainContainer}>
        <div className={styles.top}>
          <Link to={"/partner/dashboard"}>
            <span>
              <IoArrowBack />
            </span>
          </Link>
          <h3>Reports</h3>
          <input
            className={styles.input}
            type="text"
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search"
          />
          <p onClick={handleSearchToggle}>
            <IoSearchOutline />
          </p>
        </div>

        <ReportsPageHeader page={page} setPage={setPage} />

        {page === "Appointments" && (
          <section>
            <MemoizedFilterSection1
              setSearchTerm={setSearchTerm}
              data={appointments}
            />
            {isAppointmentsLoading && <LoadSpinner />}

            {appointments?.data?.length > 0 &&
              !isAppointmentsLoading &&
              !isAppointmentsError && (
                <MemoizedAppointmentsTable data={appointments} />
              )}
            {appointments?.data?.length === 0 &&
              !isAppointmentsLoading &&
              !isAppointmentsError && <NoDataDisplay />}

            {isAppointmentsError && (
              <ErrorComponent message={appointmentsError?.message ?? "Error"} />
            )}
          </section>
        )}
        {page === "Clients" && (
          <section>
            <MemoizedFilterSection2 setSearchTerm={setSearchTerm} />
            {isClientsLoading && <LoadSpinner />}

            {clients?.data?.length > 0 &&
              !isClientsLoading &&
              !isClientsError && <MemoizedClientsTable data={clients} />}
            {clients?.data?.length === 0 &&
              !isClientsLoading &&
              !isClientsError && <NoDataDisplay />}

            {isClientsError && (
              <ErrorComponent message={clientsError?.message ?? "Error"} />
            )}
          </section>
        )}

        {page === "Billing & Payment" && (
          <section>
            <MemoizedFilterSection3 setSearchTerm={setSearchTerm} />
            {isBillingLoading && <LoadSpinner />}

            {isBillingError && (
              <ErrorComponent message={billingError?.message ?? "Error"} />
            )}

            {!isBillingError &&
              !isBillingLoading &&
              billing?.data?.length > 0 && (
                <MemoizedBillAndPaymentTable data={billing?.data} />
              )}
          </section>
        )}
      </main>
    </reportContext.Provider>
  );
};

export default Reports;
