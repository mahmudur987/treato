import React, { useEffect, useState } from "react";
import styles from "./Cancelled.module.css";
import AppointmentCard, {
  MemoizedAppointmentCard,
} from "../../Cards/AppointmentCard/AppointmentCard";
import { getCancelledAppointments } from "../../../services/Appointments";
import { toast } from "react-toastify";
const Cancelled = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getCancelledAppointments();
      if (res.res) {
        setData(res?.res?.data?.data);
      }
      if (res.err) {
        toast.error(res?.err?.message ?? "Error", {
          toastId: 1,
        });
      }
      console.log(res?.err?.message);
    };

    fetchData();
  }, []);

  return (
    <div className={styles.CancelledWrapper}>
      {data?.map((salon, index) => (
        <MemoizedAppointmentCard
          salon={salon}
          key={index}
          cardType="Cancelled"
        />
      ))}
    </div>
  );
};

export default Cancelled;
