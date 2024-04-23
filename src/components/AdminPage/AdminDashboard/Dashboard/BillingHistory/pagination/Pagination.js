import React, { useState } from "react";
import styles from "./pagination.module.css";
const Pagination = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [count, setCount] = useState(5);
  const numbers = Array.from({ length: count }, (_, index) => index + 1);

  const previous = () => {
    if (pageNumber > 1) {
      setPageNumber((pre) => pre - 1);
    }
  };
  const nextF = () => {
    if (pageNumber < count) {
      setPageNumber((pre) => pre + 1);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.left}>
        <span>Showing</span>
        <span>05</span>

        <span>Out of 10</span>
      </div>

      <div className={styles.right}>
        <button onClick={previous}>pre</button>
        {numbers.map((x) => (
          <span
            style={{
              backgroundColor: `${
                x === pageNumber ? "rgba(0, 0, 0, 0.2)" : ""
              }`,
            }}
          >
            {count < 10 && 0}
            {x}
          </span>
        ))}
        <button onClick={nextF}>next</button>
      </div>
    </div>
  );
};

export default Pagination;
