import React, { useState, useEffect, memo } from "react";
import styles from "./Salon.module.css";
import { chevronright } from "../../../assets/images/icons";
import mapBlue from "../../../assets/images/SalonDetail/mapBlue.svg";
import { starBlack } from "../../../assets/images/SalonsPageImages";
import { Link } from "react-router-dom";
import img1 from "../../../assets/images/SalonsPageImages/cardImage.webp";
import { useSelector } from "react-redux";

const Salon = ({ salonData, place }) => {
  const openMapInNewWindow = () => {
    if (salonData) {
      const mapUrl = `https://www.google.com/maps/place/${salonData?.location?.coordinates[0]},${salonData?.location?.coordinates[1]}`;
      window.open(mapUrl, "_blank");
    }
  };
  const userDetails = useSelector((state) => state.user);

  const generateDistance = () => {
    const Distance = (salonData?.distances * 10).toFixed(1);
    return parseFloat(Distance);
  };

  // State to hold the random distance
  const [Distance, setDistance] = useState(generateDistance());

  // Function to update the random distance
  const updateDistance = () => {
    setDistance(generateDistance());
  };
  useEffect(() => {
    updateDistance();
  }, [Distance]);
  const salonImage = salonData.salon_Img.find((x) => {
    if (x.isPrimary) {
      return x;
    }
    return null;
  });
  // console.log(salonData);
  return (
    <>
      <div
        className={`${styles.card} ${
          place === "homePage" ? styles.card_Home : ""
        }`}
      >
        <Link to={salonData ? `/salons/${salonData._id}` : null}>
          <img
            loading="lazy"
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
            to={salonData ? `/salons/${salonData._id}` : null}
            className={`${styles.Name} ${
              place === "homePage" ? styles.Name_Home : ""
            }`}
          >
            {salonData.salon_name ? salonData.salon_name : "Salon Name"}
          </Link>
          <h4 className={styles.ratings}>
            {salonData.rating} <img loading="lazy" src={starBlack} alt="star" />{" "}
            ({salonData.total_rating} ratings)
          </h4>
          {userDetails?.user.isLocationAllow && (
            <h4 className={styles.location}>
              {salonData?.location_details?.location}
            </h4>
          )}
        </div>
        {place !== "homePage" ? (
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
              <Link to={salonData ? `/salons/${salonData._id}` : null}>
                <button className={styles.viewDetails}>
                  View details
                  <img loading="lazy" src={chevronright} alt="chevronRight" />
                </button>
              </Link>
              <button className={styles.viewMap} onClick={openMapInNewWindow}>
                View on map
                <img loading="lazy" src={mapBlue} alt="mapPin" />
              </button>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default Salon;
export const MemoizedSalon = memo(Salon);
