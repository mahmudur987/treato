import React, { useState } from "react";
import styles from "./SalonFilterModalDesktop.module.css";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../../../redux/slices/filterModals/filterModal";
import { Close } from "../../../../assets/images/SalonsPageImages";
import SalonFilterOptions from "../SalonFilterOptions";
import usePriceRange, { applyFilters } from "../filterFunctions";

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
  // Use the custom hook
  const { percentage, handlePercentageChange, calculatedPrice } = usePriceRange();

  //handling recommended salon function

  const handleApplyFilter = () => {
    applyFilters(
      selectedSortOption,
      selectedVenueType,
      calculatedPrice,
      salonsState,
      dispatch,
      closeModal
    );
  };

  return (
    <div className={styles.Modal} onClick={handleCloseModal}>
      <div className={styles.innerBox} onClick={handleInnerBoxClick}>
        <div className={styles.header}>
          <h3>Filter</h3>
          <img src={Close} alt="close" onClick={handleCloseModal} />
        </div>
        {/* Pass relevant props to SalonFilterOptions */}
        <SalonFilterOptions
          selectedSortOption={selectedSortOption}
          setSelectedSortOption={setSelectedSortOption}
          percentage={percentage}
          handlePercentageChange={handlePercentageChange}
          calculatedPrice={calculatedPrice}
          selectedVenueType={selectedVenueType}
          setSelectedVenueType={setSelectedVenueType}
          handleApplyFilter={handleApplyFilter}
          handleCloseModal={handleCloseModal}
          dispatch={dispatch}
          isMobile={false} // Indicate that it's the desktop version
          styles={styles}
        />
      </div>
    </div>
  );
};

export default SalonFilterModalDesktop;
