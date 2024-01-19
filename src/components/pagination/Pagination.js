
import React from 'react';
import styles from "./pagination.module.css";
import arrowLeft from "../../assets/images/SalonsPageImages/arrow-left.png"
import chevronright from "../../assets/images/SalonsPageImages/chevron-right.png";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const MAX_VISIBLE_PAGES = 5; // Maximum number of visible page buttons
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  const calculateVisiblePages = () => {
    const halfMax = Math.floor(MAX_VISIBLE_PAGES / 2);
    let startPage = currentPage - halfMax;
    if (startPage < 1) {
      startPage = 1;
    }
    let endPage = startPage + MAX_VISIBLE_PAGES - 1;
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(endPage - MAX_VISIBLE_PAGES + 1, 1);
    }
    return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
  };

  const visiblePages = calculateVisiblePages();
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <div className={styles.pagination}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={isFirstPage}
        className={styles.prev}
      >
       {'<'} Prev
      </button>
      <div className={styles.paginationButton}>
      
      {visiblePages.map((pageNumber) => (
        <button
          key={pageNumber}
          className={`${styles.paginationButton} ${pageNumber === currentPage ? styles.active : ''}`}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
      </div>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={isLastPage}
        className={styles.next}

      >
        Next {'>'} 
      </button>
    </div>
  );
};

export default Pagination;


