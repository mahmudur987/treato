// Modal.js
import React, { useEffect, useState } from "react";
import styles from "./DeleteReview.module.css";

import { IoMdArrowBack } from "@react-icons/all-files/io/IoMdArrowBack";

import { toast } from "react-toastify";
import axiosInstance from "../../../../services/axios";
import { adminToken } from "../../../../services/superAdmin/Dashboard";

const DeleteReviewModal = ({ showModal, onClose, data }) => {
  const handleSubmit = async () => {
    try {
      const headers = {
        token: adminToken,
      };

      const { data } = await axiosInstance.post("super/createsalonreview", {
        headers,
      });
      if (data) {
        toast.success("review added successfully");
      }
    } catch (error) {
      console.error("error", error);
      toast.error(error ? error.message : "Error");
    }
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
