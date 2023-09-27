import React, { useState, useEffect } from "react";
import styles from "../../HomePage/Hero/hero.module.css";
import navstyles from "./MainSearchBar.module.css";
import Treatments from "../../HomePage/Hero/SearchContent/Treatments";
import Venues from "../../HomePage/Hero/SearchContent/Venues";
import Locations from "../../HomePage/Hero/SearchContent/Locations";
import Search_MoboModal from "../../HomePage/Hero/Search_MoboModal/Search_MoboModal";
import { closeIcon, mapPin, search } from "../../../assets/images/icons";
import { getAllServices } from "../../../services/Services";
import { salon } from "../../../services/salon";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  let [winWidthMain, updateWinWidthMain] = useState(window.innerWidth);
  function reportWindowSize() {
    let winWidth = window.innerWidth;
    updateWinWidthMain(winWidth)
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
    setTreatmentInputValue("");
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
    setLocationInputValue("");
    setloc_DesktopModal(false);
    setloc_MoboModal(false);
    document.body.style.overflow = "auto";
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

  useEffect(() => {
    const fetchSalons = async () => {
      try {
        const result = await salon();
        if(result.res){
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
      item.service_name[0].toLowerCase().includes(inputValue.toLowerCase())
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
      if (!uniqueLocations.has(locationText) && locationText.includes(inputValue.toLowerCase())) {
        uniqueLocations.add(locationText);
        return true;
      }
      return false;
    });

    setFilteredSalonData(filtered);
  };
  const handleSearch = () => {
    // Navigate to /salons with services and location as query parameters
    navigate(`/salons?services=${treatmentInputValue}&location=${locationInputValue}`);
  }
  return (
    <>
      <div
        className={`${styles.inputWrapper} ${place === "navbar" ? navstyles.navbarInputWrapper : ""
          }`}
      >
        {/* search Treatments */}
        <div className={styles["searchTreatment"]}>
          <div className={styles["inputIcon"]}>
            <img src={search} alt="search" />
          </div>
          <input
            className={styles["treatmentInput"]}
            placeholder={winWidthMain > 767 ? "Search treatments or venues" : "Treatments or venues"}
            value={treatmentInputValue}
            onChange={handleTreatmentsInput}
            onClick={handle_openTrt_Modal}
          />

          {/* Treatment search Desktop box/Modal*/}
          <div
            className={`${styles["treatmentsResults"]} ${Trt_DesktopModal ? "" : styles["hidden"]
              }`}
          >
            {/* treatments Content*/}
            <Treatments
              allServices={filteredServiceData}
              setTreatmentInputValue={setTreatmentInputValue}
              handle_close={handle_closeTrt_Modal}
            />
            {/* Venues */}
            <Venues />
          </div>

          <img
            src={closeIcon}
            className={`${styles["close_trtBox"]} ${Trt_DesktopModal ? "" : styles["hidden"]
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
            placeholder={winWidthMain > 767 ? "Search by location" : "Current location"}
            onClick={handle_openloc_Modal}
            value={locationInputValue}
            onChange={handleLocationInput}
          />
          <img
            className={`${styles["close_trtBox"]} ${loc_DesktopModal ? "" : styles["hidden"]
              }`}
            onClick={handle_closeloc_Modal}
            src={closeIcon}
            alt="closeIcon"
          />

          <button
            className={`${styles["goSearch"]} ${locationInputValue !== "" || treatmentInputValue !== ""
                ? navstyles["blueButton"]
                : ""
              }`}
            onClick={handleSearch}
          >
            Go
          </button>

          {/*  location Desktop box/Modal */}
          <div
            className={`${styles["locationResults"]} ${loc_DesktopModal ? "" : styles["hidden"]
              }`}
          >
            <Locations
              setLocationInputValue={setLocationInputValue}
              allSalonList={filteredSalonData}
              handle_close={handle_closeloc_Modal}
              locationInputValue={locationInputValue}
            />
          </div>
        </div>

        {/* mobo search button */}
        <button className={styles["moboSearchBtn"]}>Search</button>
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
        <Search_MoboModal
          handle_close={handle_closeloc_Modal}
          setShow_Modal={setloc_MoboModal}
          show_Modal={loc_MoboModal}
          title="Search by location"
          placeholderText="Current location"
          icon={mapPin}
        />
      )}
    </>
  );
};

export default MainSearchBar;
