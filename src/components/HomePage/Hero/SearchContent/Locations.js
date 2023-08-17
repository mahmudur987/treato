import React from "react";
import styles from "../hero.module.css";
import { mapPinBlue } from "../../../../assets/images/icons";

const Locations = () => {
  //  location items
  const locations = [
    "Benaluru, Karnataka, India",
    "Kempegowda International Airport Bengaluru (BLR), KIAL Road, Devanahalli, Bengaluru, Karnataka, India",
    "Benaluru, Karnataka, India",
    "Kempegowda International Airport Bengaluru (BLR), KIAL Road, Devanahalli, Bengaluru, Karnataka, India",
    "Benaluru, Karnataka, India",
    "Kempegowda International Airport Bengaluru (BLR), KIAL Road, Devanahalli, Bengaluru, Karnataka, India",
  ];
  return (
    <div className={styles["locWrapper"]}>
      <div className={styles["locHeading"]}>
        <img src={mapPinBlue} />
        <h4>Current Location</h4>
      </div>
      <div className={styles["locResults"]}>
        {locations.map((location, index) => (
          <div key={index} className={styles["locResultItem"]}>
            <p>{location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Locations;
