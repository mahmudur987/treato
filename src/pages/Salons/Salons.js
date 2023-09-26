import React, { useState, useCallback, useMemo } from "react";
import styles from "./Salons.module.css";
import Salon from "../../components/Cards/Salon/Salon";
import { useDispatch, useSelector } from "react-redux";
import {
  openModal,
  closeModal,
} from "../../redux/slices/filterModals/filterModal";
import {
  filterDeskIcon,
  filter,
  chevronDown,
} from "../../assets/images/SalonsPageImages";
import Pagination from "../../components/pagination/Pagination";
import { salonContent } from "./SalonsContent.js";
import {
  resetSalonContent,
  updateFilterContent,
} from "../../redux/slices/salons";
import { useLocation } from "react-router-dom";
import { salon } from "../../services/salon";
import { useEffect } from "react";
import { fetchSalonsData } from "../../utils/utils";
const Salons = React.memo(() => {
  const salonsState = useSelector((state) => state.salons);
  const salonModal = useSelector((state) => state.salonModal);

  const dispatch = useDispatch();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  // Get the 'services' and 'location' query parameters
  const servicesParam = searchParams.get("services");
  const locationParam = searchParams.get("location");

  // Filter salonContent based on the condition
  let filteredSalonContent;

  useEffect(() => {
    // Check if salonsState.salonContent is empty or undefined
    if (!salonsState.salonContent || salonsState.salonContent.length === 0) {
      // If it's empty, fetch the salons data
      dispatch(fetchSalonsData()).then(() => {
        // After fetching data, calculate filteredSalonContent
        filteredSalonContent = calculateFilteredSalonContent();
        console.log("filteredSalonContent", filteredSalonContent);
        // Dispatch the 'updateFilterContent' action with the filtered salon data
        dispatch(updateFilterContent(filteredSalonContent));
      });
    } else {
      // If salonsState.salonContent is not empty, calculate filteredSalonContent directly
      filteredSalonContent = calculateFilteredSalonContent();
      console.log("filteredSalonContent", filteredSalonContent);
      // Dispatch the 'updateFilterContent' action with the filtered salon data
      dispatch(updateFilterContent(filteredSalonContent));
    }
  }, [dispatch, locationParam, salonsState.salonContent, servicesParam]);
  
  function calculateFilteredSalonContent() {
    return salonsState.salonContent.filter((salonItem) => {
      const matchesServices = !servicesParam || salonItem.services[0].service_name === servicesParam;
      const matchesLocation = !locationParam || salonItem.locationText === locationParam;
  
      return matchesServices && matchesLocation;
    });
  }
  

  const handleOpenModal = useCallback(
    (modalContent) => {
      window.scrollTo(0, 0);
      document.body.style.overflow = "hidden";
      dispatch(openModal(modalContent));
      setCurrentPage(1);
    },
    [dispatch]
  );

  const ITEMS_PER_PAGE = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const items = useMemo(() => {
    // Use useMemo to memoize items
    return Array.from(
      { length: salonsState.filterContent.length },
      (_, index) => `Item ${index + 1}`
    );
  }, [salonsState.filterContent.length]);

  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const visibleItems = items.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const showingStart = startIndex + 1;
  const showingEnd = endIndex <= items.length ? endIndex : items.length;
  let showing = showingStart - showingEnd;

  return (
    <div className={styles.container}>
      {/* mobo filter options */}

      <div className={styles.mobo_filters}>
        <button className={styles.filterIcon}>
          <img src={filter} alt="filter" />
        </button>

        <button
          className={styles.filter}
          onClick={() => handleOpenModal("sortBy")}
        >
          Sort <img src={chevronDown} alt="chevronDown" />
        </button>
        <button
          className={styles.filter}
          onClick={() => handleOpenModal("price")}
        >
          Price <img src={chevronDown} alt="chevronDown" />
        </button>
        <button
          className={styles.filter}
          onClick={() => handleOpenModal("venue")}
        >
          Venue Type <img src={chevronDown} alt="chevronDown" />
        </button>
      </div>
      <div className={styles.venueInfo}>
        <h4>
          Showing{" "}
          {salonsState.filterContent.length > 6
            ? 6
            : salonsState.filterContent.length}{" "}
          of {salonsState.filterContent.length} venues
        </h4>
        <button
          className={styles.filterDesk}
          onClick={() => handleOpenModal("all")}
        >
          <img
            src={filterDeskIcon}
            alt="filterDeskIcon"
            className={styles.filterDeskIcon}
          />
          filter
        </button>
      </div>

      <div className={styles.salonsWrapper}>
        {salonsState.filterContent.length === 0 ? (
          <div className={styles.notFound}>We didn't find a match</div>
        ) : (
          visibleItems?.map((item, index) => (
            <Salon key={index} salonData={salonsState.filterContent[index]} />
          ))
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
});

export default Salons;
