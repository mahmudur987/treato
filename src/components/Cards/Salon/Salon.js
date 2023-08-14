import React from "react";
import styles from "./Salon.module.css";

const Salon = ({ salonData }) => {
  return (
    <div className={styles.card}>
      <img src={salonData.cardImage} alt="cardImage" className={styles.cardImage} />
      <div className={styles.salonDetails}>
        <h2 className={styles.Name}>{salonData.name}</h2>
        <h4 className={styles.ratings}>
          {salonData.rating} <img src={salonData.star} alt="star" /> ({salonData.ratingsCount} ratings)
        </h4>
        <h4 className={styles.location}>
          {salonData.location} <img src={salonData.ellipse} alt="Ellipse" className={styles.Ellipse} /><span className={styles.meter}>{salonData.distance}</span>
        </h4>
      </div>
      <div className={styles.servicesWrapper}>
        {salonData.services.map((service, index) => (
          <div className={styles.service} key={index}>
            <div className={styles.details}>
              <h4 className={styles.serviceName}>{service.name}</h4>
              <small className={styles.timing}>{service.timing}</small>
            </div>
            <div className={styles.pricing}>{service.price}</div>
          </div>
        ))}
      </div>
      <div className={styles.buttons}>
        <button className={styles.viewDetails}>View details<img src={salonData.chevronRight} alt="chevronRight" /></button>
        <button className={styles.viewMap}>View on map<img src={salonData.mapPin} alt="mapPin" /></button>
      </div>
    </div>
  );
};

export default Salon;
