import React, { useState, useEffect, useMemo, memo } from "react";
import sty from "./ServiceOffer.module.css";

import selectedCircle from "../../../assets/icons/Success Circle.webp";
import ManageHolidays from "../../../components/_modals/ManageHolyDays/ManageHolidays";
import { getAllServices } from "../../../services/Services";

const ServiceOffer = ({
  salonData,
  setSalonData,
  setWorkingHours,
  PcScreen,
  mobileScreen,
  currentStep,
}) => {
  const allDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("20:00");
  const [serviceNames, setServiceNames] = useState([]);
  const [selectedService, setSelectedService] = useState([]);
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
  const handleSelectServices = (id) => {
    if (selectedService.includes(id)) {
      setSelectedService(selectedService.filter((item) => item !== id)); // Deselect id if already selected
    } else {
      setSelectedService([...selectedService, id]); // Select day if not selected
    }
  };

  const slots = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
  ];
  const handleAllDaysChange = () => {
    if (selectedDays.length === allDays.length) {
      setSelectedDays([]);
    } else {
      setSelectedDays(allDays);
    }
  };
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  useEffect(() => {
    setWorkingHours(generateScheduleData);
  }, [generateScheduleData, setWorkingHours]);
  useEffect(() => {
    setSalonData((pre) => {
      return {
        ...pre,
        services_provided: selectedService,
      };
    });
  }, [selectedService, setSalonData]);
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
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    async function fetchAllServices() {
      try {
        const { res, err } = await getAllServices();

        if (res) {
          // If the request was successful, update the state with the data

          const uniqueDataArray = res?.data?.data.reduce(
            (uniqueArray, currentItem) => {
              // Check if there's already an object with the same 'name' in uniqueArray
              if (
                !uniqueArray.some(
                  (item) => item.service_name === currentItem.service_name
                )
              ) {
                // If not found, add this object to uniqueArray
                uniqueArray.push(currentItem);
              }
              return uniqueArray;
            },
            []
          );

          setServiceNames(uniqueDataArray); // Assuming the response data contains a "data" property
        } else {
          console.error(err);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchAllServices();
  }, [salonData]);
  // console.log(selectedService);
  return (
    <div className={sty.mainContainer}>
      <div className={sty.mainDiv}>
        {(PcScreen || (mobileScreen && currentStep === 2)) && (
          <div className={sty.offerTitle}>
            <h3>What services do you offer?</h3>
            <p>
              You can add/edit service items within these categories anytime by
              visiting your Services page.
            </p>
            <div className={sty.gridContainer}>
              {serviceNames?.map((v, i) => {
                return (
                  <div
                    key={i}
                    className={sty.offerDiv}
                    onClick={() => handleSelectServices(v.service_name)}
                    style={{
                      border: `${
                        selectedService.includes(v.service_name)
                          ? "1px solid #0D69D7"
                          : ""
                      }`,
                      background: `${
                        selectedService.includes(v.service_name)
                          ? " #0D69D71A"
                          : ""
                      }`,
                    }}
                  >
                    {v?.service_name}

                    {selectedService.includes(v.service_name) && (
                      <img loading="lazy" src={selectedCircle} alt="" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {(PcScreen || (mobileScreen && currentStep === 4)) && (
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

                  <div className={sty.selectWrapper}>
                    <select
                      onChange={(e) => setStartTime(e.target.value)}
                      className={sty.selectWrapperOption}
                    >
                      {slots.map((x, i) => (
                        <option key={i} value={x}>
                          {x}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className={sty.content}>
                  <h3>Till (optional)</h3>

                  <div className={sty.selectWrapper}>
                    <select
                      onChange={(e) => setEndTime(e.target.value)}
                      className={sty.selectWrapperOption}
                    >
                      {slots.reverse().map((x, i) => (
                        <option key={i} value={x}>
                          {x}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div onClick={openModal} className={sty.HolidaysDiv}>
                Manage Holidays
              </div>
            </div>
          </div>
        )}
      </div>

      <div className={sty.horizontalLine}></div>
      <ManageHolidays showModal={isModalOpen} onClose={closeModal} />
    </div>
  );
};
export default ServiceOffer;
export const MemoizedServiceOffer = memo(ServiceOffer);
