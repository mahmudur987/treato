import React, { useEffect, useState } from "react";
import styles from "./Completed.module.css";
import { MemoizedAppointmentCard } from "../../Cards/AppointmentCard/AppointmentCard";
import { getCompletedAppointments } from "../../../services/Appointments";
import { toast } from "react-toastify";
import LoadSpinner from "../../LoadSpinner/LoadSpinner";
const Completed = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await getCompletedAppointments();
      if (res.res) {
        setData(res?.res?.data?.data);
      }
      if (res.err) {
        toast.error(res.err.message, {
          toastId: 1,
        });
      }
    };
    setLoading(false);
    fetchData();
  }, []);
  // console.log(data);
  return (
    <div className={styles.CompletedWrapper}>
      {data?.map((salon, index) => (
        <MemoizedAppointmentCard
          salon={salon}
          key={index}
          cardType="Completed"
        />
      ))}

      {loading && <LoadSpinner />}
    </div>
  );
};

export default Completed;
