import React, { useEffect, useState } from "react";
import styles from "../hero.module.css";
import { mapPinBlue } from "../../../../assets/images/icons";
import { getLookbooksByLocations, getNearByUserLookbooks } from "../../../../services/lookbook";
import { useSelector } from "react-redux";

const Locations = ({
  allSalonList,
  setLocationInputValue,
  handle_close,
  locationInputValue,
  setLocationInput,
  pageName,
  uniqueLocText,
  activeButton,
  setallLookbook,
}) => {
  const userDetails = useSelector((state) => state.user);
  const uniqueLocations = {};

  if (allSalonList) {
    allSalonList.forEach((salon) => {
      if (!uniqueLocations[salon.locationText]) {
        uniqueLocations[salon.locationText] = true;
      }
    });
  }

  const filteredSalonList = Object.keys(uniqueLocations);

  const setinput = (location) => {
    handle_close();
    setLocationInputValue(location);
    if (pageName === "Lookbook") {
      setLocationInput(location);
      let data = {
        categoryName: activeButton,
        location,
      };
      getLookbooksByLocations(data).then((res) => {
        let response = res?.res?.data?.data;
        setallLookbook(response);
        console.log(response);
      });
    }
  };


  const handleCurrentLocation = () => {
    if(pageName==="Lookbook"){
      let data = {
        categoryName: activeButton,
        latitude: userDetails?.user?.latitude,
        longitude: userDetails?.user?.longitude,
      };
      getNearByUserLookbooks(data).then((res) => {
        let response = res?.res?.data?.data;
        setallLookbook(response);
        console.log("currentlocation", response);
      });
      setLocationInputValue("Current Location");
    }
    handle_close();
  };

  return (
    <div className={styles["locWrapper"]}>
      {userDetails?.user?.isLocationAllow && (
        <div className={styles["locHeading"]} onClick={handleCurrentLocation}>
          <img src={mapPinBlue} />
          <h4>Current Location</h4>
        </div>
      )}

      {pageName === "Lookbook" ? (
        <div className={styles["locResults"]}>
          {uniqueLocText ? (
            <>
              {uniqueLocText?.map((location, index) => (
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
      ) : (
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
      )}
    </div>
  );
};

export default Locations;
