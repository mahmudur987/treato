import React from 'react'
import styles from "../hero.module.css";
import searchblueImg from "../../../../assets/images/HeroSectionImages/search_blue.png";

const Treatments = () => {
  // treatment items
    const treatments = [
        { id: 1, name: "Hair Extension" },
        { id: 2, name: "Another Treatment" },
        { id: 3, name: "Hair Extension" },
        { id: 4, name: "Another Treatment" },
        { id: 5, name: "Another Treatment" },
        { id: 6, name: "Hair Extension" },
        { id: 7, name: "Another Treatment" },
      ];
  return (
    <div className={styles["treatmentsSection"]}>
    <h3>Treatments</h3>
    <div className={styles["trt_results"]}>
      {treatments.map((treatment) => (
        <div key={treatment.id} className={styles["trt_resultItem"]}>
          <div>
            <img src={searchblueImg} alt="Treatment" />
          </div>
          <p>{treatment.name}</p>
        </div>
      ))}
    </div>
  </div>
  )
}

export default Treatments