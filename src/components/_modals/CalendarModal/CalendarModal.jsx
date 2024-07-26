import React from 'react'
import styles from '../../../pages/BookFlow/BookFlow.module.css'
import DateComponent from '../../BookFlow/DateComponent/DateComponent';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './CalendarModal.css'
import { useState } from 'react'
import rightIco from "../../../assets/images/SalonDetail/chevron-right.svg"
import leftIco from "../../../assets/images/SalonDetail/chevron-right.svg"
import { useEffect } from 'react';

export default function CalendarModal({ getWorkerData }) {
  let [actveCard, updateActiveCard] = useState(-1)
  const [allowMonths, setallowMonths] = useState([]);
  const [showMonth, setShowMonth] = useState(new Date().getMonth());
  const [showYear, setShowYear] = useState(new Date().getFullYear());
  let [allCalendar, setallCalendar] = useState(null)
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const date = new Date();
  const year = date.getFullYear();
  let threeMonths = [];
  const [selectedMonthYear, setSelectedMonthYear] = useState(`${months[new Date().getMonth()]} ${new Date().getFullYear()}`);
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 3,
    autoplay: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        }
      }
    ]
  };


  // -----------
  const generateAllowedMonths = () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const allowedMonths = [];

    for (let i = 0; i < 3; i++) {
      const month = (currentMonth + i) % 12;
      const year = currentYear + Math.floor((currentMonth + i) / 12);
      allowedMonths.push(`${months[month]} ${year}`);
    }
    setallowMonths(allowedMonths);
    return allowedMonths;
  };

  const handleIncrement = () => {
    const allowedMonths = generateAllowedMonths();

    const nextMonth = (showMonth + 1) % 12;
    const nextYear = showMonth === 11 ? showYear + 1 : showYear;

    const nextMonthString = `${months[nextMonth]} ${nextYear}`;

    if (allowedMonths.includes(nextMonthString)) {
      setShowMonth(nextMonth);
      setShowYear(nextYear);
      setSelectedMonthYear(nextMonthString)
    }
  };

  const handleDecrement = () => {

    const allowedMonths = generateAllowedMonths();

    const prevMonth = (showMonth - 1 + 12) % 12;
    const prevYear = showMonth === 0 ? showYear - 1 : showYear;

    const prevMonthString = `${months[prevMonth]} ${prevYear}`;

    if (allowedMonths.includes(prevMonthString)) {
      setShowMonth(prevMonth);
      setShowYear(prevYear);
      setSelectedMonthYear(prevMonthString)
    }
  };



  useEffect(() => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const currentDate = today.getDate();

    let startMonth = currentMonth;
    let startYear = currentYear;
    let startDay = currentDate;

    if (
      showYear > currentYear ||
      (showYear === currentYear && showMonth > currentMonth)
    ) {
      startMonth = showMonth;
      startYear = showYear;
      startDay = 1; // Start from the 1st day of the selected month
    }

    const lastDate = new Date(startYear, startMonth + 1, 0).getDate();
    const allDates = [];
    const allDays = [];

    let day = new Date(startYear, startMonth, startDay).getDay();

    for (let i = startDay; i <= lastDate; i++) {
      allDates.push(i);
      allDays.push(days[day]);

      if (day === 6) {
        day = 0;
      } else {
        day++;
      }
    }

    // For future months, calculate all dates from the 1st to the last day
    if (
      showYear > currentYear ||
      (showYear === currentYear && showMonth > currentMonth)
    ) {
      const futureLastDate = new Date(showYear, showMonth + 1, 0).getDate();
      for (let i = 1; i <= futureLastDate; i++) {
        allDates.push(i);
        allDays.push(days[day]);

        if (day === 6) {
          day = 0;
        } else {
          day++;
        }
      }
    }

    setallCalendar([{ allDates, allDays, showYear }]);
  }, [showMonth, showYear]);
  // ---------------



  return (
    <div>
      <div className={styles.service_timeC}>Date</div>
      <div className={styles.service_timeMonth}>

        <img src={leftIco} alt="left icon" onClick={handleDecrement} className={`${styles.leftarrowIcon} ${allowMonths[0] === `${months[showMonth]} ${showYear}`
          ? styles.disabled
          : ""
          }`} />
        {`${months[showMonth]} ${showYear}`}
        <img src={rightIco} alt="right icon" onClick={handleIncrement} className={`${styles.rightarrowIcon} ${allowMonths[2] === `${months[showMonth]} ${showYear}`
          ? styles.disabled
          : ""
          }`} />
      </div>
      <div className={`time_slick`}>
        {
          allCalendar ?
            <Slider {...settings}>
              {
                allCalendar[0].allDates.map((v, i) => {
                  return (

                    <DateComponent index={i} updateActiveCard={updateActiveCard} actveCard={actveCard} allCalendar={allCalendar} key={i} getWorkerData={getWorkerData} month={months[showMonth]} />
                  )
                })
              }
            </Slider>
            :
            null
        }

      </div>
    </div>
  )
}
