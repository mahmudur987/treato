import React, { createContext, useState } from "react";
import styles from "./Reports.module.css";
import ReportsPageHeader from "../../../components/Services/Reports/PageHeader/PageHeader";
import FilterSection1, {
  MemoizedFilterSection1,
} from "../../../components/Services/Reports/Appointments/FilterSection/FilterSection";
import AppointmentsTable, {
  MemoizedAppointmentsTable,
} from "../../../components/Services/Reports/Appointments/AppoinmentsTable/AppointmentsTable";
import FilterSection2, {
  MemoizedFilterSection2,
} from "../../../components/Services/Reports/Clients/FilterSection/FilterSection";
import ClientsTable, {
  MemoizedClientsTable,
} from "../../../components/Services/Reports/Clients/ClientsTable/ClientsTable";
import FilterSection3, {
  MemoizedFilterSection3,
} from "../../../components/Services/Reports/BillAndPayment/FilterSection/FilterSection";
import BillAndPaymentTable, {
  MemoizedBillAndPaymentTable,
} from "../../../components/Services/Reports/BillAndPayment/BillAndPaymentTable/BillAndPaymentsTable";
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
  const [isSearch, setIsSearch] = useState(false);
  const [commonSearch, setCommonSearch] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedClients, setSelectedClients] = useState([]);
  const [pageDetails, setPageDetails] = useState("Appointments");
  const [appointmentQuery, setAppointmentsQuery] = useState("");
  const [clientsQuery, setClientsQuery] = useState("");
  const [billQuery, setBillQuery] = useState("");
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
  const {
    data: bill,
    isLoading: billIsLoading,
    isError: billIsError,
    error: billError,
  } = useBillingReport(billQuery);
  // console.log(billQuery);
  const value = {
    selectedItems,
    setSelectedItems,
    selectedClients,
    setSelectedClients,
    commonSearch,
  };
  const handler = () => {
    setIsSearch((pre) => !pre);
  };
  return (
    <reportContext.Provider value={value}>
      <main className={styles.mainContainer}>
        <div className={styles.top}>
          <Link to={"/partner/dashboard"}>
            <span>
              <IoArrowBack />
            </span>
          </Link>
          {!isSearch && <h3>Reports</h3>}
          {isSearch && (
            <input
              className={styles.input}
              type="text"
              onChange={(e) => setCommonSearch(e.target.value)}
            />
          )}

          <p onClick={handler}>
            <IoSearchOutline />
          </p>
        </div>

        <ReportsPageHeader
          pageDetails={pageDetails}
          setPageDetails={setPageDetails}
        />
        {pageDetails === "Appointments" && (
          <section>
            <MemoizedFilterSection1
              setAppointmentsQuery={setAppointmentsQuery}
            />
            {appointmentsIsLoading && <LoadSpinner />}

            {appointments?.data?.length > 0 &&
              !appointmentsIsLoading &&
              !appointmentsIsError && (
                <MemoizedAppointmentsTable data={appointments} />
              )}
            {appointments?.data?.length === 0 &&
              !appointmentsIsLoading &&
              !appointmentsIsError && <NoDataDisplay />}

            {appointmentsIsError && (
              <ErrorComponent message={appointmentsError.message ?? "Error"} />
            )}
          </section>
        )}
        {pageDetails === "Clients" && (
          <section>
            <MemoizedFilterSection2 setClientsQuery={setClientsQuery} />
            {clientsIsLoading && <LoadSpinner />}
            {clients?.data?.length > 0 &&
              !clientsIsLoading &&
              !clientsError && <MemoizedClientsTable data={clients} />}
            {clients?.data?.length === 0 &&
              !clientsIsLoading &&
              !clientsError && <NoDataDisplay />}
            {clientsIsError && (
              <ErrorComponent message={clientsError.message ?? "Error"} />
            )}
          </section>
        )}

        {pageDetails === "Billing & Payment" && (
          <section>
            <MemoizedFilterSection3 setBillQuery={setBillQuery} />
            {billIsLoading && <LoadSpinner />}

            {billIsError && (
              <ErrorComponent
                message={billError ? billError?.message : "Error"}
              />
            )}

            {!billIsError && !billIsLoading && bill?.data?.length > 0 && (
              <MemoizedBillAndPaymentTable data={bill?.data} />
            )}
          </section>
        )}
      </main>
    </reportContext.Provider>
  );
};

export default Reports;
