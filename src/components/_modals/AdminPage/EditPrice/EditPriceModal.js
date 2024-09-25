// Modal.js
import React, { useState } from "react";
import styles from "./EditPriceModal.module.css";
import img1 from "../../../../assets/images/TeamDetails/ProfileImg.png";
import { IoMdArrowBack } from "@react-icons/all-files/io/IoMdArrowBack";

import { toast } from "react-toastify";
import axiosInstance from "../../../../services/axios";
import {
  adminToken,
  useSalonDetailsServices,
} from "../../../../services/superAdmin/Dashboard";
import { useParams } from "react-router-dom";

const EditPriceModal = ({ showModal, onClose, data, salonId }) => {
  const [price, setPrice] = useState("");
  const { id } = useParams();
  const { refetch } = useSalonDetailsServices(id);
  const handleEditPrice = async () => {
    if (!price) {
      return toast.error("Add Price");
    }

    const deleteData = {
      mainId: salonId,
      subId: data._id,
      price,
    };
    console.log(deleteData);
    try {
      const headers = {
        token: adminToken,
      };

      const { data } = await axiosInstance.patch(
        "super/editserviceprice",
        deleteData,
        { headers }
      );
      if (data) {
        toast.success("Edit Price successfully");
        onClose();
        refetch();
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
        <h2 className={styles.modalHeading}>Edit Service Price</h2>
        <div className={styles.top}>
          <figure>
            <img loading="lazy" src={img1} alt="profile image" />
          </figure>
          <h5>She hair and Beauty</h5>
        </div>
        <form className={styles.form}>
          <div className={styles.serviceName}>
            <label htmlFor="">service</label>

            <input type="text" value={data?.service_name} disabled />
          </div>

          <div className={styles.inputWrapper}>
            <div className={styles.wrapper}>
              <label htmlFor="price">New Price</label>
              <input
                type="text"
                placeholder="₹599"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
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
          <button
            className={styles.save}
            type="button"
            onClick={handleEditPrice}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPriceModal;
