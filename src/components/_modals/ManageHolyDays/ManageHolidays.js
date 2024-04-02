import React, { useState } from "react";
import styles from "./ManageHolidays.module.css";
import { IoMdArrowBack } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import ToggleButton from "../../Buttons/Toggle/ToggleButton";
const ManageHolidays = ({ showModal, onClose }) => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
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
          closed. You can update this list anytime before the relevant date(s).
        </p>

        <div className={styles.content}>
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
          <div className={styles.row1}>
            <span className={styles.col1}>Mon ,jan 26</span>
            <span className={styles.col2}>Diwali</span>
            <span className={styles.col3}>
              <ToggleButton isOn={isToggled} handleToggle={handleToggle} />
            </span>
          </div>
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
