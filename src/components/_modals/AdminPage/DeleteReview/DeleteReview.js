// Modal.js
import React, { useEffect, useState } from "react";
import styles from "./DeleteReview.module.css";

import { IoMdArrowBack } from "@react-icons/all-files/io/IoMdArrowBack";

import { toast } from "react-toastify";
import axiosInstance from "../../../../services/axios";

import { useParams } from "react-router-dom";
import { useSalonReviews } from "../../../../services/superAdmin/Dashboard";

const DeleteReviewModal = ({ showModal, onClose, data }) => {
  let { id } = useParams();
  const { refetch } = useSalonReviews(id);
  const handleDeleteReview = async () => {
    console.log({
      salon_id: id,
      reviewid: data?.id,
    });

    const headers = {
      token: localStorage.getItem("jwtToken"),
    };
    let url = "super/salonreviewdelete";
    const requestData = {
      headers: headers,
      data: {
        salon_id: id,
        reviewid: data?.id,
      },
    };

    try {
      const res = await axiosInstance.delete(url, requestData);

      console.log(res);

      if (res?.data) {
        toast.success(res?.data?.message ?? "Review deleted successfully.");
      }

      refetch();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while deleting the review.");
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
          <button
            className={styles.save}
            type="button"
            onClick={handleDeleteReview}
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteReviewModal;
