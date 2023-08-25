import React, { useState } from "react";
import styles from "../../HomePage/Hero/hero.module.css";
import navstyles from "./MainSearchBar.module.css";
import Treatments from "../../HomePage/Hero/SearchContent/Treatments";
import Venues from "../../HomePage/Hero/SearchContent/Venues";
import Locations from "../../HomePage/Hero/SearchContent/Locations";
import Search_MoboModal from "../../HomePage/Hero/Search_MoboModal/Search_MoboModal";
import { closeIcon, mapPin, search } from "../../../assets/images/icons";
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
            <img src={search} alt="search" />
          </div>
          <input
            className={styles["treatmentInput"]}
            placeholder="Search treatments or venues"
            value={treatmentInputValue}
            onChange={(e) => setTreatmentInputValue(e.target.value)}
            onClick={handle_openTrt_Modal}
          />

          {/* Treatment search Desktop box/Modal*/}
          <div
            className={`${styles["treatmentsResults"]} ${
              Trt_DesktopModal ? "" : styles["hidden"]
            }`}
          >
            {/* treatments Content*/}
            <Treatments />
            {/* Venues */}
            <Venues />
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
            placeholder="Search by location"
            onClick={handle_openloc_Modal}
            value={locationInputValue}
            onChange={(e) => setLocationInputValue(e.target.value)}
          />
          <img
            className={`${styles["close_trtBox"]} ${
              loc_DesktopModal ? "" : styles["hidden"]
            }`}
            onClick={handle_closeloc_Modal}
            src={closeIcon}
            alt="closeIcon"
          />

          <button className={styles["goSearch"]}>Go</button>

          {/*  location Desktop box/Modal */}
          <div
            className={`${styles["locationResults"]} ${
              loc_DesktopModal ? "" : styles["hidden"]
            }`}
          >
            <Locations />
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
