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
  updateSearchSalonResults,
} from "../../redux/slices/salons";
import { useLocation } from "react-router-dom";
import { getSalonListBySearchInput, salon } from "../../services/salon";
import { useEffect } from "react";
import { fetchSalonsData, getfilterSalon } from "../../utils/utils";
const Salons = React.memo(() => {
  const salonsState = useSelector((state) => state.salons);
  const salonModal = useSelector((state) => state.salonModal);
  const userDetails = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  // Get the 'services' and 'location' query parameters
  const servicesParam = searchParams.get("services");
  const locationParam = searchParams.get("location");

  // Filter salonContent based on the condition
  let filteredSalonContent;

  const handleOpenModal = useCallback(
    (modalContent) => {
      window.scrollTo(0, 0);
      document.body.style.overflow = "hidden";
      dispatch(openModal(modalContent));
      setCurrentPage(1);
    },
    [dispatch]
  );

  //pagination codes
  const ITEMS_PER_PAGE = 6;

  //fetching base on search input
  useEffect(() => {
    setIsLoading(true); // Set loading state
    getfilterSalon(
      userDetails,
      "searchBase",
      servicesParam,
      locationParam
    ).then((res) => {
      setIsLoading(false);
      dispatch(updateSearchSalonResults(res))
      dispatch(updateFilterContent(res))
    });
  }, [servicesParam, locationParam]);

  // Memoize items based on filterContent
  const items = useMemo(() => {
    return salonsState?.filterContent?.map((item, index) => (
      <Salon key={index} salonData={item} />
    ));
  }, [salonsState.filterContent]);

  const totalPages = Math.ceil(items?.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const visibleItems = items?.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    window.scrollTo(0, 0);
    setCurrentPage(pageNumber);
  };
  const showingStart = startIndex + 1;
  const showingEnd = endIndex <= items?.length ? endIndex : items?.length;
  let showing = showingStart - showingEnd;

  useEffect(() => {
    const delay = setTimeout(() => {
      setShowContent(true);
    }, 1000); // Set a 2-second delay

    return () => {
      clearTimeout(delay); // Clear the timeout if the component unmounts
    };
  }, []);
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
          Showing {visibleItems?.length} of {salonsState?.filterContent?.length}{" "}
          venues
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
        {isLoading ? (
          <div className="zeroResponse">Loading...</div>
        ) : showContent ? (
          visibleItems?.length > 0 ? (
            visibleItems
          ) : (
            <div className="zeroResponse">No result found</div>
          )
        ) : null}
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
