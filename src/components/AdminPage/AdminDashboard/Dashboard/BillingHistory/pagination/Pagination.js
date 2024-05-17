import React, { useState } from "react";
import styles from "./pagination.module.css";

const Pagination = ({
  pageNumber,
  setPageNumber,
  count,
  itemPerPage,
  setItemPerPage,
}) => {
  const totalPages = Math.ceil(count / itemPerPage) || 0;

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
  const handleItemPerPageChange = (e) => {
    console.log(e.target.value);

    setItemPerPage(Number(e.target.value));
  };
  return (
    <div className={styles.mainContainer}>
      <div className={styles.left}>
        <span>Showing</span>
        <span>
          <select onChange={handleItemPerPageChange}>
            <option value={itemPerPage} disabled selected>
              {itemPerPage}
            </option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
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
