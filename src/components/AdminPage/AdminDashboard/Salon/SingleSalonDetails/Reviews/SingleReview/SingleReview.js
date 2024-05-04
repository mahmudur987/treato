import React, { useState } from "react";
import styles from "./SingleReview.module.css";
import { FaStar } from "react-icons/fa";
import profileImage from "../../../../../../../assets/images/TeamDetails/ProfileImg.png";
import DeleteReviewModal from "../../../../../../_modals/AdminPage/DeleteReview/DeleteReview";
const SingleReview = ({ data }) => {
  const [count, setCount] = useState(120);
  const [showModal, setShowModal] = useState(false);
  console.log(showModal);

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.profile}>
          <figure>
            <img src={profileImage} alt="" />
          </figure>

          <div className={styles.wrapper}>
            <h5>{data.name}</h5>
            <span>{data?.date}</span>
          </div>
          <button onClick={() => setShowModal(true)} className={styles.delete}>
            Delete Review
          </button>
        </div>
        <div className={styles.ratingWrapper}>
          <p> {data.rating}.0</p>
          {[...Array(data.rating)].map((_, index) => {
            return (
              <span key={index}>
                <FaStar />
              </span>
            );
          })}
        </div>
        <p className={styles.description}>
          {data.description.slice(0, count)}
          {data.description.length > count && (
            <span onClick={() => setCount(data.description.length)}>
              ... view more
            </span>
          )}
        </p>
      </div>

      <DeleteReviewModal
        showModal={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
};

export default SingleReview;
