import React, { useState } from "react";
import styles from "./hero.module.css";
import AppStoreImg from "../../../assets/images/HeroSectionImages/AppStore.png";
import PlayStoreImg from "../../../assets/images/HeroSectionImages/PlayStore.png";
import searchImg from "../../../assets/images/HeroSectionImages/search.png";
import mapPinImg from "../../../assets/images/HeroSectionImages/mapPin.png";
import closeButton from "../../../assets/images/HeroSectionImages/x-circle.png";
import mapPinBlue from "../../../assets/images/HeroSectionImages/mapPinBlue.png";
import LocationModal_Mobo from "./Search_MoboModal/Search_MoboModal";
import Locations from "./SearchContent/Locations";
import Treatments from "./SearchContent/Treatments";
import Venues from "./SearchContent/Venues";

export default function HeroSection(props) {
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
    <div className={styles["container"]}>
      <h1 className={`${styles["heroHeading"]}`}>
        Book <span className={styles["headingSpan"]}>beauty</span> and{" "}
        <span className={styles["headingSpan"]}>wellness</span> services near
        you
      </h1>
      <div className={styles["inputWrapper"]}>
        {/* search Treatments */}
        <div className={styles["searchTreatment"]}>
          <div className={styles["inputIcon"]}>
            <img src={searchImg} />
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
            src={closeButton}
            className={`${styles["close_trtBox"]} ${
              Trt_DesktopModal ? "" : styles["hidden"]
            }`}
            onClick={handle_closeTrt_Modal}
          />
        </div>

        <div className={styles["centerLine"]}></div>

        {/* search location */}
        <div className={styles["searchlocation"]}>
          <div className={styles["inputIcon"]}>
            <img src={mapPinImg} alt="mapPinImg" />
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
            src={closeButton}
            alt="closeButton"
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
      {/* Location mobile Modal */}

      {Trt_MoboModal && (
        <LocationModal_Mobo
          handle_close={handle_closeTrt_Modal}
          setShow_Modal={setloc_MoboModal}
          show_Modal={loc_MoboModal}
          title="Treatment or venue"
          placeholderText="Treatments or venues"
        />
      )}
      {loc_MoboModal && (
        <LocationModal_Mobo
          handle_close={handle_closeloc_Modal}
          setShow_Modal={setloc_MoboModal}
          show_Modal={loc_MoboModal}
          title="Search by location"
          placeholderText="Current location"
        />
      )}

      <div className={styles["storeLinks"]}>
        <a>
          <img src={AppStoreImg} alt="AppStoreImg" />
        </a>
        <a>
          <img src={PlayStoreImg} alt="PlayStoreImg" />
        </a>
      </div>
    </div>
  );
}
