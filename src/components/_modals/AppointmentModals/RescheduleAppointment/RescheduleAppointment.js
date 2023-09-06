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
      onClick={onClick}
    >
      Prev
    </div>
  );
}
const RescheduleAppointment = () => {

  const [slidesToShow, setSlidesToShow] = useState(4); // Default value for mobile

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
    window.addEventListener('resize', handleResize);

    // Remove the listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);





  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
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
