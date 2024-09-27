import React, { memo } from "react";
import styles from "./LookCard.module.css";
import { Link } from "react-router-dom";

const LookCard = ({ data }) => {
  const { image, title, rating, id } = data;

  return (
    <Link to={`/partner/dashboard/edit-look/${id}`}>
      <div className={styles.card} style={{ backgroundImage: `url(${image})` }}>
        <p className={styles.rating}>
          <span>{rating}</span>
          <span className={styles.icon}>★</span>
        </p>

        <div className={styles.text}>
          <p>{title}</p>
        </div>
      </div>
    </Link>
  );
};

export default LookCard;
export const MemoizedLookCard = memo(LookCard);
