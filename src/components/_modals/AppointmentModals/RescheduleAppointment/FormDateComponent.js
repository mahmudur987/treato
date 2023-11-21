import styles from "../../../../pages/BookFlow/BookFlow.module.css";


export default function FormDateComponent({
  index,
  updateActiveCard,
  actveCard,
  allCalendar,
  setSelectedDate,
}) {
  return (
    <div
      className={
        actveCard === index
          ? `${styles.service_dateA} ${styles.activeTimeMain}`
          : styles.service_dateA
      }
      onClick={() => {
        updateActiveCard(actveCard === index ? 0 : index);
        setSelectedDate({
          date: allCalendar[0].allDates[index],
          day: allCalendar[0].allDays[index],
        });
      }}
    >
      <div>{allCalendar[0].allDates[index]}</div>
      <div>{allCalendar[0].allDays[index]}</div>
    </div>
  );
}
