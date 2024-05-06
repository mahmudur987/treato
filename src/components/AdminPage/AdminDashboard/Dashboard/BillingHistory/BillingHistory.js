import React, { useEffect, useState } from "react";
import styles from "./BillingHistory.module.css";
import FilterSection from "./FilterSection/FilterSection";
import BillHistoryTable from "./BillHistoryTable/BillHistoryTable";
import Pagination from "./pagination/Pagination";
import { useBillingHistory } from "../../../../../services/superAdmin/Dashboard";
import LoadSpinner from "../../../../LoadSpinner/LoadSpinner";
import ErrorComponent from "../../../../ErrorComponent/ErrorComponent";

const BillingHistory = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [count, setCount] = useState(5);
  let itemPerPage = 5;
  const { data, isLoading, isError, error } = useBillingHistory();
  useEffect(() => {
    setCount(data?.data?.length);
  }, [data]);
  const getFilteredData = () => {
    const startIndex = (pageNumber - 1) * itemPerPage;
    const endIndex = Math.min(startIndex + itemPerPage, count);
    return data?.data?.slice(startIndex, endIndex) || [];
  };

  const filteredData = getFilteredData();

  return (
    <section className={styles.mainContainer}>
      <FilterSection />
      {isLoading && <LoadSpinner />}
      {filteredData.length > 0 && <BillHistoryTable data={filteredData} />}
      {isError && <ErrorComponent message={error ? error.message : "Error"} />}
      <Pagination
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        count={count}
        setCount={setCount}
      />
    </section>
  );
};

export default BillingHistory;
