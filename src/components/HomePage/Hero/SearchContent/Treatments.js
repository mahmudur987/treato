import React, { useEffect, useState } from "react";
import styles from "../hero.module.css";
import { search_Blue } from "../../../../assets/images/icons";

const Treatments = ({ allServices, handle_close, setTreatmentInputValue }) => {
  const treatments = [
    { id: 1, name: "Hair Extension" },
    { id: 2, name: "Another Treatment" },
    { id: 3, name: "Hair Extension" },
    { id: 4, name: "Another Treatment" },
    { id: 5, name: "Another Treatment" },
    { id: 6, name: "Hair Extension" },
    { id: 7, name: "Another Treatment" },
  ];

  const setinput = (serviceName) => {
    handle_close();
    setTreatmentInputValue(serviceName);
  };
  return (
    <div className={styles["treatmentsSection"]}>
      <h3>Treatments</h3>
      <div className={styles["trt_results"]}>
        {allServices?.length == 0 ? (
          <div className={styles.notFound}>We didn't find a match</div>
        ) : (
          <>
            {allServices?.map((treatment, index) => (
              <div
                key={index}
                className={styles["trt_resultItem"]}
                onClick={() => setinput(treatment.service_name)}
              >
                <div>
                  <img src={search_Blue} alt="Treatment" />
                </div>
                <p>{treatment.service_name}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Treatments;
