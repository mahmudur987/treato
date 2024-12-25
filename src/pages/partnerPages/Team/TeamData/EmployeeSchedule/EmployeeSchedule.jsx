import React, { useEffect, useState } from "react";
import styles from "./EmployeeSchedule.module.css";
import arrowLeft from "../../../../../assets/images/AccountSettings/arrow-left.svg";
import { Link, useLocation } from "react-router-dom";
import Pick from "../../../Date/Pic";
import {
  useGetAllTeamMemSche,
  useGetSingleMember,
  useGetSlots,
} from "../../../../../services/Team";
import { useCallback, useMemo } from "react";

import { DateAndTime, formatStateDate } from "../utils";
import CustomSelect2 from "../../../../../components/Select/CustomeSelect2/CustomeSelect2";

import axiosInstance from "../../../../../services/axios";
import { toast } from "react-toastify";
import { useSingleSalon } from "../../../../../services/salon";
import LoadSpinner from "../../../../../components/LoadSpinner/LoadSpinner";

const Days = [
  {
    day: "Monday",
  },
  {
    day: "Tuesday",
  },
  {
    day: "Wednesday",
  },
  {
    day: "Thursday",
  },
  {
    day: "Friday",
  },
  {
    day: "Saturday",
  },
  {
    day: "Sunday",
  },
];
function convertDateToDay(dateString) {
  const date = new Date(dateString);
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return daysOfWeek[date.getDay()];
}
const convertTo24Hour = (time12h) => {
  const [time, modifier] = time12h.split(" ");
  let [hours, minutes] = time.split(":");

  if (hours === "12") {
    hours = "00";
  }

  if (modifier?.toUpperCase() === "PM") {
    hours = parseInt(hours, 10) + 12;
  }

  return `${hours.length === 1 ? `0${hours}` : hours}:${minutes}`;
};

const EmployeeSchedule = () => {
  const location = useLocation();
  const id = location.pathname.split("/").pop();
  const { data: salon, isLoading: salonIsLoading, refetch } = useSingleSalon();
  // State declarations
  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedMemberIndex, setSelectedMemberIndex] = useState(0);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [loading, setLoading] = useState(false);
  // Formatted start and end dates
  const x = useMemo(() => formatStateDate(startDate), [startDate]);
  const y = useMemo(() => formatStateDate(endDate), [endDate]);

  // Data fetching
  const {
    data,
    isLoading,
    isError,
    refetch: refetch1,
  } = useGetAllTeamMemSche(x, y);

  const salonOpeningData = salon?.salon?.working_hours || [];

  const {
    data: member,
    isLoading: memberIsLoading,
    isError: memberIsError,
  } = useGetSingleMember(selectedMember?.id);
  const serviceStartDate = member?.data?.Service_Start_Date;
  const serviceEndDate = member?.data?.Service_End_Date;

  useEffect(() => {
    if (member && !memberIsLoading && !memberIsError) {
      setStartDate(member?.data?.Service_Start_Date);
      setEndDate(member?.data?.Service_End_Date);
    }
  }, [member, memberIsLoading, memberIsError]);

  const shiftTime = useMemo(
    () =>
      selectedMember?.timeForServices?.map((x) => {
        if (x?.time_slots?.length > 0) {
          const { startTime, endTime } = DateAndTime(x?.date, x?.time_slots);
          const data = {
            date: x.date,
            shifts: [
              {
                start_time: convertTo24Hour(startTime),
                end_time: convertTo24Hour(endTime),
              },
            ],
            isClosed: x.isClosed,
            isOnLeave: x.isOnLeave,
          };
          return data;
        } else {
          return {
            date: x.date,
            shifts: [],
            isClosed: x.isClosed,
            isOnLeave: x?.isOnLeave,
          };
        }
      }) ?? [],
    [selectedMember]
  );

  // Filter function for 7-day range
  const salonDaysOpen = new Set(salonOpeningData.map((entry) => entry.day));

  // Function to get opening time in 24-hour format
  const getOpeningTime = (day) => {
    const dayInfo = salonOpeningData.find(
      (d) => d.day.toLowerCase() === day.toLowerCase()
    );
    return dayInfo ? convertTo24Hour(dayInfo.opening_time) : "Closed";
  };

  // Function to get closing time in 24-hour format
  const getClosingTime = (day) => {
    const dayInfo = salonOpeningData.find(
      (d) => d.day.toLowerCase() === day.toLowerCase()
    );
    return dayInfo ? convertTo24Hour(dayInfo.closing_time) : "Closed";
  };

  const filterWeekData = useCallback(
    (startDateStr) => {
      if (!shiftTime) return [];

      const startDate = new Date(startDateStr);
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 6); // 7-day range

      return shiftTime
        .filter((item) => {
          const itemDate = new Date(item.date);
          return itemDate >= startDate && itemDate <= endDate;
        })
        .map((item) => {
          const dayName = convertDateToDay(item.date); // Convert date to day name

          return {
            day: dayName,
            date: item.date,
            slots: item.shifts,
            isClosed: item.isClosed,
            isOnLeave: item?.isOnLeave,
            salonIsOpen: salonDaysOpen.has(dayName), // Check if salon is open on this day
          };
        });
    },
    [shiftTime]
  );
  useEffect(() => {
    if (x) {
      const weekData = filterWeekData(x);
      // console.log(shiftTime, "weekData");

      setSelectedSlots((prevSlots) =>
        JSON.stringify(prevSlots) !== JSON.stringify(weekData)
          ? weekData
          : prevSlots
      );
    }
  }, [x, filterWeekData, selectedMember]);

  // Map team members if data is available
  const teamMembers = useMemo(
    () =>
      data?.data?.map((x) => ({
        id: x._id,
        name: x.stylist_name,
        imageUrl: x.stylist_Img?.public_url,
        timeForServices: x.time_for_service,
      })) ?? [],
    [data]
  );

  // Set default member on data fetch
  // Set default or existing selected member on data fetch/update

  useEffect(() => {
    if (teamMembers.length > 0) {
      // Keep the selected member at the same index if possible
      const index = teamMembers.findIndex((item) => item.id === id);

      const indexToSelect =
        selectedMemberIndex !== 0 ? selectedMemberIndex : index;
      setSelectedMember(teamMembers[indexToSelect]);
    } else {
      setSelectedMember(null); // No members available
    }
  }, [teamMembers, selectedMemberIndex, id]);

  const { data: Slots, isLoading: SlotsIsLoading } = useGetSlots();

  // Handle day select
  const handleDaySelect = useCallback(
    (e, selectedDay) => {
      const { name, value, checked } = e.target;
      const updatedSelectedSlots = [...selectedSlots];
      const index = updatedSelectedSlots.findIndex(
        (slot) => slot.day === selectedDay.day
      );

      if (checked === false && index !== -1) {
        updatedSelectedSlots.splice(index, 1);
      } else if (value === "Close") {
        if (index !== -1) {
          updatedSelectedSlots[index].isOnLeave = true;
          updatedSelectedSlots[index].slots = [];
        } else {
          updatedSelectedSlots.push({
            day: selectedDay.day,
            isOnLeave: true,
            slots: [],
            salonIsOpen: salonDaysOpen.has(selectedDay.day),
          });
        }
      } else {
        if (index !== -1) {
          if (!updatedSelectedSlots[index].slots[0]) {
            // Initialize the first slot if it does not exist
            updatedSelectedSlots[index].slots[0] = {};
          }

          if (name === "startTime") {
            updatedSelectedSlots[index].slots[0].start_time = value ?? "09:00";
            updatedSelectedSlots[index].isOnLeave = false;
          } else if (name === "endTime") {
            updatedSelectedSlots[index].slots[0].end_time = value ?? "20:00";
            updatedSelectedSlots[index].isOnLeave = false;
          }
        } else {
          console.log(55);

          updatedSelectedSlots.push({
            day: selectedDay.day,
            isOnLeave: false,
            salonIsOpen: salonDaysOpen.has(selectedDay.day),
            slots: [
              {
                start_time:
                  name === "startTime"
                    ? value
                    : getOpeningTime(selectedDay?.day),
                end_time:
                  name === "endTime" ? value : getClosingTime(selectedDay?.day),
              },
            ],
          });
        }
      }

      console.log(updatedSelectedSlots);

      setSelectedSlots(updatedSelectedSlots);
    },
    [selectedSlots]
  );
  // Handle form submission
  const handleSubmit = useCallback(async () => {
    if (!startDate) return toast.error("Please select a start date.");
    if (!endDate) return toast.error("Please select an end date.");
    if (!selectedMember) return toast.error("Please select a member.");
    if (selectedSlots.length === 0)
      return toast.error("Please select at least one slot.");

    const scheduleStart = formatStateDate(startDate);
    const scheduleEnd = formatStateDate(endDate);
    const updatedData = selectedSlots.map(({ salonIsOpen, ...rest }) => rest);
    const submitData = {
      scheduleStart,
      scheduleEnd,
      stylistId: selectedMember.id,
      dayWiseShift: updatedData,
    };

    try {
      setLoading(true);
      const { data } = await axiosInstance.patch(
        "stylist/editEmployeeSchedule",
        submitData,
        {
          headers: { token: localStorage.getItem("jwtToken") },
        }
      );

      setStartDate(null);

      setEndDate(null);
      toast.success(data?.message || "Schedule updated successfully!");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
      refetch();
      refetch1();
    }
  }, [startDate, endDate, selectedMember, selectedSlots]);
  // Show error message if shift times are unavailable
  const toggleShiftTimes = useCallback((index) => {
    toast.error("Shifting systems are not available right now");
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.usr_detail_head}>
        <Link to={"/partner/dashboard/TeamManageMent"}>
          <span>
            <img src={arrowLeft} alt="arrowLeft" className={styles.Pictures} />
          </span>
        </Link>
        Edit Employee Schedule
        <p className={styles.usr_detail_Para}>
          Set weekly schedule. Changes will apply to all upcoming shifts from
          the schedule start date
        </p>
      </div>
      {salonIsLoading ? <LoadSpinner /> : ""}
      {salon && !salonIsLoading && (
        <div>
          <form>
            <div className={styles.mainDiv}>
              <div className={styles.Profile_Pic_Main}>
                <div className={styles.selectPro}>
                  <div className={styles.SubHeading}>Employee</div>

                  <div className={styles.selectContainer}>
                    {data && !isLoading && !isError && teamMembers ? (
                      <CustomSelect2
                        options={null}
                        value={selectedMember}
                        onChange={setSelectedMember}
                        teamMembers={teamMembers}
                        setSelectedMemberIndex={setSelectedMemberIndex}
                      />
                    ) : (
                      <p>Loading.... </p>
                    )}
                  </div>
                </div>

                <div className={styles.dateInput}>
                  <label htmlFor="">
                    <div className={styles.labelText}>Schedule Start </div>
                    <Pick
                      date={x ? x : "DD/MM/YYYY"}
                      ondateChange={(data) => setStartDate(data)}
                      className={styles.customPickWidth}
                      minDate={serviceStartDate}
                      maxDate={serviceEndDate}
                    />
                  </label>
                </div>
                <div className={styles.dateInput}>
                  <label htmlFor="">
                    <div className={styles.labelText}>Schedule End </div>
                    <Pick
                      minDate={serviceStartDate}
                      maxDate={serviceEndDate}
                      date={y ? y : "DD/MM/YYYY"}
                      ondateChange={(data) => setEndDate(data)}
                      className={styles.customPickWidth}
                    />
                  </label>
                </div>
              </div>
              <div className={styles.horizontalLine}></div>
              <div className={styles.headingShift}>Day-wise Shifts</div>
              <div className={styles.headingShift1}>
                <p>Day</p>
                <p>start Time</p>
                <p>End Time</p>
              </div>
              {isLoading && <LoadSpinner />}
              {data &&
                !isLoading &&
                Days.map((item, index) => {
                  const c = selectedSlots.find((x) => x.day === item.day);
                  const slots =
                    Slots?.slotsPerDay.find((x) => x.day === item.day)?.slots ||
                    [];
                  return (
                    <div className={styles.mainMapDiv1} key={index}>
                      <div className={styles.mainMapDiv}>
                        <div className={styles.EplyShiptcheck}>
                          <input
                            disabled={!salonDaysOpen.has(item.day)}
                            checked={
                              selectedSlots.find((x) => x.day === item.day) ??
                              false
                            }
                            type="checkbox"
                            onChange={(e) => handleDaySelect(e, item)}
                          />
                          <p>{item.day}</p>
                        </div>
                        <div>
                          <div className={styles.EplyShiptSelect}>
                            <div>
                              <select
                                disabled={!salonDaysOpen.has(item.day)}
                                name="startTime"
                                className={styles.EplyShiptSelectBox}
                                onChange={(e) => handleDaySelect(e, item)}
                              >
                                <option value="">
                                  {c?.salonIsOpen &&
                                    c?.slots.length === 0 &&
                                    "Error"}
                                  {c &&
                                    c?.slots.length > 0 &&
                                    c?.salonIsOpen &&
                                    c?.slots[0]?.start_time}
                                  {c && c?.salonIsOpen === false && "Closed"}
                                  {c &&
                                    c?.slots.length === 0 &&
                                    c?.salonIsOpen &&
                                    c?.isOnLeave &&
                                    "Leave"}
                                  {c &&
                                    c?.slots.length === 0 &&
                                    c?.salonIsOpen &&
                                    c?.isClosed &&
                                    "Closed"}
                                  {c &&
                                    c?.slots.length === 0 &&
                                    c?.salonIsOpen &&
                                    !c?.isClosed &&
                                    !c?.isOnLeave &&
                                    "00:00"}

                                  {!c &&
                                    salonDaysOpen.has(item.day) &&
                                    "please select"}
                                  {!c &&
                                    !salonDaysOpen.has(item.day) &&
                                    "Closed"}
                                </option>

                                {!SlotsIsLoading &&
                                  slots?.length > 0 &&
                                  slots?.map((x, i) => (
                                    <option key={i} value={x?.slot}>
                                      {x}{" "}
                                    </option>
                                  ))}
                                {SlotsIsLoading && <option>Loading</option>}
                                <option value="Close">Leave</option>
                              </select>
                            </div>
                            <div>
                              <select
                                disabled={!salonDaysOpen.has(item.day)}
                                name="endTime"
                                className={styles.EplyShiptSelectBox}
                                onChange={(e) => handleDaySelect(e, item)}
                              >
                                <option value="">
                                  {c?.salonIsOpen &&
                                    c?.slots.length === 0 &&
                                    "Error"}
                                  {c &&
                                    c?.slots?.length > 0 &&
                                    c?.salonIsOpen &&
                                    c?.slots[0]?.end_time}
                                  {c &&
                                    c?.slots?.length > 0 &&
                                    c?.salonIsOpen &&
                                    !c?.slots[0]?.end_time &&
                                    "00:00"}
                                  {c && !c?.salonIsOpen && "Closed"}
                                  {c &&
                                    c?.slots?.length === 0 &&
                                    c?.salonIsOpen &&
                                    c?.isOnLeave &&
                                    "Leave"}
                                  {c &&
                                    c?.slots.length === 0 &&
                                    c?.salonIsOpen &&
                                    !c?.isClosed &&
                                    !c?.isOnLeave &&
                                    "00:00"}
                                  {c &&
                                    c?.slots.length === 0 &&
                                    c?.salonIsOpen &&
                                    c?.isClosed &&
                                    "Closed"}

                                  {!c &&
                                    salonDaysOpen.has(item.day) &&
                                    "please select"}
                                  {!c &&
                                    !salonDaysOpen.has(item.day) &&
                                    "Closed"}
                                </option>

                                {slots.length > 0 &&
                                  slots?.map((x, i) => (
                                    <option key={i} value={x.slot}>
                                      {x}{" "}
                                    </option>
                                  ))}
                                <option value="Close">Leave</option>
                              </select>
                            </div>
                          </div>
                          {/* {shiftTimesVisible[index] && (
                            <div className={styles.EplyShiptSelect}>
                              <div>
                                <select className={styles.EplyShiptSelectBox}>
                                  <option value="">please select</option>

                                  {slots.map((x, i) => (
                                    <option key={i} value="">
                                      {x}{" "}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <select className={styles.EplyShiptSelectBox}>
                                  <option value="">please select</option>

                                  {slots.map((x, i) => (
                                    <option key={i} value="">
                                      {x}{" "}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          )}
                          <div
                            className={styles.plusImgDiv}
                            onClick={() => toggleShiftTimes(index)}
                          >
                            <img src={plus} alt="" />
                            <p className={styles.addShift}>Add Shift</p>
                            <img
                              src={copy}
                              alt="copyImg"
                              className={styles.copyImgRespons}
                            />
                          </div> */}
                        </div>
                        <div className={styles.copyImgR}>
                          {/* <img src={copy} alt="copyImg" /> */}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className={styles.SubmitBtn}>
              <Link to={"/partner/dashboard/TeamManageMent"}>
                <button className={styles.CancelBtn}>Cancel</button>
              </Link>

              <button
                type="button"
                onClick={handleSubmit}
                className={styles.SaveBtn}
                disabled={loading}
              >
                {loading ? "Loading" : "save"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default EmployeeSchedule;
