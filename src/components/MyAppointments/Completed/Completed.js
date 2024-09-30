import React, { useEffect, useState } from "react";
import styles from "./Completed.module.css";
import AppointmentCard, {
  MemoizedAppointmentCard,
} from "../../Cards/AppointmentCard/AppointmentCard";
import { getCompletedAppointments } from "../../../services/Appointments";
import { toast } from "react-toastify";
const Completed = () => {
  const [toggleoptions, settoggleoptions] = useState(false);
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
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
    </div>
  );
};

export default Completed;
