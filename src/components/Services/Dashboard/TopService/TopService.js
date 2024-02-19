import React, { useState } from "react";
import styles from "./TopService.module.css";
import CustomSelect2 from "../../../Select/CustomeSelect2/CustomeSelect2";
const TopService = () => {
  const [selectedOption, setSelectedOption] = useState("last 30 days");
  const options = ["last 30 days", "last 50 days", "last 90 days"];
  const data = [
    {
      name: "Hair cut Man",
      quantity: 25,
    },
    {
      name: "Hair extensions women",
      quantity: 19,
    },
    {
      name: "Hair color women",
      quantity: 13,
    },
    {
      name: "Hair cut Girl",
      quantity: 12,
    },
    {
      name: "Hair cutting women",
      quantity: 5,
    },
  ];

  return (
    <div className={styles.maincontainer}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.heading}>Top Service</h2>
          <p className={styles.selectWrapper}>
            <CustomSelect2
              options={options}
              value={selectedOption}
              onChange={setSelectedOption}
            />
          </p>
        </div>
        <div>
          {data.map((item, index) => (
            <ProgressBar
              key={index}
              name={item.name}
              quantity={item.quantity}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopService;

const ProgressBar = ({ name, quantity }) => {
  const progressWidth = (quantity / 25) * 100; // Assuming 25 is the maximum quantity

  return (
    <div className={styles.progressBarContainer}>
      <div className={styles.progressBar}>
        <div
          className={styles.progress}
          style={{ width: `${progressWidth}%` }}
        ></div>
        <p className={styles.progressquantyty}>{quantity}(15%) </p>
      </div>
      <div className={styles.progressLabel}>{name}</div>
    </div>
  );
};
