import React from "react";
import styles from "./Progress.module.css";
import { MemoizedAppointmentCard } from "../../Cards/AppointmentCard/AppointmentCard";
import { useUpcomingApponments } from "../../../services/Appointments";
import LoadSpinner from "../../LoadSpinner/LoadSpinner";

import ErrorComponent from "../../ErrorComponent/ErrorComponent";
const Progress = () => {
  const { data, isLoading, isError, error } = useUpcomingApponments();

  return (
    <>
      {data && !isLoading && !isError && (
        <div className={styles.UpcomingWrapper}>
          {data?.res?.data?.data?.map((salon, index) => (
            <MemoizedAppointmentCard
              salon={salon}
              key={index}
              cardType="progress"
            />
          ))}

          {isLoading && <LoadSpinner />}
          {isError && (
            <ErrorComponent message={error ? error.message : "Error"} />
          )}
        </div>
      )}
    </>
  );
};

export default Progress;
