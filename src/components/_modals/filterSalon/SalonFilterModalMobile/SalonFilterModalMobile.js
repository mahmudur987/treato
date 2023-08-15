import React, { useState } from "react";
import styles from "./SalonFilterModalMobile.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Close } from "../../../../assets/images/SalonsPageImages";
import { closeModal } from "../../../../redux/slices/filterModals/filterModal";
import SecondaryButton from "../../../Buttons/SecondayButton/SecondaryButton";
import PrimaryButton from "../../../Buttons/PrimaryButton/PrimaryButton";
import { updateSalonContent } from "../../../../redux/slices/salons";

const SalonFilterModalMobile = () => {
  const modal = useSelector((state) => state.modal);
  const salonsState = useSelector((state) => state.salons);

  const [selectedSortOption, setSelectedSortOption] = useState("");
  const [selectedVenueType, setSelectedVenueType] = useState("");

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
        {modal.modalContent == "sortBy" && (
          <div className={styles.sortBy}>
            <div className={styles.header}>
              <h4>Sort By</h4>
              <img src={Close} alt="close" onClick={handleCloseModal} />
            </div>

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
        )}

        {modal.modalContent == "price" && (
          <div className={styles.Price}>
            <div className={styles.header}>
              <h4>Maximum Price</h4>
              <img src={Close} alt="close" onClick={handleCloseModal} />
            </div>
            <div className={styles.PriceInfo}>
              <h4>Set maximum price</h4>
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
        )}

        {modal.modalContent == "venue" && (
          <div className={styles.venueType}>
            <div className={styles.header}>
              <h4>Venue type</h4>
              <img src={Close} alt="close" onClick={handleCloseModal} />
            </div>
            <div className={styles.venueButtons}>
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
                  onChange={() => setSelectedVenueType("everyone")}
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
                  onChange={() => setSelectedVenueType("female")}
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
                  onChange={() => setSelectedVenueType("male")}
                />
                Male only
              </label>
            </div>
          </div>
        )}
        <div className={styles.buttons}>
          <SecondaryButton
            children={"Reset"}
            className={styles.reset}
            func={handleCloseModal}
          />
          <div onClick={handleApplyFilter}>
          <PrimaryButton children={"Apply"} className={styles.apply}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalonFilterModalMobile;
