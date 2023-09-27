import React, { useEffect, useState } from "react";
import styles from "../hero.module.css";
import { mapPinBlue } from "../../../../assets/images/icons";

const Locations = ({ allSalonList, setLocationInputValue, handle_close,locationInputValue }) => {
  const setinput = (salonLocation) => {
    handle_close();
    setLocationInputValue(salonLocation);
  };
  return (
    <div className={styles["locWrapper"]}>
      <div className={styles["locHeading"]}>
        <img src={mapPinBlue} />
        <h4>Current Location</h4>
      </div>

      <div className={styles["locResults"]}>
        {
          allSalonList ?
          <>
              {allSalonList.map((salon, index) => (
                <div
                  key={index}
                  className={styles["locResultItem"]}
                  onClick={() => setinput(salon.locationText)}
                >
                  <p>{salon.locationText}</p>
                </div>
              ))}
            </>
            :
            locationInputValue!==undefined&&locationInputValue!==''?
            <div className={styles.notFound}>We didn't find a match</div>
            :
            ''
        }
      </div>
    </div>
  );
};

export default Locations;
