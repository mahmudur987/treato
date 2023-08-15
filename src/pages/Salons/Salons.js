import React, { useState } from "react";
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
import { resetSalonContent } from "../../redux/slices/salons";
const Salons = () => {
  const salonsState = useSelector((state) => state.salons);
  // console.log(salonsState);
  const dispatch = useDispatch();

  const handleOpenModal = (modalContent) => {
    dispatch(resetSalonContent());
    window.scrollTo(0, 0); // Scroll to the top
    document.body.style.overflow = "hidden";
    dispatch(openModal(modalContent));
    setCurrentPage(1);
  };

  const ITEMS_PER_PAGE = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const items = Array.from(
    { length: salonsState.salonContent.length },
    // { length: salonContent.length },

    (_, index) => `Item ${index + 1}`
  );

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
          onClick={()=>handleOpenModal("sortBy")}
        >
          Sort <img src={chevronDown} alt="chevronDown" />
        </button>
        <button className={styles.filter}   onClick={()=>handleOpenModal("price")}>
          Price <img src={chevronDown} alt="chevronDown" />
        </button>
        <button className={styles.filter}  onClick={()=>handleOpenModal("venue")}>
          Venue Type <img src={chevronDown} alt="chevronDown" />
        </button>
      </div>
      <div className={styles.venueInfo}>
        <h4>
          Showing{" "}
          {salonsState.salonContent.length > 6
            ? 6
            : salonsState.salonContent.length}{" "}
          of {salonsState.salonContent.length} venues
        </h4>
        <button
          className={styles.filterDesk}
          onClick={()=>handleOpenModal("all")}
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
        {visibleItems.map((item, index) => (
          //   <Salon key={index} salonData={salonContent[index]} />
          <Salon key={index} salonData={salonsState.salonContent[index]} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Salons;
