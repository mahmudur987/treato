import React, { useEffect, useState } from "react";
import styles from "../hero.module.css";
import { search_Blue } from "../../../../assets/images/icons";
import { useLocation, useNavigate } from "react-router-dom";
import Venues from "./Venues";

const Treatments = ({
  allServices,
  handle_close,
  setTreatmentInputValue,
  pageName,
  inputValue,
}) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  // Get the 'services' and 'location' query parameters
  const locationParam = searchParams.get("location");
  const navigate = useNavigate();

  const setinput = (serviceName) => {
    handle_close();
    setTreatmentInputValue(serviceName);
    if (pageName === "salons") {
      navigate(`/salons?service=${serviceName}&location=${locationParam}`);
    }
  };
  return (
    <>
      <div className={styles["treatmentsSection"]}>
        <h3>Treatments</h3>
        <div className={styles["trt_results"]}>
          {allServices?.length === 0 ? (
            <div className={styles.notFound}>We didn't find a match</div>
          ) : (
            <>
              {allServices?.map((treatment, index) => (
                <div
                  key={index}
                  className={styles["trt_resultItem"]}
                  onClick={() => setinput(treatment.service_name)}
                >
                  <div className={styles.wrapper}>
                    <img loading="lazy" src={search_Blue} alt="Treatment" />
                  </div>
                  <p>{treatment.service_name}</p>
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      <Venues inputValue={inputValue} />
    </>
  );
};

export default Treatments;
