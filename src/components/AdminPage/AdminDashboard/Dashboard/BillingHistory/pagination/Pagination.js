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
  const [pageWindow, setPageWindow] = useState({ start: 1, end: 5 }); // Control the visible page range

  const previous = () => {
    if (pageNumber > 1) {
      setPageNumber((pre) => pre - 1);
      if (pageNumber <= pageWindow.start) {
        // Shift window backward
        setPageWindow({
          start: Math.max(pageWindow.start - 5, 1),
          end: Math.max(pageWindow.end - 5, 5),
        });
      }
    }
  };

  const next = () => {
    if (pageNumber < totalPages) {
      setPageNumber((pre) => pre + 1);
      if (pageNumber >= pageWindow.end) {
        // Shift window forward
        setPageWindow({
          start: Math.min(pageWindow.start + 5, totalPages - 4),
          end: Math.min(pageWindow.end + 5, totalPages),
        });
      }
    }
  };

  const handleItemPerPageChange = (e) => {
    setItemPerPage(Number(e.target.value));
    setPageWindow({ start: 1, end: 5 }); // Reset page window if items per page change
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
        {[...Array(totalPages)]
          .slice(pageWindow.start - 1, pageWindow.end) // Slice the page array based on window
          .map((_, index) => {
            const pageIndex = index + pageWindow.start;
            return (
              <span
                key={pageIndex}
                style={{
                  backgroundColor: `${
                    pageIndex === pageNumber ? "rgba(0, 0, 0, 0.2)" : ""
                  }`,
                }}
                onClick={() => setPageNumber(pageIndex)}
              >
                {pageIndex < 10 ? "0" : ""}
                {pageIndex}
              </span>
            );
          })}
        <button onClick={next}>Next</button>
      </div>
    </div>
  );
};

export default Pagination;
export const MemoizedPagination = memo(Pagination);
