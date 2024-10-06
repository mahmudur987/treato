import { useEffect, useState } from "react";
import styles from "../../../pages/BookFlow/BookFlow.module.css";
import BasicInput from "../../Input/BasicInput/BasicInput";
import { toast } from "react-toastify";

export default function TimeComponent({
  index,
  activeTime,
  updateActiveTime,
  getWorkerData,
  timeData,
  stepTwoDetails,
}) {
  const [isPast, setIsPast] = useState(false);
  const [isToday, setIsToday] = useState(false);
  const givenDateString = stepTwoDetails?.dateData; //
  const givenTimeString = timeData;

  useEffect(() => {
    // Get current time
    const currentTime = new Date();

    // Parse the given time
    const [hours, minutes] = givenTimeString?.split(":")?.map(Number);
    const givenTime = new Date();
    givenTime.setHours(hours);
    givenTime.setMinutes(minutes);
    givenTime.setSeconds(0);
    givenTime.setMilliseconds(0);

    // Compare times
    if (currentTime > givenTime) {
      setIsPast(true);
    } else {
      setIsPast(false);
    }
  }, [givenTimeString]);

  useEffect(() => {
    if (givenDateString) {
      // Get current date
      const currentDate = new Date();

      // Parse the given date
      const parts = givenDateString?.split(" - ");
      const day = parseInt(parts[1]?.split(" ")[1]);
      const monthString = parts[1]?.split(" ")[0];
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      const monthIndex = months.indexOf(monthString);
      const givenDate = new Date(
        currentDate.getFullYear(),
        monthIndex,
        parseInt(day)
      );

      // Compare dates
      if (
        currentDate.getDate() === givenDate.getDate() &&
        currentDate.getMonth() === givenDate.getMonth() &&
        currentDate.getFullYear() === givenDate.getFullYear()
      ) {
        setIsToday(true);
      } else {
        setIsToday(false);
      }
    }
  }, [givenDateString]);

  useEffect(() => {
    if (isPast && isToday) {
      updateActiveTime("");
    }
  }, [isPast, isToday, updateActiveTime]);

  return (
    <label
      htmlFor={`time${index}`}
      style={{ background: `${isPast && isToday ? "lightGray" : ""}` }}
      className={
        activeTime === index
          ? `${styles.timeMain} ${styles.activeTimeMain}`
          : styles.timeMain
      }
      onClick={(e) => {
        if (isPast && isToday) {
          return toast.error("The selected time slot is in the past.", {
            toastId: 1,
          });
        }

        updateActiveTime(index);
        getWorkerData(e);
      }}
    >
      <div className={styles.timeMainA}>{timeData ? timeData : null}</div>
      <BasicInput
        Type={"text"}
        id={`time${index}`}
        VALUE={timeData}
        NAME={"time"}
        className={styles.d_none}
      />
    </label>
  );
}
