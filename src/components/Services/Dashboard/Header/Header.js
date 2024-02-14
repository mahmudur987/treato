import React, { useState } from "react";
import CustomSelect2 from "../../../Select/CustomeSelect2/CustomeSelect2";
import styles from "./Header.module.css";
import { FaUsers } from "react-icons/fa";
import { BsClipboardCheck } from "react-icons/bs";
import { BsClipboard2Check } from "react-icons/bs";
const Header = () => {
  const [selectedOption, setSelectedOption] = useState("last 30 days");
  const options = ["last 30 days", "last 50 days", "last 90 days"];

  return (
    <section className={styles.mainContainer}>
      <h1 className={styles.heading}>Dashboard</h1>

      <p className={styles.selectWrapper}>
        <CustomSelect2
          options={options}
          value={selectedOption}
          onChange={setSelectedOption}
        />
      </p>

      <div className={styles.contents}>
        {/* new user */}
        <div style={{ backgroundColor: "yellow" }} className={styles.card}>
          <div className={styles.cardLeft}>
            <FaUsers />
          </div>
          <div className={styles.cardMiddle}>
            <p>New user</p>

            <h3>24</h3>
          </div>
          <div className={styles.cardRight}>^ 8(13.6%)</div>
        </div>
        {/* avarage sale  */}
        <div style={{ backgroundColor: "skyblue" }} className={styles.card}>
          <div className={styles.cardLeft}>
            <BsClipboardCheck />
          </div>
          <div className={styles.cardMiddle}>
            <p>New user</p>

            <h3>24</h3>
          </div>
          <div className={styles.cardRight}>^ 8(13.6%)</div>
        </div>

        {/* total appoinments */}

        <div style={{ backgroundColor: "pink" }} className={styles.card}>
          <div className={styles.cardLeft}>
            <BsClipboard2Check />
          </div>
          <div className={styles.cardMiddle}>
            <p>New user</p>
            <h3>24</h3>
          </div>
          <div className={styles.cardRight}>^ 8(13.6%)</div>
        </div>
      </div>
    </section>
  );
};

export default Header;
