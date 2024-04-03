import React, { useRef, useState } from "react";
import styles from "./ManageHolidays.module.css";
import { IoMdArrowBack } from "react-icons/io";
import { FaAngleDown, FaArrowDown, FaPlus } from "react-icons/fa6";
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
  const dateInputRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState("Fri,Mar 29");
  const [show, setShow] = useState(false);
  const [isToggled, setIsToggled] = useState("");
  const handleToggle = (id) => {
    setIsToggled(id);
    console.log(id);
  };
  const openDatePicker = () => {
    dateInputRef.current.showPicker();
  };

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
          {show ? (
            <form className={styles.addHolidayForm}>
              <div className={styles.topPart}>
                <h4>Add a new holiday</h4>
                <p className={styles.ToggleButtonWrapper}>
                  <ToggleButton /> <span>close</span>
                </p>
              </div>
              <div className={styles.bottomPart}>
                <p
                  className={styles.dateWrapper}
                  style={{ position: "relative" }}
                >
                  <span style={{ fontWeight: "600" }}>Date</span>
                  <span
                    onClick={openDatePicker}
                    style={{
                      color: "#6D747A",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    {selectedDate} <FaAngleDown />
                  </span>
                  <input
                    ref={dateInputRef}
                    type="date"
                    style={{ display: "none", position: "absolute" }}
                    onChange={(e) => {
                      const selectedDate = e.target.value;
                      const formattedDate = new Date(
                        selectedDate
                      ).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      });
                      setSelectedDate(formattedDate);
                    }}
                  />
                </p>
                <p className={styles.eventWrapper}>
                  <span style={{ fontWeight: "600" }}>Event</span>
                  <input type="text " placeholder="Enter holidays name" />
                </p>
                <button
                  onClick={() => setShow(!show)}
                  className={styles.addHolidaySave}
                >
                  save
                </button>
              </div>
            </form>
          ) : (
            <button
              onClick={() => setShow(!show)}
              className={styles.addNewButton}
            >
              <span>
                <FaPlus />
              </span>
              <span>Add a new holiday</span>
            </button>
          )}

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
