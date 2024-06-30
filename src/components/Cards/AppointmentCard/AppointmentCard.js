import React, { useEffect, useState } from "react";
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
import { pro_Avatar } from "../../../assets/images/Appointments";
import PrimaryButton from "../../Buttons/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../Buttons/SecondaryButton/SecondaryButton";
import { openModal } from "../../../redux/slices/modal";
import { useDispatch } from "react-redux";

const AppointmentCard = ({ salon, cardType }) => {
  // Dynamic Content Rendering Based on cardType(prop)
  const [toggleDetails, settoggleDetails] = useState(false);
  const [toggleoptions, settoggleoptions] = useState(false);
  const dispatch = useDispatch();
  const handleModal = (buttonType) => {
    console.log(buttonType);
    dispatch(openModal({ type: `${buttonType}`, closable: true, data: salon }));
  };
  // console.log(salon);

  return (
    <div className={styles.cardWrapper}>
      {salon.payment_mode === "on-site" && cardType === "Upcoming" && (
        <div className={styles.shareOTPWrapper}>
          <h3>{salon?.otp}</h3>
          <p>
            is the 4-digit OTP for this booking. Please share the OTP at the
            salon to start the service.
          </p>
        </div>
      )}
      <div className={`${styles.salonCard} ${styles.salonCardUnique}`}>
        {/* salon information */}
        {salon?.salonData?.map((x, i) => (
          <div key={i} className={styles.salonInfo}>
            <div className={styles.infos}>
              <img
                src={x.salon_Img?.public_url ?? x.salon_Img[0].public_url}
                className={styles.frame1}
                alt="frame1"
              />
              <div className={styles.salon}>
                <h4 className={styles.name}>{x.salon_name}</h4>
                <h5 className={styles.location}>{x.locationText}</h5>
                <div className={styles.timing}>
                  <img src={clock} alt="clock" />
                  <p>
                    <span>{salon.start_date}</span>
                    <span>at</span>
                    <span> {salon.time}</span>
                  </p>
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
        ))}
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
              {/* details section */}
              <div className={styles.serviceDetails}>
                <h4 className={styles.title}>Service Details</h4>
                <div className={styles.sDetailWrapper}>
                  {salon?.serviceData.map((item, index) => {
                    console.log(item);

                    return (
                      <div
                        key={index}
                        className={`${styles.sDetail} ${
                          cardType !== "Upcoming"
                            ? styles.flexCol
                            : styles.flexRow
                        }`}
                      >
                        <div className={styles.qty_Name}>
                          <p className={styles.quantity}>
                            {item.quantity ?? 1}
                          </p>
                          <img src={cross} alt="cross" />
                          <p className={styles.serviceName}>
                            {item.service_name}
                          </p>
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
                            {item.time_takenby_service}
                          </p>
                          <img src={ellipse} alt="ellipse" />
                          <p className={styles.servicePrice}>₹ {item.price}</p>
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
                    );
                  })}
                </div>
              </div>
              {/* booked on */}
              <div className={styles.others}>
                <div className={styles.bookedOn}>
                  <h4 className={styles.title}>Booked on</h4>
                  <p className={styles.dateTime}>{salon.end_date ?? "N/A"}</p>
                </div>
                {salon?.stylistData?.map((x, i) => (
                  <div
                    className={`${styles.Professional} ${
                      cardType == "Completed" ? styles.d_none : ""
                    }`}
                  >
                    <h4 className={styles.title}>Professional</h4>
                    <p className={styles.proName}>
                      <img
                        src={x?.stylist_Img.public_url}
                        alt="pro_Avatar"
                        className={styles.pro_Avatar}
                      />
                      {x?.stylist_name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <hr className={styles.line} />
          </>
        )}
        {/* payment status , card buttons  */}
        <div className={styles.status}>
          <div className={styles.paymentStatus}>
            {salon.status === "upcoming" && (
              <h4>
                {salon.payment_mode === "online" && (
                  <img src={checkCircleFill} alt="Payment Icon" />
                )}
                {salon.payment_mode === "online" ? "paid" : "Due"}
                <span className={styles.amount}>
                  {Number(salon.final_amount).toFixed(2) ?? "00"}
                </span>
                ({salon.payment_mode})
              </h4>
            )}
            {salon.status === "completed" && (
              <h4>
                <img src={checkCircleFill} alt="Payment Icon" />
                Paid:{" "}
                <span className={styles.amount}>
                  {salon.final_amount ?? "00"}
                </span>
                ({salon.payment_mode})
              </h4>
            )}
            {salon.status === "cancel" && (
              <h4>
                Refund:{" "}
                <span className={styles.amount}>
                  {salon.final_amount ?? "00"}
                </span>
                ({salon.payment_mode})
              </h4>
            )}
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
                  : () => console.log("booking again modal")
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
