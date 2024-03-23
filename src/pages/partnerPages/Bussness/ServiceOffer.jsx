import React, { useState, useEffect, useMemo } from "react";
import sty from "./ServiceOffer.module.css";
import CollaseIcon from "../../../assets/images/TeamDetails/chevron-down.png";
import { useGetSlots } from "../../../services/Team";
import ErrorComponent from "../../../components/ErrorComponent/ErrorComponent";

const ServiceOffer = ({ salonData, setSalonData, setWorkingHours }) => {
  const allDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const [selectedDays, setSelectedDays] = useState([]);
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("09:00");
  const generateScheduleData = useMemo(() => {
    return selectedDays.map((day) => {
      return {
        day: day,
        opening_time: startTime,
        closing_time: endTime,
      };
    });
  }, [selectedDays, startTime, endTime]);

  const handleDayChange = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((item) => item !== day)); // Deselect day if already selected
    } else {
      setSelectedDays([...selectedDays, day]); // Select day if not selected
    }
  };
  const { data, isError, error } = useGetSlots();
  const slots = data?.slotsPerDay[0].slots;

  const handleAllDaysChange = () => {
    if (selectedDays.length === allDays.length) {
      setSelectedDays([]); // Deselect all days if all are selected
    } else {
      setSelectedDays(allDays); // Select all days if not all are selected
    }
  };
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  useEffect(() => {
    setWorkingHours(generateScheduleData);
  }, [generateScheduleData]);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsCollapsed(false);
      } else {
        setIsCollapsed(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <div className={sty.collapseForSmallScreen}>
        <div>
          <h1>Store timings</h1>
          <p>Manage opening and closing hours.</p>
        </div>
        <div className={sty.CollaseIconImg1}>
          <img
            src={CollaseIcon}
            alt="CollapseIcon"
            onClick={toggleCollapse}
            className={sty.CollaseIconImg}
          />
        </div>
      </div>
      {isCollapsed && (
        <div className={sty.mainDiv}>
          <div className={sty.offerTitle}>
            <h3>What services do you offer?</h3>
            <p>
              You can add/edit service items within these categories anytime by
              visiting your Services page.
            </p>
            <div className={sty.gridContainer}>
              {
                // salonData.services_provided.length ?
                salonData.services_provided.length > 0 ? (
                  salonData.services_provided.map((v) => {
                    return <div className={sty.offerDiv}>{v}</div>;
                  })
                ) : (
                  <p>please add a service</p>
                )
              }
            </div>
          </div>

          <div className={sty.scheHeading1}>
            <div className={sty.scheHeading}>
              <h2>Store open timings</h2>
              <p>
                Your salon will appear Open/Closed as per the below schedule
                (except on set holidays), unless marked closed.
              </p>
            </div>
            <div className={sty.CheckBoxForm}>
              <label className={sty.topLabel}>
                <input
                  type="checkbox"
                  checked={selectedDays.length === allDays.length}
                  onChange={handleAllDaysChange}
                />
                <span>Every day of the week</span>
              </label>
              <div className={sty.horizontalLineSelete}></div>

              <div className={sty.days}>
                {allDays.map((day) => (
                  <div className={`${sty.date}`} key={day}>
                    <label className={sty.topLabel}>
                      <input
                        type="checkbox"
                        checked={selectedDays.includes(day)}
                        onChange={() => handleDayChange(day)}
                      />
                      <span>{day}</span>
                    </label>
                  </div>
                ))}
              </div>
              <div className={sty.horizontalLineSelete}></div>
              <div className={sty.selectsContainer}>
                <div className={sty.content}>
                  <h3>Available from (optional)</h3>
                  <h4>Open from</h4>
                  <div className={sty.selectWrapper}>
                    {data && !isError ? (
                      <select
                        onChange={(e) => setStartTime(e.target.value)}
                        className={sty.selectWrapperOption}
                      >
                        <option value="">please select</option>
                        {slots.map((x, i) => (
                          <option value={x}>{x}</option>
                        ))}
                      </select>
                    ) : (
                      <ErrorComponent
                        message={error ? error.message : "Error"}
                      />
                    )}
                  </div>
                </div>
                <div className={sty.content}>
                  <h3>Till (optional)</h3>
                  <h4>Till</h4>
                  <div className={sty.selectWrapper}>
                    {data && !isError ? (
                      <select
                        onChange={(e) => setEndTime(e.target.value)}
                        className={sty.selectWrapperOption}
                      >
                        <option value="">please select</option>
                        {slots.map((x, i) => (
                          <option value={x}>{x}</option>
                        ))}
                      </select>
                    ) : (
                      <ErrorComponent
                        message={error ? error.message : "Error"}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className={sty.store_closed_today}>
                <p>Mark store closed for today</p>
                <label className={sty.toggle} id="toggle">
                  <input type="checkbox" />
                  <span className={sty.toggleSlider}></span>
                </label>
              </div>
              <div className={sty.HolidaysDiv}>Manage Holidays</div>
            </div>
          </div>
        </div>
      )}

      <div className={sty.horizontalLine}></div>
    </div>
  );
};
export default ServiceOffer;
