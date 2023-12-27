import React, { useEffect, useState } from "react";
import styles from "../hero.module.css";
import { search_Blue } from "../../../../assets/images/icons";
import { useLocation, useNavigate } from "react-router-dom";

const Treatments = ({ allServices, handle_close, setTreatmentInputValue,pageName }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  // Get the 'services' and 'location' query parameters
  const locationParam = searchParams.get("location");
const navigate=useNavigate()

  const setinput = (serviceName) => {
    handle_close();
    setTreatmentInputValue(serviceName);
    if(pageName==="salons"){
      navigate(
        `/salons?service=${serviceName}&location=${locationParam}`
      );
    }
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
