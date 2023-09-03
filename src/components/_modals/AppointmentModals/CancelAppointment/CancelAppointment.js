import React, { useState } from "react";
import styles from "./CancelAppointment.module.css";
import { frame1 } from "../../../../assets/images/Appointments";
import { ellipse } from "../../../../assets/images/icons";
import PrimaryButton from "../../../Buttons/PrimaryButton/PrimaryButton";
const CancelAppointment = () => {
  // State to manage the selected radio option
  const [selectedOption, setSelectedOption] = useState("");

  // State to manage the textarea value
  const [textareaValue, setTextareaValue] = useState("");

  // Function to handle radio option changes
  const handleRadioChange = (event) => {
    const { value } = event.target;
    setSelectedOption(value);
  };

  // Function to handle textarea changes
  const handleTextareaChange = (event) => {
    const { value } = event.target;
    setTextareaValue(value);
  };
  return (
    <div className={styles.CancelAppointment}>
      <h1 className={styles.modalTitle}>Cancel Appointment</h1>
      <div className={styles.modalContent}>
        <div className={styles.salonInfo}>
          <img src={frame1} alr="frame1" className={styles.salonProfileImg} />
          <div className={styles.details}>
            <h4 className={styles.salonName}>She Hair & Beauty</h4>
            <p className={styles.appointmentDate}>
              Fri, Apr 21 <img src={ellipse} alt="ellipse" />
              <span className={styles.services}>2 services</span>
            </p>
          </div>
        </div>
        <hr className={styles.line} />
        <div className={styles.cancelReason}>
          <h2>Tell us the reason you want to cancel</h2>
          <div className={styles.reasonWrapper}>
            <label>
              <input
                type="radio"
                name="radioOption"
                value="Option 1"
                checked={selectedOption === "Option 1"}
                onChange={handleRadioChange}
              />
              Changed my mind
            </label>
            <br />
            <label>
              <input
                type="radio"
                name="radioOption"
                value="Option 2"
                checked={selectedOption === "Option 2"}
                onChange={handleRadioChange}
              />
              Salon asked to cancel
            </label>
            <br />
            <label>
              <input
                type="radio"
                name="radioOption"
                value="Option 3"
                checked={selectedOption === "Option 3"}
                onChange={handleRadioChange}
              />
              Timing is not suitable
            </label>
            <br />
            <label>
              <input
                type="radio"
                name="radioOption"
                value="Option 4"
                checked={selectedOption === "Option 4"}
                onChange={handleRadioChange}
              />
              Others
            </label>
            <br />
            <textarea
              value={textareaValue}
              onChange={handleTextareaChange}
              placeholder="Tell us more (optional)"
              className={styles.textarea}
            />
          </div>
        </div>
      </div>
      <PrimaryButton children={"Cancel Appointment"} />
    </div>
  );
};

export default CancelAppointment;
