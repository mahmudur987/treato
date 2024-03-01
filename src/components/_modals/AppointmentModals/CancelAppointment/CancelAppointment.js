import React, { useState } from "react";
import styles from "./CancelAppointment.module.css";
import { frame1 } from "../../../../assets/images/Appointments";
import { ellipse } from "../../../../assets/images/icons";
import PrimaryButton from "../../../Buttons/PrimaryButton/PrimaryButton";
import { toast } from "react-toastify";
import {
  cancelleUpcomingdAppointment,
  cancelledAppointment,
} from "../../../../services/Appointments";
import { useDispatch } from "react-redux";
import { closeModal } from "../../../../redux/slices/modal";
const CancelAppointment = ({ data }) => {
  // State to manage the selected radio option
  const [selectedOption, setSelectedOption] = useState("");
  const dispatch = useDispatch();
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
    setSelectedOption("");
    setTextareaValue(value);
  };

  // handle Appointment canncel
  const handleAppointmentCancel = async (id) => {
    const cancelReason = {
      reason: selectedOption ? selectedOption : textareaValue,
    };
    if (selectedOption || textareaValue) {
      const res = await cancelleUpcomingdAppointment(data?._id, cancelReason);
      console.log(res);
      if (res.res) {
        dispatch(closeModal());
        return toast.success("The appointment is cancellled successfully ", {
          toastId: 1,
        });
      }
      if (res.err) {
        return toast.error("Not confirm please try again", { toastId: 2 });
      }
    } else toast.error("please select a option", { toastId: 3 });
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
                value="Changed my mind"
                checked={selectedOption === "Changed my mind"}
                onChange={handleRadioChange}
              />
              Changed my mind
            </label>
            <br />
            <label>
              <input
                type="radio"
                name="radioOption"
                value="Salon asked to cancel"
                checked={selectedOption === "Salon asked to cancel"}
                onChange={handleRadioChange}
              />
              Salon asked to cancel
            </label>
            <br />
            <label>
              <input
                type="radio"
                name="radioOption"
                value="Timing is not suitable"
                checked={selectedOption === "Timing is not suitable"}
                onChange={handleRadioChange}
              />
              Timing is not suitable
            </label>
            <br />
            <label>
              <input
                type="radio"
                name="radioOption"
                value="Others"
                checked={selectedOption === "Others"}
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
      <div className={styles.bottomSection}>
        <PrimaryButton
          onClick={handleAppointmentCancel}
          children={"Cancel Appointment"}
        />
        <p>
          Free cancellation till 4 hours before the start time, post that
          additional charge(s) applicable. <a href="#">Cancellation Policy.</a>
        </p>
      </div>
    </div>
  );
};

export default CancelAppointment;
