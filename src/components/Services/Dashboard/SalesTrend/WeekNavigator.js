import React, { useEffect, useState } from "react";
import styles from "./SalesTrand.module.css";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

const WeekNavigator = ({ setStartDate, setEndDate }) => {
  const initialStartDate = new Date();
  initialStartDate.setDate(initialStartDate.getDate() - 7);

  const [startDate, setStartDateState] = useState(initialStartDate);
  const [endDate, setEndDateState] = useState(new Date());

  const handleBackward = () => {
    setStartDateState(
      (prevStartDate) => new Date(prevStartDate.getTime() - 24 * 60 * 60 * 1000)
    );
    setEndDateState(
      (prevEndDate) => new Date(prevEndDate.getTime() - 24 * 60 * 60 * 1000)
    );
  };

  const handleForward = () => {
    setStartDateState(
      (prevStartDate) => new Date(prevStartDate.getTime() + 24 * 60 * 60 * 1000)
    );
    setEndDateState(
      (prevEndDate) => new Date(prevEndDate.getTime() + 24 * 60 * 60 * 1000)
    );
  };
  function formatDateToISO(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }
  const formattedstartDate = formatDateToISO(startDate);
  const formattedEndDate = formatDateToISO(endDate);
  useEffect(() => {
    setStartDate(formattedstartDate);
    setEndDate(formattedEndDate);
  }, [formattedstartDate, formattedEndDate]);

  const isForwardDisabled = () => {
    const today = new Date();
    return (
      endDate.toLocaleDateString("en-GB") === today.toLocaleDateString("en-GB")
    );
  };

  return (
    <p className={styles.weeks}>
      <button onClick={handleBackward}>
        <FaChevronLeft />
      </button>
      {startDate.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
      })}
      {" - "}
      {endDate.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
      })}
      <button onClick={handleForward} disabled={isForwardDisabled()}>
        <FaChevronRight />
      </button>
    </p>
  );
};

export default WeekNavigator;
