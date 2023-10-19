import React, { useEffect, useState } from "react";
import styles from "../hero.module.css";
import { mapPinBlue } from "../../../../assets/images/icons";

const Locations = ({
  allSalonList,
  setLocationInputValue,
  handle_close,
  locationInputValue,
  setLocationInput,
  pageName,
  handleGoButtonClick,
}) => {
  const uniqueLocations = {};

  if (allSalonList) {
    allSalonList.forEach((salon) => {
      if (!uniqueLocations[salon.locationText]) {
        uniqueLocations[salon.locationText] = true;
      }
    });
  }

  const filteredSalonList = Object.keys(uniqueLocations);

  const setinput = (salonLocation) => {
    handle_close();
    setLocationInputValue(salonLocation);
    if (pageName === "Lookbook") {
      setLocationInput(salonLocation);
    }
  };
  return (
    <div className={styles["locWrapper"]}>
      <div className={styles["locHeading"]}>
        <img src={mapPinBlue} />
        <h4>Current Location</h4>
      </div>

      <div className={styles["locResults"]}>
        {filteredSalonList ? (
          <>
            {filteredSalonList.map((location, index) => (
              <div
                key={index}
                className={styles["locResultItem"]}
                onClick={() => setinput(location)}
              >
                <p>{location}</p>
              </div>
            ))}
          </>
        ) : locationInputValue !== undefined && locationInputValue !== "" ? (
          <div className={styles.notFound}>We didn't find a match</div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Locations;
