import React, { memo, useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { weekday: "short", month: "short", day: "numeric" };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
  return formattedDate;
};
const AppointmentCard = ({ salon, cardType }) => {
  // Dynamic Content Rendering Based on cardType(prop)

  const navigate = useNavigate();

  const [toggleDetails, settoggleDetails] = useState(false);
  const [toggleoptions, settoggleoptions] = useState(false);
  const dispatch = useDispatch();

  const handleHelp = () => {
    navigate("/contactus");
  };

  const handleModal = (buttonType) => {
    console.log(buttonType);

    dispatch(openModal({ type: `${buttonType}`, closable: true, data: salon }));
  };
  // console.log(salon);

  const toggleDeatils = () => {
    settoggleDetails(!toggleDetails);
  };
  const clickWriteReview = () => {
    handleModal("WriteReview");
  };
  const handleChange = () => {
    settoggleoptions(!toggleoptions);
  };

  return (
    <div className={styles.cardWrapper}>
      {salon?.otp && cardType === "Upcoming" && (
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
                loading="lazy"
                src={x.salon_Img?.public_url ?? x.salon_Img[0].public_url}
                className={styles.frame1}
                alt="frame1"
              />
              <div className={styles.salon}>
                <h4 className={styles.name}>{x.salon_name}</h4>
                <h5 className={styles.location}>{x.locationText}</h5>
                <div className={styles.timing}>
                  <img loading="lazy" src={clock} alt="clock" />
                  <p>
                    <span>{formatDate(salon?.start_date)}</span>
                    <span>at</span>
                    <span> {salon.bookingTime}</span>
                  </p>
                  <button
                    onClick={toggleDeatils}
                    className={styles.toggledetails}
                  >
                    {!toggleDetails && (
                      <>
                        View details{" "}
                        <img
                          loading="lazy"
                          src={chevronDownBlue}
                          alt="chevronUpBlue"
                        />
                      </>
                    )}
                    {toggleDetails && (
                      <>
                        Hide details{" "}
                        <img
                          loading="lazy"
                          src={chevronUpBlue}
                          alt="chevronUpBlue"
                        />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div
              className={`${
                cardType === "Upcoming" ? styles.moreVertical : styles.d_none
              }`}
            >
              <img
                loading="lazy"
                src={moreVertical}
                alt="moreVertical"
                onClick={handleChange}
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
                cardType === "Completed" ? styles.writeReview : styles.d_none
              }`}
              onClick={clickWriteReview}
            >
              Write a review
            </div>
          </div>
        ))}
        <hr className={styles.line} />
        {/* mobile view salons timing  */}
        <div className={styles.timing_mobo}>
          <img loading="lazy" src={clock} alt="clock" />
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
                <img loading="lazy" src={chevronDownBlue} alt="chevronUpBlue" />
              </>
            )}
            {toggleDetails && (
              <>
                Hide details{" "}
                <img loading="lazy" src={chevronUpBlue} alt="chevronUpBlue" />
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
                          <img loading="lazy" src={cross} alt="cross" />
                          <p className={styles.serviceName}>
                            {item.service_name}
                          </p>
                          <img
                            loading="lazy"
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
                          <img loading="lazy" src={ellipse} alt="ellipse" />
                          <p className={styles.servicePrice}>₹ {item.price}</p>
                          <p
                            className={`${
                              cardType !== "Completed"
                                ? styles.d_none
                                : styles.proName
                            }`}
                          >
                            <img
                              loading="lazy"
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
              {(cardType === "Completed" || cardType === "Upcoming") && (
                <div className={styles.others}>
                  <div className={styles.bookedOn}>
                    <h4 className={styles.title}>Booked on</h4>
                    <p className={styles.dateTime}>
                      {formatDate(salon.end_date) ?? "N/A"} at {salon.time}
                    </p>
                  </div>
                  {salon?.stylistData?.map((x, i) => (
                    <div
                      className={`${styles.Professional} ${
                        cardType === "Completed" ? styles.d_none : ""
                      }`}
                    >
                      <h4 className={styles.title}>Professional</h4>
                      <p className={styles.proName}>
                        <img
                          loading="lazy"
                          src={x?.stylist_Img.public_url}
                          alt="pro_Avatar"
                          className={styles.pro_Avatar}
                        />
                        {x?.stylist_name}
                      </p>
                    </div>
                  ))}
                </div>
              )}
              {cardType === "Cancelled" && (
                <div className={styles.others}>
                  <div className={styles.bookedOn}>
                    <h4 className={styles.title}>Cancelled on</h4>
                    <p className={styles.dateTime}>
                      {formatDate(salon.end_date) ?? "N/A"}
                    </p>
                  </div>
                  {salon?.stylistData?.map((x, i) => (
                    <div
                      className={`${styles.Professional} ${
                        cardType === "Completed" ? styles.d_none : ""
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
              )}
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
                  <img
                    loading="lazy"
                    src={checkCircleFill}
                    alt="Payment Icon"
                  />
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
                <img loading="lazy" src={checkCircleFill} alt="Payment Icon" />
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
                  {salon.final_amount.toFixed(2) ?? "00"}
                </span>
                ({salon.payment_mode})
              </h4>
            )}
          </div>

          <div
            className={`${
              cardType === "Completed" ? styles.writeReview_mobo : styles.d_none
            }`}
            onClick={() => handleModal("WriteReview")}
          >
            Write a review
          </div>
          <div className={styles.buttons}>
            <SecondaryButton
              children={cardType === "Upcoming" ? "Cancel" : "Help"}
              onClick={
                cardType === "Upcoming"
                  ? () => handleModal("CancelAppointment")
                  : () => handleHelp()
              }
            />
            <PrimaryButton
              children={cardType === "Upcoming" ? "Reschedule" : "Book again"}
              onClick={
                cardType === "Upcoming"
                  ? () => handleModal("RescheduleAppointment")
                  : () => navigate(`/salons/${salon?.salonData[0]._id}`)
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
export const MemoizedAppointmentCard = memo(AppointmentCard);
