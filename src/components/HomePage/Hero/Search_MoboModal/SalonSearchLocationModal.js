import React, { useState } from "react";
import styles from "./Search_MoboModal.module.css";
import Locations from "../SearchContent/Locations";
import Treatments from "../SearchContent/Treatments";
import Venues from "../SearchContent/Venues";
import {
  arrowleft,
  closeIcon,
  mapPin,
  mapPinBlue,
  search,
  x,
} from "../../../../assets/images/icons";
import { getAllServices } from "../../../../services/Services";
import { useEffect } from "react";
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
  } from "use-places-autocomplete";
  import useOnclickOutside from "react-cool-onclickoutside";
import { useSelector } from "react-redux";

const SalonSearchLocationModal = (props) => {
  const {
    handle_close,
    setShow_Modal,
    show_Modal,
    title,
    placeholderText,
    icon,
    setTreatmentInputValue,
    setLocationInputValue,
    allSalonList,
    handleLocationInput,
    setLocationInput,
    pageName,
    uniqueLocText,
    activeButton,
    setallLookbook,
    setlocationLat,
    setlocationLng,
    setlocationValue
  } = props;
  const [allServices, setallServices] = useState([]);
  const [filteredServiceData, setFilteredServiceData] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(null);
  const userDetails = useSelector((state) => state?.user?.user);

// -----------google map locations----------------
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
    if(e.target.value===""){
      setValue(e.target.value);
      return
      }
      // Update the keyword of the input element
      setValue(e.target.value);
      setlocationValue(e.target.value)
  };
  

  const handleSelectCurrentLocation=()=>{
    setLocationInputValue("Current Location")
    setValue("Current Location")
    setlocationValue("Current Location")
    clearSuggestions();
    setlocationLat(userDetails?.latitude)
    setlocationLng(userDetails?.longitude)
    handle_close()
  }

  const handleSelect =
    ({ description }) =>
    () => {
      // When the user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter to "false"
      console.log(description);
      setLocationInputValue(description)
      setValue(description, false);
      setlocationValue(description, false)
      clearSuggestions();
  
      // Get latitude and longitude via utility functions
      getGeocode({ address: description }).then((results) => {
        const { lat, lng } = getLatLng(results[0]);
        setlocationLat(lat)
        setlocationLng(lng)
        console.log("📍 Coordinates: ", { lat, lng });
      });
      handle_close()
    };
  
  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;
  
      return (
        <li key={place_id} onClick={handleSelect(suggestion)} className={styles.locationList}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });
    // -----------------------------------------


  const handleInputChange = (e) => {
    if (title === "Treatment or venue") {
      const inputValue = e.target.value;
      setInputValue(inputValue);

      // Filter the data based on the input value
      const filtered = allServices.filter((item) =>
        item.service_name.toLowerCase().includes(inputValue.toLowerCase())
      );

      setFilteredServiceData(filtered);
    } else {
      handleLocationInput(e);
    }
  };

  useEffect(() => {
    // Call the getAllServices function when the component mounts
    async function fetchAllServices() {
      try {
        const { res, err } = await getAllServices();

        if (res) {
          // If the request was successful, update the state with the data
          setallServices(res?.data?.data); // Assuming the response data contains a "data" property
          setFilteredServiceData(res?.data?.data);
        } else {
          // If there was an error, handle it and set the error state
          setError(err);
        }
      } catch (error) {
        // Handle unexpected errors here
        setError(error);
      }
    }

    fetchAllServices();
  }, []);

  return (
    <div className={styles["container"]}>
      <div className={styles["modalNav"]}>
        <img loading="lazy"
          src={arrowleft}
          className={styles["arrowLeft"]}
          onClick={handle_close}
          alt="arrowLeft"
        />
      </div>
      <div className={styles["modalHeader"]}>
        <h2>{title}</h2>
        <div className={styles["inputWrapper"]}>
          <img loading="lazy"
            src={icon}
            className={styles["loc_Icon"]}
            onClick={handle_close}
            alt="search"
          />
          <input
            className={styles["loc_Input"]}
            // onChange={handleInputChange}
            placeholder={placeholderText}
            value={value}
            onChange={ handleInput}
            disabled={!ready}
          />
          <img loading="lazy"
            src={closeIcon}
            className={styles["closeInput"]}
            onClick={handle_close}
            alt="closeModal"
          />
        </div>
      </div>
      <div className={styles["modalContent"]}>
        {status === "OK" && (
           <ul className={styles.locationUl}>
        {userDetails?.isLocationAllow &&    <li className={`${styles.locationList} ${styles.CurrentLocation}`} onClick={handleSelectCurrentLocation}>
             <img loading="lazy" src={mapPinBlue} alt="pinIcon"></img>
             Current Location</li>}
            <>{renderSuggestions()}</>
          </ul>
        )}
      </div>
    </div>
  );
};

export default SalonSearchLocationModal;
