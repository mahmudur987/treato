import React, { useEffect, useState } from "react";
import styles from "./PaymentPage.module.css";
import { IoArrowBack, IoSearchOutline } from "react-icons/io5";

import PaymentPageHeader from "../../../../components/AdminPage/AdminDashboard/payment/PaymentPageHeader/PaymentPageHeader";
import FilterSection, {
  MemoizedFilterSection5,
} from "../../../../components/AdminPage/AdminDashboard/payment/Payment/FilterSection/FilterSection";
import PaymentTable from "../../../../components/AdminPage/AdminDashboard/payment/Payment/PaymentTable/PaymentsTable";
import { Link } from "react-router-dom";
import { useGetAdminPayment } from "../../../../services/superAdmin/Payment";
import LoadSpinner from "../../../../components/LoadSpinner/LoadSpinner";
import ErrorComponent from "../../../../components/ErrorComponent/ErrorComponent";
import { MemoizedPagination } from "../../../../components/AdminPage/AdminDashboard/Dashboard/BillingHistory/pagination/Pagination";
const PaymentStatus = ["Upcoming", "Cancelled", "Completed"];
const PaymentMode = ["On-site", "Online"];

const PaymentPage = () => {
  const [selectedData, setSelectedData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [count, setCount] = useState(5);
  const [itemPerPage, setItemPerPage] = useState(20);
  const [selectedPaymentStatus, setSelectedPaymentStatus] =
    useState("Payment Status");
  const [selectedPaymentMode, setSelectedPaymentMode] =
    useState("Payment Mode");
  const [searchText, setSearchText] = useState("");
  let query = `page=${pageNumber}&limit=${itemPerPage}`;
  if (searchText) query += `search=${searchText}&`;
  if (selectedPaymentStatus !== "Payment Status")
    query += `status=${selectedPaymentStatus.toLocaleLowerCase()}&`;
  if (selectedPaymentMode !== "Payment Mode")
    query += `mode=${selectedPaymentMode.toLocaleLowerCase()}`;

  const { data, isLoading, isError, error } = useGetAdminPayment(query);
  console.log(data);
  useEffect(() => {
    if (data) {
      setCount(data?.totalCount);
    }
  }, [data]);

  const value = {
    selectedPaymentMode,
    setSelectedPaymentMode,
    selectedPaymentStatus,
    setSelectedPaymentStatus,
    PaymentMode,
    PaymentStatus,
    searchText,
    setSearchText,
  };
  return (
    <main className={styles.mainContainer}>
      <div className={styles.top}>
        <span>
          <Link to={"/admin"}>
            <IoArrowBack />
          </Link>
        </span>
        <h3>Payment</h3>
        <p>
          <IoSearchOutline />
        </p>
      </div>

      <PaymentPageHeader />
      <section className={styles.appointments}>
        <MemoizedFilterSection5 value={value} />
        {data && !isLoading && !isError && (
          <PaymentTable
            data={data?.data}
            selectedData={selectedData}
            setSelectedData={setSelectedData}
          />
        )}

        {data?.data?.length > 0 && (
          <MemoizedPagination
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            count={count}
            itemPerPage={itemPerPage}
            setItemPerPage={setItemPerPage}
          />
        )}
        {isLoading && <LoadSpinner />}
        {isError && (
          <ErrorComponent message={error ? error.message : "Error"} />
        )}
      </section>
    </main>
  );
};

export default PaymentPage;
