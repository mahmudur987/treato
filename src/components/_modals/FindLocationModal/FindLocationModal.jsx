import React from "react";
import styles from "./FindLocationModal.module.css";
import DarkCross from "../../../assets/images/icons/DarkCross.svg";
import smallMapPin from "../../../assets/images/icons/smallMapPin.svg";
import mapPinBlue from "../../../assets/images/icons/mapPinBlue.svg";
import smallCross from "../../../assets/images/icons/smallCross.svg";
import BasicInput from "../../Input/BasicInput/BasicInput";
import { useState } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useSelector } from "react-redux";
export default function FindLocationModal({
  setAddressModal,
  setlocationModal,
  addressModal,
  setuserAddressText,
}) {
  let closeModal = () => {
    let newAddressModal = { ...addressModal };
    newAddressModal.active = true;
    setAddressModal(newAddressModal);
    setlocationModal(false);
  };
  let [locationValue, setLocationValue] = useState(" ");

  const userDetails = useSelector((state) => state?.user?.user);

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    callbackName: "YOUR_CALLBACK_NAME",
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  });
  const ref = useOnclickOutside(() => {
    // When the user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions();
  });

  const handleInput = (e) => {
    // Update the keyword of the input element
    setValue(e.target.value);
  };

  const handleCurrentLocation = async () => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${userDetails.latitude},${userDetails.longitude}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch address");
      }

      const data = await response.json();

      if (data.results && data.results.length > 0) {
        setuserAddressText(data?.results[0]?.formatted_address);
        clearSuggestions();
        closeModal();
      } else {
        throw new Error("No address found for the given coordinates");
      }
    } catch (error) {
      console.error("Error fetching address:", error.message);
    }
  };

  const handleSelect =
    ({ description }) =>
    () => {
      // When the user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter to "false"
      setValue(description, false);
      setuserAddressText(description);
      clearSuggestions();
      closeModal();
      // Get latitude and longitude via utility functions
      getGeocode({ address: description }).then((results) => {
        const { lat, lng } = getLatLng(results[0]);
        console.log("📍 Coordinates: ", { lat, lng });
      });
    };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <div
          key={place_id}
          onClick={handleSelect(suggestion)}
          className={styles.locationD}
        >
          {main_text} {secondary_text}
        </div>
      );
    });

  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  const center = {
    lat: 0, // Default to 0
    lng: 0, // Default to 0
  };

  return (
    <div className={styles.locationMain}>
      <div className={styles.locationBack}>
        <div className={styles.locationA}>
          <div className={styles.locationAA}>Find your location</div>
          <img src={DarkCross} alt="close" onClick={closeModal} />
        </div>
        <div className={styles.locationB}>
          <img src={smallMapPin} alt="mapPin" />

          <BasicInput Type={"text"} onChange={handleInput} VALUE={value} />
          <img
            src={smallCross}
            alt="smallCross"
            onClick={() => setLocationValue(" ")}
          />
        </div>
        {userDetails.isLocationAllow && (
          <div className={styles.locationC} onClick={handleCurrentLocation}>
            <img src={mapPinBlue} alt="mapPin" />
            <div>Current Location</div>
          </div>
        )}
        {status === "OK" && (
          <div className={styles.locationE}>{renderSuggestions()}</div>
        )}
      </div>
    </div>
  );
}
