import React from "react";
import styles from "./LookCard.module.css";
import { Link } from "react-router-dom";

const LookCard = ({ data }) => {
  const { image, title, rating } = data;

  return (
    <Link to={"/partner/dashboard/edit-look"}>
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
