import React from "react";
import styles from "./Commission.module.css";
import { FaPen } from "react-icons/fa";
const Commission = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.left}>
        <h2>Set Commission Charge</h2>
        <p>
          Set a certain percentage of revenues the partner needs to pay Treato
          as commission charges. These will be auto-deducted during billing.
        </p>
      </div>

      <div className={styles.right}>
        <label htmlFor="commission">Commission %</label>

        <div className={styles.wrapper}>
          <input type="text" value={"5%"} />
          <span>
            <FaPen />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Commission;
