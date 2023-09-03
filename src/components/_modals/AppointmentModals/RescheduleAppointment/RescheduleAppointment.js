import React, { useState, useEffect } from "react";
import styles from "./RescheduleAppointment.module.css";
import { frame1 } from "../../../../assets/images/Appointments";
import PrimaryButton from "../../../Buttons/PrimaryButton/PrimaryButton";
import Slider from "react-slick";
import "./Carousal.css";
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "white",
        color: "black",
      }}
      onClick={onClick}
    >
      Next
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "white",
        color: "black",
      }}
      onClick={onClick}
    >
      Prev
    </div>
  );
}
const RescheduleAppointment = () => {
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const dateData = [
    { day: "Mon", date: "14" },
    { day: "Tue", date: "15" },
    { day: "Wed", date: "16" },
    { day: "Thur", date: "17" },
    { day: "Fri", date: "18" },
    { day: "Sat", date: "19" },

    // Add more objects as needed
  ];
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showPrevButton, setShowPrevButton] = useState(false);
  const [showNextButton, setShowNextButton] = useState(true);

  const containerRef = React.createRef();

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
  useEffect(() => {
    handleScroll();
  }, [scrollPosition]);

  const handlePrevClick = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      container.scrollTo({
        left: scrollPosition - 100, // Adjust this value as needed for scrolling
        behavior: "smooth",
      });
    }
  };
  const handleNextClick = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      container.scrollTo({
        left: scrollPosition + 100, // Adjust this value as needed for scrolling
        behavior: "smooth",
      });
    }
  };
  return (
    <div className={styles.RescheduleModal}>
      <h1 className={styles.modalTitle}>Reschedule Appointment</h1>
      <div className={styles.modalContent}>
      <div className={styles.salonInfo}>
        <img src={frame1} alr="frame1" className={styles.salonProfileImg} />
        <div className={styles.details}>
          <h4 className={styles.salonName}>She Hair & Beauty</h4>
          <p className={styles.salonLocation}>Ejipura, Bengaluru</p>
        </div>
      </div>
      <hr className={styles.line}/>
      <div className={styles.slotInfoWrapper}>
        <div className={styles.dateContainer}>
          <h2>Showing slots as per the salon and professional availability.</h2>
          <h4>Date</h4>
          <div className={styles.calendarWrapper}>
            <Slider {...settings}>
              {dateData.map((data, index) => (
                <button key={index} className={styles.availableDate}>
                  <span>{data.day}</span>
                  <span className={styles.date}>{data.date}</span>
                </button>
              ))}
            </Slider>
          </div>
        </div>
      <hr className={styles.line}/>
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
