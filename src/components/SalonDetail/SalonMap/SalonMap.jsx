import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import styles from "../SalonMain/SalonMain.module.css";
import map from "../../../assets/images/SalonDetail/map.svg";
import gmap from "../../../assets/images/SalonDetail/gmap.png";
import mapBlue from "../../../assets/images/SalonDetail/mapBlue.svg";

export default function SalonMap({ SalonData }) {
  const [Latitude, setLatitude] = useState(null);
  const [Longitude, setLongitude] = useState(null);
  useEffect(() => {
    setLatitude(SalonData?.location?.coordinates[0]);
    setLongitude(SalonData?.location?.coordinates[1]);
  }, [SalonData]);
  useEffect(() => {
    console.log(Latitude, Longitude);
  }, [Latitude, Longitude]);

  const containerStyle = {
    width: "100%",
    height: "260px",
  };

  const center = {
    lat: 0, // Default to 0
    lng: 0, // Default to 0
  };
  const openMapInNewWindow = () => {
    if (Latitude && Longitude) {
      const mapUrl = `https://www.google.com/maps/place/${Latitude},${Longitude}`;
      window.open(mapUrl, "_blank");
    }
  };
  return (
    <>
      <div className={styles.salon_MapA}>
        <img src={map} alt="" />
        <div>{SalonData ? SalonData.locationText : null}</div>
      </div>
      <div className={styles.salon_MapB}>
        {Latitude && Longitude ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={{ lat: Latitude, lng: Longitude }}
            zoom={15}
          >
            <Marker
              position={{ lat: Latitude, lng: Longitude }}
              icon={{
                url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png", // URL of the red pin icon
                scaledSize: new window.google.maps.Size(30, 30), // Size of the pin
              }}
            />
          </GoogleMap>
        ) : null}
        <button className={styles.salon_MapBA} onClick={openMapInNewWindow}>
          View on map
          <img src={mapBlue} alt="" />
        </button>
      </div>
    </>
  );
}
