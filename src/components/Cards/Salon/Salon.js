import React, { useState, useEffect, memo } from "react";
import styles from "./Salon.module.css";
import { chevronright } from "../../../assets/images/icons";
import mapBlue from "../../../assets/images/SalonDetail/mapBlue.svg";
import { starBlack } from "../../../assets/images/SalonsPageImages";
import { Link } from "react-router-dom";
import img1 from "../../../assets/images/SalonsPageImages/cardImage.webp";

const Salon = ({ salonData, place }) => {
  const [Distance, setDistance] = useState(
    (salonData.distances * 10).toFixed(1)
  );

  const openMapInNewWindow = () => {
    const mapUrl = `https://www.google.com/maps/place/${salonData.location_details.location}`;
    window.open(mapUrl, "_blank");
  };

  const salonImage = salonData.salon_Img.find((x) => x.isPrimary);

  return (
    <div
      className={`${styles.card} ${
        place === "homePage" ? styles.card_Home : ""
      }`}
      style={{ margin: "0 auto" }}
    >
      <Link to={`/salons/${salonData._id}`}>
        <img
          src={salonImage ? salonImage.public_url : img1}
          alt="cardImage"
          className={`${styles.cardImage} ${
            place === "homePage" ? styles.cardImage_Home : ""
          }`}
        />
      </Link>

      <div
        className={`${styles.salonDetails} ${
          place === "homePage" ? styles.salonDetails_Home : ""
        }`}
      >
        <Link
          to={`/salons/${salonData._id}`}
          className={`${styles.Name} ${
            place === "homePage" ? styles.Name_Home : ""
          }`}
        >
          {salonData.salon_name}
        </Link>
        <h4 className={styles.ratings}>
          {salonData.rating} <img src={starBlack} alt="star" /> (
          {salonData.total_rating} ratings)
        </h4>
        <h4 className={styles.location}>
          {salonData.location_details.location}
        </h4>
      </div>
    </div>
  );
};

export default Salon;
export const MemoizedSalon = memo(Salon);
