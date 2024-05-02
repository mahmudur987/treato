// Modal.js
import React, { useEffect, useState } from "react";
import styles from "./DeleteReview.module.css";

import { IoMdArrowBack } from "react-icons/io";

import { toast } from "react-toastify";

const DeleteReviewModal = ({ showModal, onClose }) => {
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
        <h2 className={styles.modalHeading}>Delete Review</h2>

        <div className={styles.form}>
          <p>Are you sure you want to delete this customer review?</p>
          <span>
            NOTE: Once deleted, this review will not be shown anywhere on
            Treato. This action cannot be reversed.
          </span>
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
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteReviewModal;
