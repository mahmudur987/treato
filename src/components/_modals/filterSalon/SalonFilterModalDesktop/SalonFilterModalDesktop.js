import React, { useState } from "react";
import styles from "./SalonFilterModalDesktop.module.css";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../../../redux/slices/filterModals/filterModal";
import { Close } from "../../../../assets/images/SalonsPageImages";
import PrimaryButton from "../../../Buttons/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../../Buttons/SecondayButton/SecondaryButton";
import { salonContent } from "../../../../pages/Salons/SalonsContent";
import { updateSalonContent } from "../../../../redux/slices/salons";

const SalonFilterModalDesktop = () => {
  const [selectedSortOption, setSelectedSortOption] = useState("");
  const [selectedVenueType, setSelectedVenueType] = useState("");
  const salonsState = useSelector((state) => state.salons);

  // handle Close Modal
  const dispatch = useDispatch();
  const handleCloseModal = () => {
    document.body.style.overflow = "auto";
    dispatch(closeModal());
  };

  const handleInnerBoxClick = (event) => {
    event.stopPropagation();
  };

  // handling price range
  const [percentage, setPercentage] = useState(0);
  const minPrice = 0;
  const maxPrice = 14999;
  const amountIncrease = Math.round((maxPrice - minPrice) / 100);

  const handlePercentageChange = (event) => {
    const newPercentage = parseInt(event.target.value);
    setPercentage(newPercentage);
  };

  const calculatedPrice = minPrice + percentage * amountIncrease;

  //handling recommended salon function

  const handleApplyFilter = () => {
    // Filter salonContent based on the selected sort option
    let filteredSalons = [...salonsState.salonContent];

    if (selectedSortOption === "Recommended") {
      filteredSalons = filteredSalons.filter(
        (salon) => salon.recommended === true
      );
    } else if (selectedSortOption === "Nearest to me") {
      // Sort by some other logic
      filteredSalons.sort((a, b) => {
        const distanceA = a.unit === "km" ? a.distance * 1000 : a.distance;
        const distanceB = b.unit === "km" ? b.distance * 1000 : b.distance;
        return distanceA - distanceB;
      });
    } else if (selectedSortOption === "Ratings") {
      // Sort by ratings
      filteredSalons.sort((a, b) => b.rating - a.rating);
    }

    if (calculatedPrice > 0) {
      filteredSalons = filteredSalons.filter((salon) =>
        salon.services.some(
          (service) => parseFloat(service.price) < calculatedPrice
        )
      );
    }

    if (selectedVenueType !== "") {
      filteredSalons = filteredSalons.filter(
        (salon) => salon.venueType === selectedVenueType
      );
    }
    console.log(filteredSalons);

    // Update the filtered salon content
    // You can use the filteredSalons array for rendering the filtered salons
    dispatch(updateSalonContent(filteredSalons));
    // Close the modal
    document.body.style.overflow = "auto";
    dispatch(closeModal());
  };

  return (
    <div className={styles.Modal} onClick={handleCloseModal}>
      <div className={styles.innerBox} onClick={handleInnerBoxClick}>
        <div className={styles.header}>
          <h3>Filter</h3>
          <img src={Close} alt="close" onClick={handleCloseModal} />
        </div>
        <div className={styles.filterOptions}>
          <div className={styles.sortBy}>
            <h4>Sort By</h4>
            <label>
              <input
                type="radio"
                name="sortOption"
                value="Recommended"
                checked={selectedSortOption === "Recommended"}
                onChange={() => setSelectedSortOption("Recommended")}
              />
              Recommended
            </label>
            <label>
              <input
                type="radio"
                name="sortOption"
                value="Nearest to me"
                checked={selectedSortOption === "Nearest to me"}
                onChange={() => setSelectedSortOption("Nearest to me")}
              />
              Nearest to me
            </label>
            <label>
              <input
                type="radio"
                name="sortOption"
                value="Ratings"
                checked={selectedSortOption === "Ratings"}
                onChange={() => setSelectedSortOption("Ratings")}
              />
              Ratings (High to Low)
            </label>
          </div>
          <div className={styles.Price}>
            <div className={styles.PriceInfo}>
              <h4>Price</h4>
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
          <div className={styles.venueType}>
            <h4>Venue type</h4>
            <div className={styles.venueButtons}>
              <button
                className={`${styles.everyone} ${
                  selectedVenueType === "everyone" ? styles.active : ""
                }`}
                onClick={() => setSelectedVenueType("everyone")}
              >
                Everyone
              </button>
              <button
                className={`${styles.female} ${
                  selectedVenueType === "female" ? styles.active : ""
                }`}
                onClick={() => setSelectedVenueType("female")}
              >
                Female only
              </button>
              <button
                className={`${styles.male} ${
                  selectedVenueType === "male" ? styles.active : ""
                }`}
                onClick={() => setSelectedVenueType("male")}
              >
                Male only
              </button>
            </div>
          </div>
        </div>
        <div className={styles.buttons}>
          <SecondaryButton
            children={"Cancel"}
            className={styles.cancel}
            func={handleCloseModal}
          />
          <div onClick={handleApplyFilter}>
            <PrimaryButton children={"Apply"} className={styles.apply} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalonFilterModalDesktop;
