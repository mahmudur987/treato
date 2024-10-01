import React, { memo } from "react";
import styles from "./SingleSalon.module.css";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const SingleSalon = ({ salon, refetch }) => {
  return (
    <Link to={`/admin/salon/active/${salon.id}`}>
      <div className={styles.card}>
        <figure className={styles.image}>
          <img loading="lazy" src={salon.salon_image} alt={salon.salon_name} />
        </figure>
        <div className={styles.details}>
          <h2 className={styles.name}>{salon.salon_name}</h2>
          <div className={styles.rating}>
            <span  className={styles.rating} >{salon.salon_rating}</span>
            <FaStar  />
            <span>({salon.salon_ratingCount} ratings)</span>
          </div>
          <div className={styles.address}>{salon.salon_address}</div>
        </div>
      </div>
    </Link>
  );
};

export default SingleSalon;
export const MemoizedSingleSalon = memo(SingleSalon);
