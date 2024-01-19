import React, { useEffect, useState } from "react";
import styles from "./Upcoming.module.css";
import AppointmentCard from "../../Cards/AppointmentCard/AppointmentCard";
import {
  getUpcomingAppointments,
  useUpcomingApponments,
} from "../../../services/Appointments";
import LoadSpinner from "../../LoadSpinner/LoadSpinner";
import { toast } from "react-toastify";
const Upcoming = () => {
  const { data, isLoading, isError, error } = useUpcomingApponments();
  if (isLoading) {
    return <LoadSpinner />;
  }
  if (isError) {
    console.log(error);
    return toast.error("Error Happen to fetch upcoming Appointments", {
      toastId: 1,
    });
  }
  return (
    <>
      {data && (
        <div className={styles.UpcomingWrapper}>
          {data?.res?.data?.data?.map((salon, index) => (
            <AppointmentCard salon={salon} key={index} cardType="Upcoming" />
          ))}
        </div>
      )}
    </>
  );
};

export default Upcoming;