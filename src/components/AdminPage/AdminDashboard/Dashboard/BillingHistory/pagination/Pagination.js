import React, { useState } from "react";
import styles from "./pagination.module.css";

const Pagination = ({ pageNumber, setPageNumber, count, setCount }) => {
  const totalPages = Math.ceil(count / 5) || 0; // Assuming 5 items per page

  const previous = () => {
    if (pageNumber > 1) {
      setPageNumber((pre) => pre - 1);
    }
  };

  const next = () => {
    if (pageNumber < totalPages) {
      setPageNumber((pre) => pre + 1);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.left}>
        <span>Showing</span>
        <span>
          {pageNumber * 5 - 4}-{Math.min(pageNumber * 5, count)}
        </span>
        <span>Out of {count}</span>
      </div>

      <div className={styles.right}>
        <button onClick={previous}>Previous</button>
        {[...Array(totalPages)].map((_, index) => (
          <span
            key={index}
            style={{
              backgroundColor: `${
                index + 1 === pageNumber ? "rgba(0, 0, 0, 0.2)" : ""
              }`,
            }}
            onClick={() => setPageNumber(index + 1)}
          >
            {index + 1}
          </span>
        ))}
        <button onClick={next}>Next</button>
      </div>
    </div>
  );
};

export default Pagination;
