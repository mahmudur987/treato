import { useEffect, useState } from "react";
import styles from "./Time.module.css";
import { toast } from "react-toastify";

export default function Time({
  index,
  activeTime,
  updateActiveTime,
  timeData,
  date,
}) {
  const [isPast, setIsPast] = useState(false);
  const [isToday, setIsToday] = useState(false);

  const givenDateString = date;
  const givenTimeString = timeData;

  useEffect(() => {
    if (givenDateString && givenTimeString) {
      // Get current date and time
      const currentDateTime = new Date();

      // Parse the given date
      const [year, month, day] = givenDateString.split("-").map(Number);
      const [hours, minutes] = givenTimeString.split(":").map(Number);

      const givenDateTime = new Date(
        year,
        month - 1,
        day,
        hours,
        minutes,
        0,
        0
      );

      // Update states based on date and time comparisons
      const isToday =
        currentDateTime.toDateString() === givenDateTime.toDateString();
      setIsToday(isToday);

      if (currentDateTime > givenDateTime) {
        setIsPast(true);
      } else {
        setIsPast(false);
      }
    }
  }, [givenDateString, givenTimeString]);

  return (
    <label
      htmlFor={`time${index}`}
      style={{ background: isPast && isToday ? "lightGray" : "" }}
      className={
        activeTime === index
          ? `${styles.timeMain} ${styles.activeTimeMain}`
          : styles.timeMain
      }
      onClick={(e) => {
        if (isPast && isToday) {
          toast.error("The slot is past", { toastId: 1 });
          return;
        }
        updateActiveTime(timeData);
      }}
    >
      <div className={styles.timeMainA}>{timeData || null}</div>
    </label>
  );
}
