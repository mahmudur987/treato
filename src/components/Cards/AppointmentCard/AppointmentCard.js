import React, { useState } from "react";
import styles from "./AppointmentCard.module.css";
import {
  checkCircleFill,
  chevronDownBlue,
  chevronUpBlue,
  clock,
  cross,
  ellipse,
  moreVertical,
} from "../../../assets/images/icons";
import { frame1, pro_Avatar } from "../../../assets/images/Appointments";
import PrimaryButton from "../../Buttons/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../Buttons/SecondaryButton/SecondaryButton";
import { openModal } from "../../../redux/slices/modal";
import { useDispatch } from "react-redux";
import ModalManager from "../../_modals/ModalManager";
const AppointmentCard = ({ salon, cardType }) => {
  // Dynamic Content Rendering Based on cardType(prop)
  console.log(salon);
  const [toggleDetails, settoggleDetails] = useState(false);
  const [toggleoptions, settoggleoptions] = useState(false);
  const dispatch = useDispatch();
  const handleModal = (buttonType) => {
    console.log(buttonType);
    dispatch(openModal({ type: `${buttonType}`, closable: true }));
  };

  return (
    <div className={styles.cardWrapper}>
      {salon.onSite && (
        <div className={styles.shareOTPWrapper}>
          <h3>6078</h3>
          <p>
            is the 4-digit OTP for this booking. Please share the OTP at the
            salon to start the service.
          </p>
        </div>
      )}
      <div className={`${styles.salonCard} ${styles.salonCardUnique}`}>
        {/* salon information */}
        <div className={styles.salonInfo}>
          <div className={styles.infos}>
            <img src={frame1} className={styles.frame1} alt="frame1" />
            <div className={styles.salon}>
              <h4 className={styles.name}>{salon.name}</h4>
              <h5 className={styles.location}>{salon.location}</h5>
              <div className={styles.timing}>
                <img src={clock} alt="clock" />
                {salon.dateTime}
                <button
                  onClick={() => settoggleDetails(!toggleDetails)}
                  className={styles.toggledetails}
                >
                  {!toggleDetails && (
                    <>
                      View details{" "}
                      <img src={chevronDownBlue} alt="chevronUpBlue" />
                    </>
                  )}
                  {toggleDetails && (
                    <>
                      Hide details{" "}
                      <img src={chevronUpBlue} alt="chevronUpBlue" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div
            className={`${
              cardType == "Upcoming" ? styles.moreVertical : styles.d_none
            }`}
          >
            <img
              src={moreVertical}
              alt="moreVertical"
              onClick={() => settoggleoptions(!toggleoptions)}
            />
            {toggleoptions && (
              <div className={styles.options}>
                <a href="#" className={styles.helpOption}>
                  Help
                </a>
              </div>
            )}
          </div>
          <div
            className={`${
              cardType == "Completed" ? styles.writeReview : styles.d_none
            }`}
            onClick={() => handleModal("WriteReview")}
          >
            Write a review
          </div>
        </div>
        <hr className={styles.line} />
        {/* mobile view salons timing  */}
        <div className={styles.timing_mobo}>
          <img src={clock} alt="clock" />
          {salon.dateTime}
          <button
            onClick={() => settoggleDetails(!toggleDetails)}
            className={styles.toggledetails}
          >
            {!toggleDetails && (
              <>
                View details <img src={chevronDownBlue} alt="chevronUpBlue" />
              </>
            )}
            {toggleDetails && (
              <>
                Hide details <img src={chevronUpBlue} alt="chevronUpBlue" />
              </>
            )}
          </button>
        </div>

        {/* services Details */}
        {toggleDetails && (
          <>
            <div className={styles.detailSection}>
              <div className={styles.serviceDetails}>
                <h4 className={styles.title}>Service Details</h4>
                <div className={styles.sDetailWrapper}>
                  {salon?.services?.map((item, index) => (
                    <div
                      key={index}
                      className={`${styles.sDetail} ${
                        cardType !== "Upcoming"
                          ? styles.flexCol
                          : styles.flexRow
                      }`}
                    >
                      <div className={styles.qty_Name}>
                        <p className={styles.quantity}>{item.quantity}</p>
                        <img src={cross} alt="cross" />
                        <p className={styles.serviceName}>{item.serviceName}</p>
                        <img
                          src={ellipse}
                          alt="ellipse"
                          className={`${styles.ellipse} ${
                            cardType !== "Upcoming" ? styles.d_none : ""
                          }`}
                        />
                      </div>
                      <div className={styles.time_Amount}>
                        <p className={styles.servicePeriod}>
                          {item.servicePeriod}
                        </p>
                        <img src={ellipse} alt="ellipse" />
                        <p className={styles.servicePrice}>
                          {item.servicePrice}
                        </p>
                        <p
                          className={`${
                            cardType !== "Completed"
                              ? styles.d_none
                              : styles.proName
                          }`}
                        >
                          <img
                            src={pro_Avatar}
                            alt="pro_Avatar"
                            className={styles.pro_Avatar}
                          />
                          {item.professional}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add more service details here */}
              </div>
              <div className={styles.others}>
                <div className={styles.bookedOn}>
                  <h4 className={styles.title}>Booked on</h4>
                  <p className={styles.dateTime}>{salon.bookedOn}</p>
                </div>
                <div
                  className={`${styles.Professional} ${
                    cardType == "Completed" ? styles.d_none : ""
                  }`}
                >
                  <h4 className={styles.title}>Professional</h4>
                  <p className={styles.proName}>
                    <img
                      src={pro_Avatar}
                      alt="pro_Avatar"
                      className={styles.pro_Avatar}
                    />
                    {salon.professional}
                  </p>
                </div>
              </div>
            </div>
            <hr className={styles.line} />
          </>
        )}
        {/* payment status , card buttons  */}
        <div className={styles.status}>
          <div className={styles.paymentStatus}>
            <h4>
              {(salon.paymentStatus === "Paid" ||
                (salon.paymentStatus === "Refund" && !salon.onSite)) && (
                <img src={checkCircleFill} alt="Payment Icon" />
              )}
              {salon.paymentStatus}:{" "}
              <span className={styles.amount}>{salon.amount}</span>
              {salon.onSite ? "(on-site payment)" : ""}
            </h4>
          </div>
          <div
            className={`${
              cardType != "Upcoming" ? styles.writeReview_mobo : styles.d_none
            }`}
            onClick={() => handleModal("WriteReview")}
          >
            Write a review
          </div>
          <div className={styles.buttons}>

          <SecondaryButton
              children={cardType == "Upcoming" ? "Cancel" : "Help"}
              onClick={
                cardType == "Upcoming"
                  ? () => handleModal("CancelAppointment")
                  : () => handleModal("HelpAppointment")
              }
            />
            <PrimaryButton
              children={cardType == "Upcoming" ? "Reschedule" : "Book again"}
              onClick={
                cardType == "Upcoming"
                  ? () => handleModal("RescheduleAppointment")
                  : () => handleModal("BookAgainModal")
              }
            />
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
