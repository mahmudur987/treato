import styles from "../../../../pages/BookFlow/BookFlow.module.css";

export default function FormDateComponent({
  index,
  updateActiveCard,
  activeCard, // corrected typo
  allCalendar,
  setSelectedDate,
}) {
  const { allDates, allDays } = allCalendar[0]; // destructure the first item

  const handleClick = () => {
    updateActiveCard(activeCard === index ? 0 : index);
    setSelectedDate({
      date: allDates[index],
      day: allDays[index],
    });
  };

  return (
    <div
      className={
        activeCard === index
          ? `${styles.service_dateA} ${styles.activeTimeMain}`
          : styles.service_dateA
      }
      onClick={handleClick} // use the extracted function
    >
      <div>{allDates[index]}</div>
      <div>{allDays[index]}</div>
    </div>
  );
}
