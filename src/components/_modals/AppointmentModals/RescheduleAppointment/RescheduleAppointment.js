import React, { useState, useEffect } from "react";
import styles from "./RescheduleAppointment.module.css";
import rightIco from "../../../../assets/images/SalonDetail/chevron-right.svg";
import PrimaryButton from "../../../Buttons/PrimaryButton/PrimaryButton";
import Slider from "react-slick";
import "./Carousal.css";
import FormDateComponent from "./FormDateComponent";
import { toast } from "react-toastify";
import {
  rescheduleAppointment,
  useTimeSlots,
  useUpcomingApponments,
} from "../../../../services/Appointments";
import { useDispatch } from "react-redux";
import { closeModal } from "../../../../redux/slices/modal";
import LoadSpinner from "../../../LoadSpinner/LoadSpinner";
import ErrorComponent from "../../../ErrorComponent/ErrorComponent";
import SecondaryButton from "../../../Buttons/SecondaryButton/SecondaryButton";
import Time from "./Time/Time.jsx";
function SampleNextArrow(props) {
  const { className, onClick } = props;

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
const RescheduleAppointment = ({ data }) => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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

  const [slidesToShow, setSlidesToShow] = useState(4); // Default value for mobile
  let [actveCard, updateActiveCard] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showMonth, setShowMonth] = useState(new Date().getMonth());
  const [showYear, setShowYear] = useState(new Date().getFullYear());
  let [allCalendar, setallCalendar] = useState(null);
  const [showPrevButton, setShowPrevButton] = useState(false);
  const [showNextButton, setShowNextButton] = useState(true);
  const [selectedDate, setSelectedDate] = useState({
    date: new Date().getDate(),
    day: days[new Date().getDay()],
  });
  const [selectedMonthYear, setSelectedMonthYear] = useState(
    `${months[new Date().getMonth()]} ${new Date().getFullYear()}`
  );
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [allowMonths, setallowMonths] = useState([]);
  const containerRef = React.createRef();
  const dispatch = useDispatch();
  const { refetch } = useUpcomingApponments();
  const [subcategoriesIds, setSubcategoriesIds] = useState([]);

  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  useEffect(() => {
    const fetchData = () => {
      const ids = data?.serviceData?.flatMap((serviceList) => serviceList._id);
      setSubcategoriesIds(ids);
    };
    fetchData();
  }, []);

  const genarateSlotsData = {
    salons_id: data.salonData[0]?._id,
    service_id: subcategoriesIds,
    noPreference: true,
    dateforService: date,
  };

  const {
    data: slots,
    isLoading,
    isError,
    error,
  } = useTimeSlots(genarateSlotsData);

  const handleTimeSlotClick = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
  };

  useEffect(() => {
    const fullDate =
      showYear +
      "-" +
      String(showMonth + 1).padStart(2, "0") +
      "-" +
      String(selectedDate.date).padStart(2, "0");
    setDate(fullDate);
  }, [showMonth, showYear, selectedDate]);

  // console.log(genarateSlotsData);
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
      setSelectedMonthYear(nextMonthString);
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
      setSelectedMonthYear(prevMonthString);
    }
  };

  const handleRescheduleAppointment = async () => {
    // You can now access the selectedDate, selectedTime, and selectedTimeSlot
    console.log("Selected Date:", date);

    if (!selectedDate || !selectedMonthYear || !selectedTimeSlot) {
      return toast.error("Please select a time slot.", { toastId: 1 });
    }

    const reschedule = {
      date,
      time: selectedTimeSlot,
    };
    console.log(reschedule);

    const res = await rescheduleAppointment(data?._id, reschedule);

    if (res.res) {
      dispatch(closeModal());
      refetch();
      return toast.success(
        "The appointment has been rescheduled successfully."
      );
    }

    if (res.err) {
      return toast.error("Rescheduling failed. Please try again.");
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
        {data?.salonData.map((x, i) => (
          <div key={i} className={styles.salonInfo}>
            <img
              loading="lazy"
              src={x.salon_Img?.public_url}
              alt="frame1"
              className={styles.salonProfileImg}
            />
            <div className={styles.details}>
              <h4 className={styles.salonName}>{x.salon_name}</h4>
              <p className={styles.salonLocation}>{x.locationText}</p>
            </div>
          </div>
        ))}
        <hr className={styles.line} />
        <div className={styles.slotInfoWrapper}>
          <div className={styles.dateContainer}>
            <h2>
              Showing slots as per the salon and professional availability.
            </h2>
            <h4>Date</h4>
            <div className={styles.service_timeMonth}>
              <img
                loading="lazy"
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
                loading="lazy"
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
                      <FormDateComponent
                        index={i}
                        updateActiveCard={updateActiveCard}
                        actveCard={actveCard}
                        allCalendar={allCalendar}
                        setSelectedDate={setSelectedDate}
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
              {slots?.res?.data?.length > 0 ? (
                slots?.res?.data?.map((v, i) => {
                  return (
                    <Time
                      index={v}
                      activeTime={selectedTimeSlot}
                      updateActiveTime={handleTimeSlotClick}
                      key={i}
                      timeData={v}
                      date={date}
                    />
                  );
                })
              ) : (
                <ErrorComponent message={"No slots are available"} />
              )}

              {isLoading && <LoadSpinner />}

              {isError && (
                <ErrorComponent message={error?.message ?? "Error"} />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.buttonBox}>
        <p
          style={{
            width: "50%",
            display: "flex",
            justifyContent: "end",
            gap: "10px",
          }}
        >
          <SecondaryButton
            children={"cancel"}
            onClick={() => dispatch(closeModal())}
          />

          <PrimaryButton
            children={"Save"}
            onClick={handleRescheduleAppointment}
          />
        </p>
      </div>
    </div>
  );
};

export default RescheduleAppointment;
