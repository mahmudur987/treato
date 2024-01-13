import React, { useState, useEffect } from "react";
import styles from "../../HomePage/Hero/hero.module.css";
import navstyles from "./MainSearchBar.module.css";
import Treatments from "../../HomePage/Hero/SearchContent/Treatments";
import Venues from "../../HomePage/Hero/SearchContent/Venues";
import Locations from "../../HomePage/Hero/SearchContent/Locations";
import Search_MoboModal from "../../HomePage/Hero/Search_MoboModal/Search_MoboModal";
import {
  closeIcon,
  mapPin,
  mapPinBlue,
  search,
  arrowleft
} from "../../../assets/images/icons";
import { getAllServices } from "../../../services/Services";
import { salon } from "../../../services/salon";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import SalonSearchLocationModal from "../../HomePage/Hero/Search_MoboModal/SalonSearchLocationModal";
import { useSelector } from "react-redux";

const MainSearchBar = ({ place }) => {
  // Short letter abbreviations used in few classNames
  // trt: Treatment
  // vn: Venues
  // loc: Location
  const [locationInputValue, setLocationInputValue] = useState("");
  const [treatmentInputValue, setTreatmentInputValue] = useState("");
  const [Trt_DesktopModal, setTrt_DesktopModal] = useState(false);
  const [Trt_MoboModal, setTrt_MoboModal] = useState(false);
  const [loc_DesktopModal, setloc_DesktopModal] = useState(false);
  const [loc_MoboModal, setloc_MoboModal] = useState(false);
  const [allServices, setallServices] = useState([]);
  const [allSalonList, setallSalonList] = useState([]);
  const [filteredServiceData, setFilteredServiceData] = useState([]);
  const [filteredSalonData, setFilteredSalonData] = useState([]);
  const [locationLat, setlocationLat] = useState("");
  const [locationLng, setlocationLng] = useState("");
  const [datanav, setDataNav] = useState()

  const userDetails = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  let [winWidthMain, updateWinWidthMain] = useState(window.innerWidth);
  function reportWindowSize() {
    let winWidth = window.innerWidth;
    updateWinWidthMain(winWidth);
  }
  window.onresize = reportWindowSize;
  // functions to open/Close desktop search modal
  const handle_openTrt_Modal = () => {
    if (window.innerWidth >= 770) {
      setTrt_DesktopModal(true);
    } else {
      setTrt_MoboModal(true);
      document.body.style.overflow = "hidden";
    }
  };
  const handle_closeTrt_Modal = () => {
    setTrt_DesktopModal(false);
    setTrt_MoboModal(false);
    document.body.style.overflow = "auto";
  };
  // functions to open/Close desktop location modal
  const handle_openloc_Modal = () => {
    if (window.innerWidth >= 770) {
      setloc_DesktopModal(true);
    } else {
      setloc_MoboModal(true);
      document.body.style.overflow = "hidden";
    }
  };
  const handle_closeloc_Modal = () => {
    setloc_DesktopModal(false);
    setloc_MoboModal(false);
    document.body.style.overflow = "auto";
  };

  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  // Get the 'services' and 'location' query parameters
  const servicesParam = searchParams.get("service");
  const locationParam = searchParams.get("location");
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
    console.log(e.target.value);
    if (e.target.value === "") {
      setloc_DesktopModal(false);
      setLocationInputValue(e.target.value);
      setValue(e.target.value);
      return;
    }
    // Update the keyword of the input element
    setLocationInputValue(e.target.value);
    setValue(e.target.value);
    handle_openloc_Modal();
  };

  const handleSelectCurrentLocation = () => {
    setLocationInputValue("Current Location");
    setValue("Current Location");
    clearSuggestions();
    setlocationLat(userDetails?.latitude);
    setlocationLng(userDetails?.longitude);
    setloc_DesktopModal(false);
  };
  const handleSelect =
    ({ description }) =>
    () => {
      // When the user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter to "false"
      console.log(description);
      setLocationInputValue(description);
      setValue(description, false);
      clearSuggestions();

      // Get latitude and longitude via utility functions
      getGeocode({ address: description }).then((results) => {
        const { lat, lng } = getLatLng(results[0]);
        setlocationLat(lat);
        setlocationLng(lng);
        console.log("📍 Coordinates: ", { lat, lng });
      });
      setloc_DesktopModal(false);
    };

  const renderSuggestions = () =>
    data?.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li
          key={place_id}
          onClick={handleSelect(suggestion)}
          className={styles.locationList}
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });
  // -----------------------------------------

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
    if (servicesParam || locationParam) {
      setTreatmentInputValue(servicesParam);
      setLocationInputValue(locationParam);
      setValue(locationParam);
    }
  }, []);

  useEffect(() => {
    const fetchSalons = async () => {
      try {
        const result = await salon();
        if (result.res) {
          const { data } = result.res; // Destructure 'data' from 'result.res'
          const { salons } = data; // Destructure 'salons' from 'data'
          setallSalonList(salons);
          setFilteredSalonData(salons);
        }
      } catch (error) {
        // Handle any errors here
        console.error("Error fetching salons:", error);
      }
    };

    fetchSalons();
  }, []);
  const handleTreatmentsInput = (e) => {
    const inputValue = e.target.value;
    setTreatmentInputValue(inputValue);

    // Filter the data based on the input value
    const filtered = allServices.filter((item) =>
      item.service_name.toLowerCase().includes(inputValue.toLowerCase())
    );

    setFilteredServiceData(filtered);
  };

  const handleLocationInput = (e) => {
    const inputValue = e.target.value;
    setLocationInputValue(inputValue);

    // Create a Set to store unique locationText values
    const uniqueLocations = new Set();
    

    // Filter the data and add unique locationText values to the Set
    const filtered = allSalonList.filter((item) => {
      const locationText = item.locationText.toLowerCase();
      if (
        !uniqueLocations.has(locationText) &&
        locationText.includes(inputValue.toLowerCase())
      ) {
        uniqueLocations.add(locationText);
        return true;
      }
      return false;
    });

    setFilteredSalonData(filtered);
  };
  const handleSearch = () => {
    if (locationInputValue === "" && treatmentInputValue === "") {
      // Navigate to /salons with services and location as query parameters
      toast.info("Please fill input fields to proceed. !");
    } else {
      console.log(locationInputValue, treatmentInputValue);
      if (value != "") {
        //if we have value in location input
        getGeocode({ address: value }).then((results) => {
          const { lat, lng } = getLatLng(results[0]);
          setlocationLat(lat);
          setlocationLng(lng);
         
          navigate(
            `/salons?service=${treatmentInputValue}&lat=${lat ? lat : ""}&lng=${
              lng ? lng : ""
            }&location=${locationInputValue}`
          );
        });
      } else {
        //if we  dont have value in location input
        navigate(
          `/salons?service=${treatmentInputValue}&lat=${locationLat}&lng=${locationLng}&location=${locationInputValue}`
        );
      }
    }
  };

  return (
    <>
      <div
        className={`${styles.inputWrapper} ${
          place === "navbar" ? navstyles.navbarInputWrapper : ""
        }`}
      >
        {/* search Treatments */}
        <div className={styles["searchTreatment"]}>
          <div className={styles["inputIcon"]}>
          {/* { navigate(
            `/salons?service=${treatmentInputValue}&lat=${lat ? lat : ""}&lng=${
              lng ? lng : ""
            }&location=${locationInputValue}`
          )?<Link to="/"><img src={arrowleft}  alt="arrowleft" /></Link>: <img src={search} alt="search" />} */}
            {location.pathname === "/salons"?<Link to="/"><img src={arrowleft}  alt="arrowleft" /></Link>: <img src={search} alt="search" />}
            {/* {locationLng&&locationLat ?<img src={arrowleft}  alt="arrowleft" />: <img src={search} alt="search" />} */}
            {/* <img src={arrowleft} alt="arrowleft" /> */}
          </div>
          <input
            className={styles["treatmentInput"]}
            placeholder={
              winWidthMain > 767
                ? "Search treatments or venues"
                : "Treatments or venues"
            }
            value={treatmentInputValue}
            onChange={handleTreatmentsInput}
            onClick={handle_openTrt_Modal}
          />

          {/* Treatment search Desktop box/Modal*/}
          <div
            className={`${styles["treatmentsResults"]} ${
              Trt_DesktopModal ? "" : styles["hidden"]
            }`}
          >
            {/* treatments Content*/}
            <Treatments
              allServices={filteredServiceData}
              setTreatmentInputValue={setTreatmentInputValue}
              handle_close={handle_closeTrt_Modal}
            />
          </div>

          <img
            src={closeIcon}
            className={`${styles["close_trtBox"]} ${
              Trt_DesktopModal ? "" : styles["hidden"]
            }`}
            onClick={handle_closeTrt_Modal}
            alt="closeIcon"
          />
        </div>

        <div className={styles["centerLine"]}></div>

        {/* search location */}
        <div className={styles["searchlocation"]}>
          <div className={styles["inputIcon"]}>
            <img src={mapPin} alt="mapPinImg" />
          </div>
          <input
            className={styles["locationInput"]}
            placeholder={
              winWidthMain > 767 ? "Search by location" : "Current location"
            }
            onClick={() => {
              if (winWidthMain < 767) {
                handle_openloc_Modal();
              }
            }}
            // value={locationInputValue}
            // onChange={handleLocationInput}
            value={value}
            onChange={winWidthMain > 767 ? handleInput : ""}
            disabled={!ready}
          />
          <img
            className={`${styles["close_trtBox"]} ${
              loc_DesktopModal ? "" : styles["hidden"]
            }`}
            onClick={handle_closeloc_Modal}
            src={closeIcon}
            alt="closeIcon"
          />

          <button
            className={`${styles["goSearch"]} ${
              value !== "" || treatmentInputValue !== ""
                ? navstyles["blueButton"]
                : ""
            }`}
            onClick={handleSearch}
          >
            Go
          </button>
          {/*  location Desktop box/Modal */}
          <div
            className={`${styles["locationResults"]} ${
              loc_DesktopModal ? "" : styles["hidden"]
            }`}
          >
            {status === "OK" && (
              <ul className={styles.locationUl}>
                {userDetails?.isLocationAllow && (
                  <li
                    className={`${styles.locationList} ${styles.CurrentLocation}`}
                    onClick={handleSelectCurrentLocation}
                  >
                    <img src={mapPinBlue} alt="pinIcon"></img>
                    Current Location
                  </li>
                )}
                <>{renderSuggestions()}</>
              </ul>
            )}
          </div>
        </div>

        {/* mobo search button */}
        <button className={styles["moboSearchBtn"]} onClick={handleSearch}>
          Search
        </button>
      </div>
      {Trt_MoboModal && (
        <Search_MoboModal
          handle_close={handle_closeTrt_Modal}
          setShow_Modal={setloc_MoboModal}
          show_Modal={loc_MoboModal}
          title="Treatment or venue"
          placeholderText="Treatments or venues"
          icon={search}
          setTreatmentInputValue={setTreatmentInputValue}
        />
      )}
      {loc_MoboModal && (
        <SalonSearchLocationModal
          handle_close={handle_closeloc_Modal}
          setShow_Modal={setloc_MoboModal}
          show_Modal={loc_MoboModal}
          title="Search by location"
          placeholderText="Current location"
          icon={mapPin}
          setLocationInputValue={setLocationInputValue}
          allSalonList={filteredSalonData}
          handleLocationInput={handleLocationInput}
          setlocationLat={setlocationLat}
          setlocationLng={setlocationLng}
          setlocationValue={setValue}
        />
      )}
    </>
  );
};

export default MainSearchBar;
