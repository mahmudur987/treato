import React, { useState } from "react";
import styles from "./WriteReview.module.css";
import { ellipse, star_line } from "../../../../assets/images/icons";
import { frame1 } from "../../../../assets/images/Appointments";
import PrimaryButton from "../../../Buttons/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../../Buttons/SecondaryButton/SecondaryButton";
import { closeModal } from "../../../../redux/slices/modal";
import { useDispatch } from "react-redux";
import { addReview } from "../../../../services/Appointments";
import { toast } from "react-toastify";
const WriteReview = ({ data }) => {
  const [textareaValue, setTextareaValue] = useState("");
  const [titleValue, settitleValue] = useState("");
  const [rating, setRating] = useState("");
  const [stylistRating, setstylistRating] = useState("");
  // Error states
  const [titleError, setTitleError] = useState("");
  const [textareaError, setTextareaError] = useState("");
  const [ratingError, setRatingError] = useState("");
  const [stylistratingError, setStylistRatingError] = useState("");
  const dispatch = useDispatch();

  const handleStarClick = (value) => {
    setRating(value);
    setRatingError(""); // Clear rating error when the user selects a rating
  };

  const handleStylistStarClick = (value) => {
    setstylistRating(value);
    setStylistRatingError("");
  };

  const handleTitleChange = (event) => {
    settitleValue(event.target.value);
    setTitleError(""); // Clear title error when the user types
  };
  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
    setTextareaError(""); // Clear textarea error when the user types
  };
  const handleSubmit = async () => {
    // Validate input fields
    let isValid = true;

    if (titleValue.trim() === "") {
      setTitleError("Title is required");
      isValid = false;
    }

    if (textareaValue.trim() === "") {
      setTextareaError("Review is required");
      isValid = false;
    }
    if (rating === 0) {
      setRatingError("Rating is required");
      isValid = false;
    }
    if (stylistRating === 0) {
      setStylistRatingError("Rating is required");
    }
    if (isValid) {
      const review = {
        serviceRate: rating,
        stylistRate: stylistRating,
        review: titleValue,
        description: textareaValue,
      };
      const res = await addReview(data._id, review);
      console.log(res);

      if (res.res) {
        dispatch(closeModal());
        toast.success("your review is successfully posted");
      }
      if (res.err) {
        toast.error("Some Error");
      }
    }
  };
  function handleClose() {
    dispatch(closeModal());
  }
  return (
    <div className={styles.WriteReview}>
      <h1 className={styles.modalTitle}>Write a review</h1>
      <div className={styles.modalContent}>
        <div className={styles.salonInfo}>
          <img loading="lazy" src={frame1} alr="frame1" className={styles.salonProfileImg} />
          <div className={styles.details}>
            <h4 className={styles.salonName}>She Hair & Beauty</h4>
            <p className={styles.appointmentDate}>
              Fri, Apr 21 <img loading="lazy" src={ellipse} alt="ellipse" />
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
                    className={`${styles.star} ${
                      value <= rating ? styles.staractive : ""
                    }`}
                    onClick={() => handleStarClick(value)}
                  >
                    <img loading="lazy" src={star_line} alt="star_line" />
                  </span>
                ))}
              </div>
              {ratingError && (
                <div className={styles.errorText}>{ratingError}</div>
              )}
            </label>
          </div>
          <div className={styles.Rating}>
            <label>
              How would you rate the stylist?
              <div class={styles.rating}>
                {[1, 2, 3, 4, 5].map((value) => (
                  <span
                    key={value}
                    className={`${styles.star} ${
                      value <= stylistRating ? styles.staractive : ""
                    }`}
                    onClick={() => handleStylistStarClick(value)}
                  >
                    <img loading="lazy" src={star_line} alt="star_line" />
                  </span>
                ))}
              </div>
              {stylistratingError && (
                <div className={styles.errorText}>{stylistratingError}</div>
              )}
            </label>
          </div>
          <div className={styles.ReviewTitle}>
            <label>
              A title for your review
              <input
                value={titleValue}
                onChange={handleTitleChange}
                placeholder="What’s most important to know?"
                className={styles.titleInput}
              />
              {titleError && (
                <div className={styles.errorText}>{titleError}</div>
              )}
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
                {textareaError && (
                  <div className={styles.errorText}>{textareaError}</div>
                )}
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.button}>
        <div className={styles.buttonWrapper}>
          <SecondaryButton children={"Cancel"} onClick={handleClose} />
          <PrimaryButton children={"Submit"} onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default WriteReview;
