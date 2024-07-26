// filterUtils.js

import {
  updateFilterContent,
} from "../../../redux/slices/salons";

import { useState } from "react";

const usePriceRange = () => {
  const [percentage, setPercentage] = useState(0);
  const minPrice = 0;
  const maxPrice = 14999;
  const amountIncrease = Math.round((maxPrice - minPrice) / 100);

  const handlePercentageChange = (event) => {
    const newPercentage = parseInt(event.target.value);
    setPercentage(newPercentage);
  };

  const calculatedPrice = minPrice + percentage * amountIncrease;

  return { percentage, handlePercentageChange, calculatedPrice };
};

export default usePriceRange;

export const applyFilters = (
  selectedSortOption,
  selectedVenueType,
  calculatedPrice,
  salonsState,
  dispatch,
  closeModal
) => {
  // Filter salonContent based on the selected sort option
  let filteredSalons = [...salonsState.searchSalonResults];
  console.log(filteredSalons);

  if (selectedSortOption === "Recommended") {
    filteredSalons = filteredSalons.sort((a, b) => b.rating - a.rating);
  } else if (selectedSortOption === "Nearest to me") {
    // Sort by some other logic
    filteredSalons.sort((a, b) => {
      const distanceA = a.unit === "km" ? a.distances * 1000 : a.distances;
      const distanceB = b.unit === "km" ? b.distances * 1000 : b.distances;
      return distanceA - distanceB;
    });
  } else if (selectedSortOption === "Ratings") {
    // Sort by ratings
    filteredSalons.sort((a, b) => b.rating - a.rating);
  }

  if (calculatedPrice > 0) {
    console.log(calculatedPrice);
    filteredSalons = filteredSalons.filter((salon) =>
      salon.services.some(
        (service) => parseFloat(service.price) < calculatedPrice
      )
    );
  }

  if (selectedVenueType !== "") {
    filteredSalons = filteredSalons.filter((salon) => {
      if (salon.venue_type != "") {
        return salon.venue_type === selectedVenueType;
      }
    });
  }

  // Update the filtered salon content

  // Dispatch the 'updateFilterContent' action with the fetched 'salons' data
  dispatch(updateFilterContent(filteredSalons));
  // Close the modal
  document.body.style.overflow = "auto";
  dispatch(closeModal());
};
