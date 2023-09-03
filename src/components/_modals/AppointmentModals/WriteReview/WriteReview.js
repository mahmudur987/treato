import React, { useState } from "react";
import styles from "./WriteReview.module.css";
import { ellipse, star_line } from "../../../../assets/images/icons";
import { frame1 } from "../../../../assets/images/Appointments";
import PrimaryButton from "../../../Buttons/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../../Buttons/SecondaryButton/SecondaryButton";
const WriteReview = () => {
  const [textareaValue, setTextareaValue] = useState("");
  const [titleValue, settitleValue] = useState("");
  const [rating, setRating] = useState(0);

  const handleStarClick = (value) => {
    setRating(value);
  };
  // Function to handle textarea changes
  const handleTextareaChange = (event) => {
    const { value } = event.target;
    setTextareaValue(value);
  };
  return (
    <div className={styles.WriteReview}>
      <h1 className={styles.modalTitle}>Write a review</h1>
      <div className={styles.modalContent}>
        <div className={styles.salonInfo}>
          <img src={frame1} alr="frame1" className={styles.salonProfileImg} />
          <div className={styles.details}>
            <h4 className={styles.salonName}>She Hair & Beauty</h4>
            <p className={styles.appointmentDate}>
              Fri, Apr 21 <img src={ellipse} alt="ellipse" />
              <span className={styles.services}>2 services</span>
            </p>
          </div>
        </div>
        <hr className={styles.line} />
        <div className={styles.ReviewWrapper}>
          <div className={styles.Rating}>
            <label>
              How would you rate your service?
              <div class={styles.rating}>
                {[1, 2, 3, 4, 5].map((value) => (
                  <span
                    key={value}
                    className={`${styles.star} ${value <= rating ? styles.staractive : ''}`}
                    onClick={() => handleStarClick(value)}
                  >
                    <img src={star_line} alt="star_line"/>
                  </span>
                ))}
              </div>
            </label>
          </div>
          <div className={styles.ReviewTitle}>
            <label>
              A title for your review
              <input
                value={titleValue}
                onChange={(e) => settitleValue(e.target.value)}
                placeholder="What’s most important to know?"
                className={styles.titleInput}
              />
            </label>
          </div>
          <div className={styles.Review}>
            <div className={styles.Review}>
              <label>
                Write your review
                <textarea
                  value={textareaValue}
                  onChange={handleTextareaChange}
                  placeholder="What did you like or dislike about the treatment or venue?"
                  className={styles.textarea}
                />
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.button}>
        <SecondaryButton children={"Cancel"} />
        <PrimaryButton children={"Submit"} />
      </div>
    </div>
  );
};

export default WriteReview;
