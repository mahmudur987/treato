import React, { useState } from "react";
import styles from "./AddNewReview.module.css";
import { FaStar } from "react-icons/fa";
const AddNewReview = () => {
  const [rating, setRating] = useState(0); // State to store the current rating

  // Function to handle click on a star
  const handleStarClick = (starValue) => {
    setRating(starValue);
  };
  return (
    <div className={styles.container}>
      <h3>Rate She Hair and beauty</h3>
      <p>
        {[...Array(5)].map((_, index) => {
          const starValue = index + 1;
          return (
            <span
              key={index}
              onClick={() => handleStarClick(starValue)}
              style={{
                cursor: "pointer",
                color: starValue <= rating ? "#08090A" : "#ced4da",
              }}
            >
              <FaStar />
            </span>
          );
        })}
      </p>

      <textarea name="" id="" placeholder="Write a review" />

      <button>submit</button>
    </div>
  );
};

export default AddNewReview;
