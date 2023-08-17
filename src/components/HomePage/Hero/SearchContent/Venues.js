import React from 'react'
import styles from "../hero.module.css";
import { Frame1 } from '../../../../assets/images/HeroSectionImages';

const Venues = () => {
      //  venue items
  const venues = [
    { id: 1, name: "WDI Hair Labs", address: "25th Cross Road, Koramangala" },
    { id: 2, name: "Another Venue", address: "Some Address" },
  ];
  return (
    <div className={styles["venuesSection"]}>
    <h3>Venues</h3>
    <div className={styles["vn_results"]}>
      {venues.map((venue) => (
        <div key={venue.id} className={styles["vn_resultItem"]}>
          <div className={styles["vn_itemImage"]}>
            <img src={Frame1} alt="Venue" />
          </div>
          <div className={styles["vn_itemdetails"]}>
            <p>{venue.name}</p>
            <small>{venue.address}</small>
          </div>
        </div>
      ))}
    </div>
  </div>
  )
}

export default Venues