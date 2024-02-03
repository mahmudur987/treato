import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./modal.module.css";
import Modal from "./modal";
import { closeModal } from "../../redux/slices/modal";
import Filter from "./Filter/Filter";
import RescheduleAppointment from "./AppointmentModals/RescheduleAppointment/RescheduleAppointment";
import { cross } from "../../assets/images/icons";
import CancelAppointment from "./AppointmentModals/CancelAppointment/CancelAppointment";
import WriteReview from "./AppointmentModals/WriteReview/WriteReview";
import AddCategory from "./Addcategory/AddCategory";

const ModalManager = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.modal);
  const { activeModal, closable, data } = state;
  function handleClose() {
    dispatch(closeModal());
  }

  useEffect(() => {
    if (activeModal !== null) document.body.style.overflow = "hidden";
    else
      setTimeout(() => {
        document.body.style.overflow = "auto";
      }, 500);
  }, [activeModal]);

  const escFunction = useCallback((event) => {
    if (event.key === "Escape") {
      handleClose();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);
    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [escFunction]);

  const handleBgClick = (event) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };
  console.log(state);
  return (
    <Modal open={Boolean(activeModal)} onClose={() => handleClose(true)}>
      <div className={`${styles["modal-wrapper"]} `}>
        <main>
          {activeModal === "filter" && <Filter />}

          {activeModal === "RescheduleAppointment" && (
            <RescheduleAppointment data={data} />
          )}
          {activeModal === "CancelAppointment" && (
            <CancelAppointment data={data} />
          )}
          {activeModal === "WriteReview" && <WriteReview data={data} />}

          {/* Modal Close Icon */}
          {closable && (
            <img
              src={cross}
              alt="close"
              className={styles["modal-close-icon"]}
              onClick={handleClose}
            />
          )}
        </main>
      </div>
    </Modal>
  );
};

export default ModalManager;
