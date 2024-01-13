import React, { useState, useEffect } from "react";
import styles from "./Salon.module.css";
import {
  chevronright,
  ellipse,
  mapPin,
  mapPinBlue,
  star_line,
} from "../../../assets/images/icons";
import mapBlue from "../../../assets/images/SalonDetail/mapBlue.svg";
import { starBlack } from "../../../assets/images/SalonsPageImages";
import { Link } from "react-router-dom";
import { displayDistance } from "../../../utils/utils";
import { useSelector } from "react-redux";
import { logDOM } from "@testing-library/react";

const Salon = ({ salonData, place }) => {
  const openMapInNewWindow = () => {
    if (salonData) {
      const mapUrl = `https://www.google.com/maps/place/${salonData?.location?.coordinates[0]},${salonData?.location?.coordinates[1]}`;
      window.open(mapUrl, "_blank");
    }
  };
  const userDetails = useSelector((state) => state.user);
  return (
    <div
      className={`${styles.card} ${
        place === "homePage" ? styles.card_Home : ""
      }`}
    >
      <Link to={salonData ? `/salons/${salonData._id}` : null}>
        <img
          src={salonData.salon_image ? salonData.salon_image.public_url : ""}
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
          to={salonData ? `/salons/${salonData._id}` : null}
          className={`${styles.Name} ${
            place === "homePage" ? styles.Name_Home : ""
          }`}
        >
          {salonData.salon_name ? salonData.salon_name : "Salon Name"}
        </Link>
        <h4 className={styles.ratings}>
          {salonData.rating} <img src={starBlack} alt="star" /> (
          {salonData.total_rating} ratings)
        </h4>
        {userDetails?.user.isLocationAllow && (
          <h4 className={styles.location}>
            {salonData?.locationText}
            
          </h4>
        )}
      </div>
      {place != "homePage" ? (
        <>
          <div className={styles.servicesWrapper}>
            {salonData?.services?.map((service, index) => (
              <div className={styles.service} key={index}>
                <div className={styles.details}>
                  <h4 className={styles.serviceName}>
                    {service.service_name
                      ? service.service_name
                      : "Service Name(N/A)"}
                  </h4>
                  <small className={styles.timing}>
                    {service?.service_timing
                      ? service?.service_timing
                      : "45 mins"}
                  </small>
                </div>
                <div className={styles.pricing}>
                  ₹{service?.price ? service.price : 400}
                </div>
              </div>
            ))}
          </div>
          <div className={styles.buttons}>
            <Link to={salonData ? `/salons/${salonData._id}`:null} >
            <button className={styles.viewDetails}>
              View details
              <img src={chevronright} alt="chevronRight" />
            </button>
            </Link>
            <button className={styles.viewMap} onClick={openMapInNewWindow}>
              View on map
              <img src={mapBlue} alt="mapPin" />
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Salon;
