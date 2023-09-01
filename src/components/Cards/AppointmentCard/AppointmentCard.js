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
const AppointmentCard = ({ salon,cardType }) => {
  const [toggleDetails, settoggleDetails] = useState(false);

  const [toggleoptions, settoggleoptions] = useState(false);
  return (
    <div className={`${styles.salonCard} ${styles.salonCardUnique}`}>
      <div className={styles.salonInfo}>
        <div className={styles.infos}>
          <img src={frame1} className={styles.frame1} alt="frame1" />
          <div className={styles.salon}>
            <h4 className={styles.name}>{salon.name}</h4>
            <h5 className={styles.location}>{salon.location}</h5>
            <div className={styles.timing}>
              <img src={clock} alt="clock" />
              {salon.dateTime}
              <button onClick={() => settoggleDetails(!toggleDetails)} className={styles.toggledetails}>
                {!toggleDetails && (
                  <>
                    View details{" "}
                    <img src={chevronDownBlue} alt="chevronUpBlue" />
                  </>
                )}
                {toggleDetails && (
                  <>
                    Hide details <img src={chevronUpBlue} alt="chevronUpBlue" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
        <div className={styles.moreVertical}>
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
      </div>
      <hr className={styles.line} />

      {toggleDetails && (
        <>
          <div className={styles.detailSection}>
            <div className={styles.serviceDetails}>
              <h4 className={styles.title}>Service Details</h4>
              <div className={styles.sDetailWrapper}>
                <div className={styles.sDetail}>
                  <p className={styles.quantity}>1</p>
                  <img src={cross} alt="cross" />
                  <p className={styles.serviceName}>Hair cut girls</p>
                  <img src={ellipse} alt="ellipse" />
                  <div>
                  <p className={styles.servicePeriod}>45 mins</p>
                  <img src={ellipse} alt="ellipse" />
                  <p className={styles.servicePrice}>₹399</p>
                <p className={styles.proName}><img src={pro_Avatar} alt="pro_Avatar" className={styles.pro_Avatar}/>{salon.professional}</p>
                  </div>
                </div>
                <div className={styles.sDetail}>
                  <p className={styles.quantity}>1</p>
                  <img src={cross} alt="cross" />
                  <p className={styles.serviceName}>Hair cut girls</p>
                  <img src={ellipse} alt="ellipse" />
                  <p className={styles.servicePeriod}>45 mins</p>
                  <img src={ellipse} alt="ellipse" />
                  <p className={styles.servicePrice}>₹399</p>
                </div>
              </div>
              {/* Add more service details here */}
            </div>
            <div className={styles.others}>
              <div className={styles.bookedOn}>
                <h4 className={styles.title}>Booked on</h4>
                <p className={styles.dateTime}>{salon.bookedOn}</p>
              </div>
              <div className={styles.Professional}>
                <h4 className={styles.title}>Professional</h4>
                <p className={styles.proName}><img src={pro_Avatar} alt="pro_Avatar" className={styles.pro_Avatar}/>{salon.professional}</p>
              </div>
            </div>
          </div>
          <hr className={styles.line} />
        </>
      )}

      <div className={styles.status}>
        <div className={styles.paymentStatus}>
          <h4>
            {salon.paymentStatus == "Paid" && (
              <img src={checkCircleFill} alt="Payment Icon" />
            )}
            {salon.paymentStatus}:{" "}
            <span className={styles.amount}>{salon.amount}</span>
            {salon.paymentStatus=="Due" && <>(on-site payment)</>}
          </h4>
        </div>
        <div className={styles.buttons}>
          <PrimaryButton children={cardType=="Upcoming"?"Reschedule":"Book again"} />
          <SecondaryButton children={cardType=="Upcoming"?"Cancel":"Help"} />
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
