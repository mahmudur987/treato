import React, { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import calendarIcon from "../../../assets/images/TeamDetails/calenderImg.png";
import sty from "./Pic.module.css";

const Pick = ({ ondateChange, date }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const inputRef = useRef(null);

  const handleDateChange = (date) => {
    ondateChange(date);
    setSelectedDate(date);
  };

  const handleInputClick = () => {
    inputRef.current.focus();
  };

  return (
    <div className={sty.maindiv}>
      <DatePicker
        className={sty.dateInp}
        selected={selectedDate}
        onChange={handleDateChange}
        placeholderText={
          date ? date : selectedDate ? selectedDate : "DD/MM/YYYY"
        }
        popperPlacement="bottom-end"
        toggleCalendarOnIconClick
        showIcon
        icon={<img loading="lazy" className={sty.calIcon} src={calendarIcon} alt="icon" />}
      />
    </div>
  );
};

export default Pick;
