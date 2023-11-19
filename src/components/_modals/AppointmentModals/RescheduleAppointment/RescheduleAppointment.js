import React, { useState, useEffect } from "react";
import styles from "./RescheduleAppointment.module.css";
import { frame1 } from "../../../../assets/images/Appointments";
import rightIco from "../../../../assets/images/SalonDetail/chevron-right.svg";
import PrimaryButton from "../../../Buttons/PrimaryButton/PrimaryButton";
import Slider from "react-slick";
import "./Carousal.css";
import DateComponent from "../../../BookFlow/DateComponent/DateComponent";
function SampleNextArrow(props) {
  const { className, style, onClick } = props;

  return (
    <div className={className} onClick={onClick}>
      Next
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      Prev
    </div>
  );
}
const RescheduleAppointment = () => {
  const [slidesToShow, setSlidesToShow] = useState(4); // Default value for mobile
  let [actveCard, updateActiveCard] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showMonth, setShowMonth] = useState(new Date().getMonth());
  const [showYear, setShowYear] = useState(new Date().getFullYear());
  let [allCalendar, setallCalendar] = useState(null);
  const [showPrevButton, setShowPrevButton] = useState(false);
  const [showNextButton, setShowNextButton] = useState(true);

  const containerRef = React.createRef();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const [allowMonths, setallowMonths] = useState([]);

  useEffect(() => {
    console.log(allowMonths);
  }, [allowMonths]);

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
    console.log(allowedMonths);

    const nextMonth = (showMonth + 1) % 12;
    const nextYear = showMonth === 11 ? showYear + 1 : showYear;

    const nextMonthString = `${months[nextMonth]} ${nextYear}`;

    if (allowedMonths.includes(nextMonthString)) {
      setShowMonth(nextMonth);
      setShowYear(nextYear);
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
    }
  };

  useEffect(() => {
    const today = new Date();
    console.log(today);
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
      console.log(
        showYear,
        currentYear,
        showYear > currentYear ||
          (showYear === currentYear && showMonth > currentMonth)
      );
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

    setallCalendar([{ allDates, allDays }]);
  }, [showMonth, showYear]);

  useEffect(() => {
    // Check the window width and update slidesToShow accordingly
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        // Desktop
        setSlidesToShow(5);
      } else {
        // Mobile
        setSlidesToShow(4);
      }
    };

    // Initial check on component mount
    handleResize();

    // Add a listener for window resize events
    window.addEventListener("resize", handleResize);

    // Remove the listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    handleScroll();
  }, [scrollPosition]);

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const handleScroll = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      const isScrollable = container.scrollWidth > container.clientWidth;

      setScrollPosition(container.scrollLeft);
      setShowPrevButton(scrollPosition > 0);
      setShowNextButton(
        isScrollable &&
          scrollPosition < container.scrollWidth - container.clientWidth
      );
    }
  };

  return (
    <div className={styles.RescheduleModal}>
      <h1 className={styles.modalTitle}>Reschedule Appointment</h1>
      <div className={styles.modalContent}>
        <div className={styles.salonInfo}>
          <img src={frame1} alt="frame1" className={styles.salonProfileImg} />
          <div className={styles.details}>
            <h4 className={styles.salonName}>She Hair & Beauty</h4>
            <p className={styles.salonLocation}>Ejipura, Bengaluru</p>
          </div>
        </div>
        <hr className={styles.line} />
        <div className={styles.slotInfoWrapper}>
          <div className={styles.dateContainer}>
            <h2>
              Showing slots as per the salon and professional availability.
            </h2>
            <h4>Date</h4>
            {console.log(months[0], months[showMonth])}
            <div className={styles.service_timeMonth}>
              <img
                src={rightIco}
                alt="leftIcon"
                onClick={handleDecrement}
                className={`${styles.leftarrowIcon} ${
                  allowMonths[0] === `${months[showMonth]} ${showYear}`
                    ? styles.disabled
                    : ""
                }`}
              />
              <div>{`${months[showMonth]} ${showYear}`}</div>
              <img
                src={rightIco}
                alt="rightIcon"
                onClick={handleIncrement}
                className={`${styles.rightarrowIcon} ${
                  allowMonths[2] === `${months[showMonth]} ${showYear}`
                    ? styles.disabled
                    : ""
                }`}
              />
            </div>
            <div id="reschedule_time_slick" className={`time_slick`}>
              {allCalendar ? (
                <Slider {...settings}>
                  {allCalendar[0].allDates.map((v, i) => {
                    return (
                      <DateComponent
                        index={i}
                        updateActiveCard={updateActiveCard}
                        actveCard={actveCard}
                        allCalendar={allCalendar}
                        key={i}
                      />
                    );
                  })}
                </Slider>
              ) : null}
            </div>
          </div>
          <hr className={styles.line} />
          <div className={styles.startTime}>
            <h4>Start time</h4>
            <div className={styles.timeSlotsWrapper}>
              <button className={styles.timeSlot}>10:30 AM</button>
              <button className={styles.timeSlot}>01:30 PM</button>
              <button className={styles.timeSlot}>03:30 PM</button>
              <button className={styles.timeSlot}>06:30 PM</button>
              <button className={styles.timeSlot}>08:30 PM</button>
            </div>
          </div>
        </div>
      </div>
      <PrimaryButton children={"Reschedule Appointment"} />
    </div>
  );
};

export default RescheduleAppointment;
