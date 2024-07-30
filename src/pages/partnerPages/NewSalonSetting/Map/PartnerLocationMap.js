import React from "react";
import styles from "./PartnerLocationmap.module.css";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { GoogleMap, Marker } from "@react-google-maps/api";
export default function PartnerLocationMap({
  defaultProps,
  updateDefaultProps,
  position,
  setPosition,
  setSalonData,
  salonData,
}) {
  const isLoaded = defaultProps.center.lat !== "" ? true : false;

  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  const handleMapClick = async (event) => {
    const latLng = event.latLng;
    const lat = latLng.lat();
    const lng = latLng.lng();
    const clickedAddress = await getAddressFromLatLng(lat, lng);
    console.log(clickedAddress);
    setPosition({ lat, lng });
  };

  const getAddressFromLatLng = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch address");
      }

      const data = await response.json();
      setSalonData({
        ...salonData,
        location: data?.results[0]?.formatted_address,
      });
      console.log(data?.results[0]?.formatted_address);
      console.log({ lat, lng });
    } catch (error) {
      console.error("Error fetching address:", error.message);
      return `Address for ${lat}, ${lng}`;
    }
  };
  console.log(position);
  console.log(defaultProps);
  return (
    <>
      {isLoaded && (
        <div class={styles.addressContainer}>
          <div className={styles.addressMain}>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={{
                lat: defaultProps.center.lat
                  ? defaultProps.center.lat
                  : 19.2856,
                lng: defaultProps.center.lng
                  ? defaultProps.center.lng
                  : 72.8691,
              }}
              zoom={15}
              onClick={handleMapClick}
            >
              {position && <Marker position={position} label="Clicked Point" />}
            </GoogleMap>
          </div>
        </div>
      )}
    </>
  );
}
