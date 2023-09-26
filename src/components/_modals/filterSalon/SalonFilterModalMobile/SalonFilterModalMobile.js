import React, { useState,useCallback } from "react";
import styles from "./SalonFilterModalMobile.module.css";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../../../redux/slices/filterModals/filterModal";
import SalonFilterOptions from "../SalonFilterOptions";
import usePriceRange, { applyFilters } from "../filterFunctions";
import { resetSalonContent } from "../../../../redux/slices/salons";

const SalonFilterModalMobile = () => {
  const modal = useSelector((state) => state.salonModal);
  const salonsState = useSelector((state) => state.salons);

  const [selectedSortOption, setSelectedSortOption] = useState("");
  const [selectedVenueType, setSelectedVenueType] = useState("");

  const dispatch = useDispatch();
  const handleCloseModal = () => {
    document.body.style.overflow = "auto";
    dispatch(closeModal());
  };
  const resetFilters = ()=>{
    document.body.style.overflow = "auto";
    dispatch(resetSalonContent());
    dispatch(closeModal());
  }
  const handleInnerBoxClick = (event) => {
    event.stopPropagation();
  };

  // handling price range
  // Use the custom hook
  const { percentage, handlePercentageChange, calculatedPrice } = usePriceRange();


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
       <SalonFilterOptions
          isMobile={true} // Set isMobile to true for the mobile version
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
          styles={styles}
          resetFilters={resetFilters}
        />
      </div>
    </div>
  );
};

export default React.memo(SalonFilterModalMobile);
