import React, { useState } from "react";
import styles from "./hero.module.css";
import AppStoreImg from "../../../assets/images/HeroSectionImages/AppStore.png";
import PlayStoreImg from "../../../assets/images/HeroSectionImages/PlayStore.png";
import searchImg from "../../../assets/images/HeroSectionImages/search.png";
import mapPinImg from "../../../assets/images/HeroSectionImages/mapPin.png";
import searchblueImg from "../../../assets/images/HeroSectionImages/search_blue.png";
import Frame from "../../../assets/images/HeroSectionImages/Frame1.png";
import closeButton from "../../../assets/images/HeroSectionImages/x-circle.png";
import mapPinBlue from "../../../assets/images/HeroSectionImages/mapPinBlue.png";

export default function HeroSection(props) {
  const [show_TrtResults, setShow_TrtResults] = useState(false);
  const [show_locResults, setShow_locResultsBox] = useState(false);

  const handle_openTrtResultBox = () => {
    setShow_TrtResults(true);
  };
  const handle_closeTrtResultBox = () => {
    setShow_TrtResults(false);
  };

  const handle_openlocResultBox = () => {
    setShow_locResultsBox(true);
  };
  const handle_closelocResultBox = () => {
    setShow_locResultsBox(false);
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
            onClick={handle_openTrtResultBox}
          />

          {/* Treatment search results box*/}

          <div
            className={`${styles["treatmentsResults"]} ${
              show_TrtResults ? "" : styles["hidden"]
            }`}
          >
            {/* treatments */}
            <div className={styles["treatmentsSection"]}>
              <h3>Treatments</h3>
              <div className={styles["trt_results"]}>
                <div className={styles["trt_resultItem"]}>
                  <div>
                    <img src={searchblueImg} />
                  </div>
                  <p>hair extension</p>
                </div>
                <div className={styles["trt_resultItem"]}>
                  <div>
                    <img src={searchblueImg} />
                  </div>
                  <p>hair extension</p>
                </div>
                <div className={styles["trt_resultItem"]}>
                  <div>
                    <img src={searchblueImg} />
                  </div>
                  <p>hair extension</p>
                </div>
                <div className={styles["trt_resultItem"]}>
                  <div>
                    <img src={searchblueImg} />
                  </div>
                  <p>hair extension</p>
                </div>
              </div>
            </div>

            {/* Venues */}
            <div className={styles["venuesSection"]}>
              <h3>Venues</h3>
              <div className={styles["vn_results"]}>
                <div className={styles["vn_resultItem"]}>
                  <div className={styles["vn_itemImage"]}>
                    <img src={Frame} />
                  </div>
                  <div className={styles["vn_itemdetails"]}>
                    <p>WDI Hair Labs</p>
                    <small>25th Cross Road,koramangala</small>
                  </div>
                </div>
                <div className={styles["vn_resultItem"]}>
                  <div className={styles["vn_itemImage"]}>
                    <img src={Frame} />
                  </div>
                  <div className={styles["vn_itemdetails"]}>
                    <p>WDI Hair Labs</p>
                    <small>25th Cross Road,koramangala</small>
                  </div>
                </div>
                <div className={styles["vn_resultItem"]}>
                  <div className={styles["vn_itemImage"]}>
                    <img src={Frame} />
                  </div>
                  <div className={styles["vn_itemdetails"]}>
                    <p>WDI Hair Labs</p>
                    <small>25th Cross Road,koramangala</small>
                  </div>
                </div>
                <div className={styles["vn_resultItem"]}>
                  <div className={styles["vn_itemImage"]}>
                    <img src={Frame} />
                  </div>
                  <div className={styles["vn_itemdetails"]}>
                    <p>WDI Hair Labs</p>
                    <small>25th Cross Road,koramangala</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <img
            src={closeButton}
            className={`${styles["close_trtBox"]} ${
              show_TrtResults ? "" : styles["hidden"]
            }`}
            onClick={handle_closeTrtResultBox}
          />
        </div>

        <div className={styles["centerLine"]}></div>

        {/* search location */}
        <div className={styles["searchlocation"]}>
          <div className={styles["inputIcon"]}>
            <img src={mapPinImg} />
          </div>
          <input
            className={styles["locationInput"]}
            placeholder="Search by location"
            onClick={handle_openlocResultBox}
          />
          <img
            className={`${styles["close_trtBox"]} ${show_locResults ? "" : styles["hidden"]}`}
            onClick={handle_closelocResultBox}
            src={closeButton}
          />

          <button className={styles["goSearch"]}>Go</button>

          {/* current location result box */}

          <div
            className={`${styles["locationResults"]} ${
              show_locResults ? "" : styles["hidden"]
            }`}
          >
            <div className={styles["locHeading"]}>
              <img src={mapPinBlue} />
              <h4>Current Location</h4>
            </div>
            <div className={styles["locResults"]}>
              <div className={styles["locResultItem"]}>
                <p>Benaluru, karnataka, India</p>
              </div>
              <div className={styles["locResultItem"]}>
                <p>
                  Kempegowda International Airport Bengaluru (BLR), KIAL Road,
                  Devanahalli, Bengaluru, Karnataka, India
                </p>
              </div>
              <div className={styles["locResultItem"]}>
                <p>Benaluru, karnataka, India</p>
              </div>
              <div className={styles["locResultItem"]}>
                <p>Benaluru, karnataka, India</p>
              </div>
              <div className={styles["locResultItem"]}>
                <p>
                  Kempegowda International Airport Bengaluru (BLR), KIAL Road,
                  Devanahalli, Bengaluru, Karnataka, India
                </p>
              </div>{" "}
              <div className={styles["locResultItem"]}>
                <p>
                  Kempegowda International Airport Bengaluru (BLR), KIAL Road,
                  Devanahalli, Bengaluru, Karnataka, India
                </p>
              </div>{" "}
              <div className={styles["locResultItem"]}>
                <p>
                  Kempegowda International Airport Bengaluru (BLR), KIAL Road,
                  Devanahalli, Bengaluru, Karnataka, India
                </p>
              </div>{" "}
              <div className={styles["locResultItem"]}>
                <p>
                  Kempegowda International Airport Bengaluru (BLR), KIAL Road,
                  Devanahalli, Bengaluru, Karnataka, India
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* mobo search button */}

        <button className={styles["moboSearchBtn"]}>Search</button>
      </div>
      <div className={styles["storeLinks"]}>
        <a>
          <img src={AppStoreImg} />
        </a>
        <a>
          <img src={PlayStoreImg} />
        </a>
      </div>
    </div>
  );
}
