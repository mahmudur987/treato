import React, { memo, useState } from "react";
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

        <select onChange={handleItemPerPageChange}>
          <option value={itemPerPage} disabled selected>
            {itemPerPage}
          </option>
          <option value="5">05</option>
          <option value="6">06</option>
          <option value="7">07</option>
          <option value="8">08</option>
          <option value="9">09</option>
          <option value="10">10</option>
        </select>

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
            {index < 9 && "0"} {index + 1}
          </span>
        ))}
        <button onClick={next}>Next</button>
      </div>
    </div>
  );
};

export default Pagination;
export const MemoizedPagination = memo(Pagination);
