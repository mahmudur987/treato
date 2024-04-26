import React from "react";
import styles from "./SingleSalon.module.css";
import { FaStar } from "react-icons/fa";
const SingleSalon = ({ salon }) => {
  // console.log(salon);

  return (
    <div className={styles.card}>
      <img
        src={salon.salon_image}
        alt={salon.salon_name}
        className={styles.image}
      />
      <div className={styles.details}>
        <h2 className={styles.name}>{salon.salon_name}</h2>
        <div className={styles.rating}>
          {salon.salon_rating} <FaStar />({salon.salon_ratingCount} ratings)
        </div>
        <div className={styles.address}>{salon.salon_address}</div>
      </div>
    </div>
  );
};

export default SingleSalon;
