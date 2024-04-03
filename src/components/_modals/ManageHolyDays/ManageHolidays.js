import React, { useState } from "react";
import styles from "./ManageHolidays.module.css";
import { IoMdArrowBack } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import ToggleButton from "../../Buttons/Toggle/ToggleButton";
import { useSingleSalon } from "../../../services/salon";
import { useGetHolidays } from "../../../services/holidays";
import ErrorComponent from "../../ErrorComponent/ErrorComponent";
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { weekday: "short", month: "short", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
};
const ManageHolidays = ({ showModal, onClose }) => {
  const { data, isError, isLoading, error } = useGetHolidays();
  const [isToggled, setIsToggled] = useState("");
  const handleToggle = (id) => {
    setIsToggled(id);
    console.log(id);
  };
  console.log(isToggled);
  return (
    <div className={`${styles.modal} ${showModal ? styles.show : ""}`}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={onClose}>
          &times;
        </span>
        <span className={styles.back} onClick={onClose}>
          <IoMdArrowBack />
        </span>
        <h2 className={styles.modalHeading}>List of Holidays - 2024</h2>
        <p className={styles.modalDescription}>
          Your store will be unavailable for bookings on the days marked as
          closed. You can update this list anytime before the relevant date.
        </p>
        <div className={styles.top}>
          <button className={styles.addNewButton}>
            <span>
              <FaPlus />
            </span>
            <span>Add a new holiday</span>
          </button>

          <div className={styles.row1}>
            <span
              className={styles.col1}
              style={{ fontSize: "16px", fontWeight: "600" }}
            >
              Day/ Date
            </span>
            <span
              className={styles.col2}
              style={{ fontSize: "16px", fontWeight: "600" }}
            >
              {" "}
              Event
            </span>
            <span
              className={styles.col3}
              style={{ fontSize: "16px", fontWeight: "600" }}
            >
              {" "}
              Status
            </span>
          </div>
        </div>
        <div className={styles.content}>
          {data &&
            !isError &&
            !isLoading &&
            data?.AllHolidays?.holidays.length > 0 &&
            data?.AllHolidays?.holidays.map((x) => (
              <div key={x._id} className={styles.row1}>
                <span className={styles.col1}>{formatDate(x.date)}</span>
                <span className={styles.col2}>{x.event}</span>
                <span
                  className={styles.col3}
                  style={{ color: `${x.status === "closed" ? "#6D747A" : ""}` }}
                >
                  <ToggleButton
                    isOn={isToggled === x._id}
                    handleToggle={handleToggle}
                    data={x}
                  />
                  {x.status}
                </span>
              </div>
            ))}

          {isError && !isLoading && error && (
            <ErrorComponent message={error ? error.message : "Error "} />
          )}
        </div>

        <div className={styles.buttonContainer}>
          <button
            className={styles.cancel}
            type="button"
            onClick={() => onClose()}
          >
            Cancel
          </button>
          <button className={styles.save} type="button">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageHolidays;
