import React, { useState } from "react";
import styles from "./Commission.module.css";
import { FaPen } from "react-icons/fa";
const Commission = () => {
  const [commission, setCommission] = useState("");
  const [enable, setEnable] = useState(true);

  const enableFunction =()=>{
    setEnable((pre) => !pre);
  }
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
          <input
            id="comm"
            disabled={enable}
            type="text"
            value={commission}
            placeholder="5%"
            onChange={(e) => setCommission(e.target.value)}
          />
          <label htmlFor="comm">
            <span onClick={enableFunction}>
              <FaPen />
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Commission;
