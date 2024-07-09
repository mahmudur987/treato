import React, { useState } from "react";
import styles from "./AddNewReview.module.css";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../../../../../../services/axios";
import {
  adminToken,
  useSalonReviews,
} from "../../../../../../../services/superAdmin/Dashboard";
const AddNewReview = () => {
  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const { refetch } = useSalonReviews(id);
  const [isLoading, setIsLoading] = useState(false);
  const handleStarClick = (starValue) => {
    setRating(starValue);
  };

  const handleSubmit = async () => {
    if (!comment || !rating) {
      return toast.error(
        "Your feedback is essential to us! Please remember to write a comment and select your rating."
      );
    }

    const review = {
      comment,
      rating,
      salon_id: id,
    };

    try {
      setIsLoading(true);
      const headers = {
        token: localStorage.getItem("jwtToken"),
      };

      const { data } = await axiosInstance.post(
        "super/createsalonreview",
        review,
        { headers }
      );
      if (data) {
        toast.success("review added successfully");
      }

      refetch();
      setRating(null);
      setComment("");
    } catch (error) {
      console.error("error", error);
      toast.error(error ? error.message : "Error");
    }
    setIsLoading(false);
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

      <textarea
        value={comment}
        placeholder="Write a review"
        onChange={(e) => setComment(e.target.value)}
      />

      <button disabled={isLoading} type="button" onClick={handleSubmit}>
        {isLoading ? "Loading" : " submit"}
      </button>
    </div>
  );
};

export default AddNewReview;
