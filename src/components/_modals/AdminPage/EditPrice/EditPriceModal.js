// Modal.js
import React, { useState } from "react";
import styles from "./EditPriceModal.module.css";
import img1 from "../../../../assets/images/TeamDetails/ProfileImg.png";
import { IoMdArrowBack } from "react-icons/io";

import { toast } from "react-toastify";

const EditPriceModal = ({ showModal, onClose }) => {
  const [error, setError] = useState(null);

  if (error) {
    toast.error("error happen");
  }
  return (
    <div className={`${styles.modal} ${showModal ? styles.show : ""}`}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={onClose}>
          &times;
        </span>
        <span className={styles.back} onClick={onClose}>
          <IoMdArrowBack />
        </span>
        <h2 className={styles.modalHeading}>Edit Service Price</h2>
        <div className={styles.top}>
          <figure>
            <img src={img1} alt="profile image" />
          </figure>
          <h5>She hair and Beauty</h5>
        </div>
        <form className={styles.form}>
          <div className={styles.serviceName}>
            <label htmlFor="">service</label>

            <input type="text" value={"Haircut for women"} disabled />
          </div>

          <div className={styles.inputWrapper}>
            <div className={styles.wrapper}>
              <label htmlFor="price">New Price</label>
              <input type="text" placeholder="₹599" value={"₹599"} />
            </div>
            <div className={styles.wrapper}>
              <label htmlFor="price">Effective from</label>
              <input type="date" />
            </div>
          </div>
        </form>

        <p className={styles.note}>
          NOTE: Appointments booked prior to the change date will not be
          affected by the new price.
        </p>
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

export default EditPriceModal;
