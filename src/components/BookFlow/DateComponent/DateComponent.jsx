import { useEffect, useRef } from 'react';
import styles from "../../../pages/BookFlow/BookFlow.module.css";
import BasicInput from "../../Input/BasicInput/BasicInput";

export default function DateComponent({
  index,
  updateActiveCard,
  actveCard,
  allCalendar,
  getWorkerData,
  month,
}) {
  const labelRef = useRef(null);
  useEffect(() => {
    // Check if index is 0 and actveCard is not already set to 0
    if (index === 0 && actveCard !== 0) {
      // Trigger click event on the label
      labelRef.current.click();
    }
  }, []);
  return (
    <label
      id={`date${index}`}
      ref={labelRef}
      className={
        actveCard === index
          ? `${styles.service_dateA} ${styles.activeTimeMain}`
          : styles.service_dateA
      }
      onClick={(e) => {
        updateActiveCard(index);
        getWorkerData(e, allCalendar[0]?.showYear);
      }}
    >
      <div>{allCalendar[0].allDates[index]}</div>
      <div>{allCalendar[0].allDays[index]}</div>
      <BasicInput
        Type={"text"}
        id={`date${index}`}
        VALUE={`${allCalendar[0].allDays[index]} - ${month?.substring(0, 3)} ${
          allCalendar[0].allDates[index]
        }`}
        NAME={"date"}
        className={styles.d_none}
      />
    </label>
  );
}
