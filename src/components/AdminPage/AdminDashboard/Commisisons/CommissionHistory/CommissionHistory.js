import React, { useEffect, useState } from "react";
import styles from "./CommissionHistory.module.css";
import FilterSection from "./FilterSection/FilterSection";
import Pagination from "./pagination/Pagination";
import LoadSpinner from "../../../../LoadSpinner/LoadSpinner";
import ErrorComponent from "../../../../ErrorComponent/ErrorComponent";
import { generatePastMonths } from "../../Salon/SingleSalonDetails/Bookings/BookingsPart";
import NoDataDisplay from "../../../../NodataToDisplay/NoDataDisplay";
import CommissionHistoryTable from "./CommissionHistoryTable/CommissionHistoryTable";
import { useCommissionHistory } from "../../../../../services/superAdmin/Commission";

const CommissionHistory = () => {
  const PaymentStatus = ["All Booking", "Received", "OutStanding"];
  const PaymentDate = generatePastMonths();
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState(
    PaymentStatus[0]
  );
  const [selectedPaymentDate, setSelectedPaymentDate] = useState(
    PaymentDate[0]
  );

  const [SearchText, setSearchText] = useState("");

  let query = `search=${SearchText}&bookingType=${selectedPaymentStatus.toLocaleLowerCase()}&date=${selectedPaymentDate}`;
  const { data, isLoading, isError, error } = useCommissionHistory(query);

  const [pageNumber, setPageNumber] = useState(1);
  const [count, setCount] = useState(5);
  const [itemPerPage, setItemPerPage] = useState(10);

  useEffect(() => {
    setCount(data?.data?.length);
  }, [data]);
  const getFilteredData = (x) => {
    const startIndex = (pageNumber - 1) * itemPerPage;
    const endIndex = startIndex + Number(itemPerPage);
    return x?.data?.slice(startIndex, endIndex) || [];
  };
  const filteredData = getFilteredData(data);
  const value = {
    PaymentStatus,
    PaymentDate,
    selectedPaymentDate,
    setSelectedPaymentDate,
    selectedPaymentStatus,
    setSelectedPaymentStatus,
    setSearchText,
  };
  return (
    <section className={styles.mainContainer}>
      <FilterSection value={value} />
      {isLoading && <LoadSpinner />}
      {filteredData.length > 0 && (
        <CommissionHistoryTable data={filteredData} />
      )}
      {isError && <ErrorComponent message={error ? error.message : "Error"} />}

      {filteredData.length > 0 && (
        <Pagination
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          count={count}
          itemPerPage={itemPerPage}
          setItemPerPage={setItemPerPage}
        />
      )}

      {filteredData.length === 0 && <NoDataDisplay />}
    </section>
  );
};

export default CommissionHistory;
