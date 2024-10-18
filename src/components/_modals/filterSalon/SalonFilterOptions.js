import React from "react";
// import styles from "./SalonFilterOptions.module.css";
import { Close } from "../../../assets/images/SalonsPageImages";
import SecondaryButton from "../../Buttons/SecondaryButton/SecondaryButton";
import PrimaryButton from "../../Buttons/PrimaryButton/PrimaryButton";
import {  useSelector } from "react-redux";

const SalonFilterOptions = ({
  isMobile,
  selectedSortOption,
  setSelectedSortOption,
  percentage,
  handlePercentageChange,
  calculatedPrice,
  selectedVenueType,
  setSelectedVenueType,
  handleApplyFilter,
  handleCloseModal,
  styles,
  resetFilters,
}) => {
  const modal = useSelector((state) => state.salonModal);
  const userDetails = useSelector((state) => state.user);

const RecommendedOption =()=>{
  setSelectedSortOption("Recommended")
}
const NearestOption =()=>{
  setSelectedSortOption("Nearest to me")
}
const ratingOption =()=>{
  setSelectedSortOption("Ratings")
}

const vanueMaleType = ()=>{
  setSelectedVenueType("male")
}
const vanuefemaleType = ()=>{
  setSelectedVenueType("female")
}
const vanueType = ()=>{
  setSelectedVenueType("everyone")
}

  return (
    <div className={styles.filterOptions}>
      {(modal.modalContent === "sortBy" && isMobile) ||
      (modal.modalContent === "all" && !isMobile) ? (
        <div className={styles.sortBy}>
          {isMobile ? (
            <div className={styles.header}>
              <h4>Sort by</h4>
              <img loading="lazy" src={Close} alt="close" onClick={handleCloseModal} />
            </div>
          ) : (
            <h4>Sort by</h4>
          )}

          <label>
            <input
              type="radio"
              name="sortOption"
              value="Recommended"
              checked={selectedSortOption === "Recommended"}
              onChange={RecommendedOption}
            />
            Recommended
          </label>
          {userDetails?.user?.isLocationAllow && (
            <label>
              <input
                type="radio"
                name="sortOption"
                value="Nearest to me"
                checked={selectedSortOption === "Nearest to me"}
                onChange={NearestOption}
              />
              Nearest to me
            </label>
          )}
          <label>
            <input
              type="radio"
              name="sortOption"
              value="Ratings"
              checked={selectedSortOption === "Ratings"}
              onChange={ratingOption}
            />
            Ratings (High to Low)
          </label>
        </div>
      ) : (
        ""
      )}

      {(modal.modalContent === "price" && isMobile) ||
      (modal.modalContent === "all" && !isMobile) ? (
        <div className={styles.Price}>
          {isMobile && (
            <div className={styles.header}>
              <h4>Maximum Price</h4>
              <img loading="lazy" src={Close} alt="close" onClick={handleCloseModal} />
            </div>
          )}
          <div className={styles.PriceInfo}>
            {isMobile ? <h4>Set maximum price</h4> : <h4>Price</h4>}

            <span>₹{calculatedPrice}</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={percentage}
            onChange={handlePercentageChange}
          />
        </div>
      ) : (
        ""
      )}

      {(modal.modalContent === "venue" && isMobile) ||
      (modal.modalContent === "all" && !isMobile) ? (
        <div className={styles.venueType}>
          {isMobile ? (
            <div className={styles.header}>
              <h4>Venue type</h4>
              <img loading="lazy" src={Close} alt="close" onClick={handleCloseModal} />
            </div>
          ) : (
            <h4>Venue type</h4>
          )}

          {/* {!isMobile && ( */}
          <div className={styles.venueButtons}>
            {isMobile ? (
              <>
                <label
                  className={`${styles.everyone} ${
                    selectedVenueType === "everyone" ? styles.active : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="venueType"
                    value="everyone"
                    checked={selectedVenueType === "everyone"}
                    onChange={vanueType}
                  />
                  Everyone
                </label>
                <label
                  className={`${styles.female} ${
                    selectedVenueType === "female" ? styles.active : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="venueType"
                    value="female"
                    checked={selectedVenueType === "female"}
                    onChange={vanuefemaleType}
                  />
                  Female only
                </label>
                <label
                  className={`${styles.male} ${
                    selectedVenueType === "male" ? styles.active : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="venueType"
                    value="male"
                    checked={selectedVenueType === "male"}
                    onChange={vanueMaleType}
                  />
                  Male only
                </label>
              </>
            ) : (
              <>
                <button
                  className={`${styles.everyone} ${
                    selectedVenueType === "everyone" ? styles.active : ""
                  }`}
                  onClick={vanueType}
                >
                  Everyone
                </button>
                <button
                  className={`${styles.female} ${
                    selectedVenueType === "female" ? styles.active : ""
                  }`}
                  onClick={vanuefemaleType}
                >
                  Female only
                </button>
                <button
                  className={`${styles.male} ${
                    selectedVenueType === "male" ? styles.active : ""
                  }`}
                  onClick={vanueMaleType}
                >
                  Male only
                </button>
              </>
            )}
          </div>
          {/* )} */}
        </div>
      ) : (
        ""
      )}

      {/* Render different buttons based on whether it's mobile or desktop */}
      {isMobile ? (
        <div className={styles.buttons}>
          <SecondaryButton
            children={"Reset"}
            className={styles.reset}
            func={resetFilters}
          />
          <div onClick={handleApplyFilter}>
            <PrimaryButton children={"Apply"} className={styles.apply} />
          </div>
        </div>
      ) : (
        <div className={styles.buttons}>
          <SecondaryButton
            children={"Cancel"}
            className={styles.cancel}
            onClick={handleCloseModal}
          />
          <div onClick={handleApplyFilter}>
            <PrimaryButton children={"Apply"} className={styles.apply} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SalonFilterOptions;
