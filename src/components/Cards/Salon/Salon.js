import React from "react";
import styles from "./Salon.module.css";
import { chevronright, mapPin, star_line } from "../../../assets/images/icons";
import { starBlack } from "../../../assets/images/SalonsPageImages";

const Salon = ({ salonData, place }) => {
  const salon_image = 'https://atgfilestorage.s3.ap-south-1.amazonaws.com/5e9eac23b788af43d167c3de_1587457059872.jpg'
  return (
<div className={`${styles.card} ${place === "homePage" ? styles.card_Home : ""}`}>
      <img
        src={salonData?.salon_Img?salonData?.salon_Img.public_url:salon_image}
        alt="cardImage"
        className={`${styles.cardImage} ${place === "homePage" ? styles.cardImage_Home : ""}`}
      />
      <div 
        className={`${styles.salonDetails} ${place === "homePage" ? styles.salonDetails_Home : ""}`}
      >
        <a href="/salons" className={`${styles.Name} ${place === "homePage" ? styles.Name_Home : ""}`}>{salonData?.salon_name?salonData?.salon_name:'Salon Name'}</a>
        <h4 className={styles?.ratings}>
          {salonData?.rating} <img src={starBlack} alt="star" /> (
          {'1,961'} ratings)
        </h4>
        <h4 className={styles.location}>
          {salonData?.locationText}{" "}
        </h4>
      </div>
      {place != "homePage" ? (
        <>
          <div className={styles.servicesWrapper}>
            {salonData?.services?.map((service, index) => (
              <div className={styles.service} key={index}>
                <div className={styles.details}>
                  <h4 className={styles.serviceName}>{service.service_name}</h4>
                  <small className={styles.timing}>{service?.timing?service?.timing:"45 mins"}</small>
                </div>
                <div className={styles.pricing}>₹{service?.price?service.price:400}</div>
              </div>
            ))}
            {salonData?.services?.map((service, index) => (
              <div className={styles.service} key={index}>
                <div className={styles.details}>
                  <h4 className={styles.serviceName}>{service.service_name}</h4>
                  <small className={styles.timing}>{service?.timing?service?.timing:"45 mins"}</small>
                </div>
                <div className={styles.pricing}>₹{service?.price?service.price:400}</div>
              </div>
            ))}
            {salonData?.services?.map((service, index) => (
              <div className={styles.service} key={index}>
                <div className={styles.details}>
                  <h4 className={styles.serviceName}>{service.service_name}</h4>
                  <small className={styles.timing}>{service?.timing?service?.timing:"45 mins"}</small>
                </div>
                <div className={styles.pricing}>₹{service?.price?service.price:400}</div>
              </div>
            ))}
          </div>
          <div className={styles.buttons}>
            <button className={styles.viewDetails}>
              View details
              <img src={chevronright} alt="chevronRight" />
            </button>
            <button className={styles.viewMap}>
              View on map
              <img src={mapPin} alt="mapPin" />
            </button>
          </div>
        </>
      ) : null   
      }
    </div>
  );
};

export default Salon;
