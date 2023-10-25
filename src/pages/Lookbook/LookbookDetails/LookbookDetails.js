import React from "react";
import styles from "./LookbookDetails.module.css";
import Img1 from "../../../assets/images/LookbookImages/Lookbook2.png";
import { arrowleft, star_line } from "../../../assets/images/icons";
import mask from "../../../assets/images/NavbarImages/Mask.png";
import PrimaryButton from "../../../components/Buttons/PrimaryButton/PrimaryButton";
const LookbookDetails = () => {
    const handleGoBack = () => {
        window.history.back(); // This will navigate back to the previous page in the browser's history
      };
  return (
    <div className={styles.LookbookDetails}>
      <div className={styles.imageSection}>
        <div onClick={handleGoBack}><img src={arrowleft} alt="backBtn"/></div>
        <h3>Salmon, Natural, Medium, Wavey, Afro</h3>
        <div className={styles.rating}>
          4.8 <img src={star_line} alt="starIcon" /> (61 rating)
        </div>
        <p>
          A subtle salmon tinge on curled hairs. Golden long, waist length,
          straight. A subtle salmon tinge on curled hairs. Golden long, waist
          length, straight.
        </p>
        <img src={Img1} alt="Image" className={styles.lookbookImage} />
      </div>
      <div className={styles.paymentContainer}>
        <div className={styles.paymentBox}>
          <div className={styles.salonInfo}>
            <h3>She Hair & Beauty</h3>
            <span>Ejipura, Bengaluru</span>
          </div>
          <hr className={styles.line} />
          <div className={styles.serviceWrap}>
            <div className={styles.serviceInfo}>
              <div className={styles.serviceName}>
                <h4>Hair cut girls</h4>
                <small>45 mins</small>
              </div>
              <span className={styles.serviceAmount}>₹399</span>
            </div>
          </div>
          <hr className={styles.line} />

          <div className={styles.stylistInfo}>
            <img
              src={mask}
              alt="stylistImage"
              className={styles.stylistImage}
            />
            <img
              src={mask}
              alt="stylistImage"
              className={styles.stylistImageOffset1}
            />
            <img
              src={mask}
              alt="stylistImage"
              className={styles.stylistImageOffset2}
            />
            <span> by </span> Name+2
            <span> at </span><span className={styles.salonName}>She Hair & Beauty</span>
          </div>
          <hr className={styles.line} />

          <button className={styles.addVenueBtn}>
            + Add another service from this venue
          </button>
          <PrimaryButton className={styles.bookNow}>Book now</PrimaryButton>
        </div>
        {/* Your payment box content goes here */}
      </div>
    </div>
  );
};

export default LookbookDetails;
