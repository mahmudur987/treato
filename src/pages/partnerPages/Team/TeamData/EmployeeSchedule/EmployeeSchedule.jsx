import React, { useEffect, useState } from "react";
import styles from "./EmployeeSchedule.module.css";
import arrowLeft from "../../../../../assets/images/AccountSettings/arrow-left.svg";
import { Link } from "react-router-dom";
import plus from "../../../../../assets/images/TeamDetails/plus.png";
import copy from "../../../../../assets/images/TeamDetails/copy.png";
import Pick from "../../../Date/Pic";
import {
  useGetAllTeamMemSche,
  useGetSlots,
} from "../../../../../services/Team";
import { useCallback, useMemo } from "react";

import { formatStateDate } from "../utils";
import CustomSelect2 from "../../../../../components/Select/CustomeSelect2/CustomeSelect2";
import ErrorComponent from "../../../../../components/ErrorComponent/ErrorComponent";
import LoadSpinner from "../../../../../components/LoadSpinner/LoadSpinner";
import axiosInstance from "../../../../../services/axios";
import { toast } from "react-toastify";

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

const EmployeeSchedule = () => {
  // State declarations
  const [shiftTimesVisible, setShiftTimesVisible] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [loading, setLoading] = useState(false);
  // Formatted start and end dates
  const x = useMemo(() => formatStateDate(startDate), [startDate]);
  const y = useMemo(() => formatStateDate(endDate), [endDate]);

  // Data fetching
  const { data, isLoading, isError } = useGetAllTeamMemSche(x, y);

  const shiftTime = useMemo(
    () =>
      selectedMember?.timeForServices?.map((x) => ({
        date: x.date,
        shifts: x.shifts,
        isClosed: x.isClosed,
        isOnLeave: x?.isOnLeave,
      })) ?? [],
    [selectedMember]
  );
  // Filter function for 7-day range
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
        .map((item) => ({
          day: convertDateToDay(item.date),
          date: item.date,
          slots: item.shifts,
          isClosed: item.isClosed,
          isOnLeave: item?.isOnLeave,
        }));
    },
    [shiftTime]
  );

  useEffect(() => {
    if (x) {
      const weekData = filterWeekData(x);

      setSelectedSlots((prevSlots) =>
        JSON.stringify(prevSlots) !== JSON.stringify(weekData)
          ? weekData
          : prevSlots
      );
    }
  }, [x, filterWeekData]);

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
  useEffect(() => {
    setSelectedMember(teamMembers.length > 0 ? teamMembers[0] : null);
  }, [teamMembers]);

  const { data: Slots } = useGetSlots();

  // Set default slots if no slots data
  const slots = useMemo(
    () =>
      Slots?.slotsPerDay[0]?.slots?.length > 0
        ? Slots?.slotsPerDay[0]?.slots
        : [
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
          ],
    [Slots]
  );

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
          });
        }
      } else {
        if (index !== -1) {
          if (name === "startTime") {
            updatedSelectedSlots[index].slots[0].start_time = value ?? "09:00";
            updatedSelectedSlots[index].isOnLeave = false;
          } else if (name === "endTime") {
            updatedSelectedSlots[index].slots[0].end_time = value ?? "20:00";
            updatedSelectedSlots[index].isOnLeave = false;
          }
        } else {
          updatedSelectedSlots.push({
            day: selectedDay.day,
            isOnLeave: false,
            slots: [
              {
                start_time: name === "startTime" ? value : "09:00",
                end_time: name === "endTime" ? value : "20:00",
              },
            ],
          });
        }
      }
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

    const submitData = {
      scheduleStart,
      scheduleEnd,
      stylistId: selectedMember.id,
      dayWiseShift: selectedSlots,
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
      toast.success(data?.message || "Schedule updated successfully!");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
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
                    />
                  ) : (
                    <LoadSpinner />
                  )}
                </div>
              </div>

              <div className={styles.dateInput}>
                <label htmlFor="">
                  <div className={styles.labelText}>Schedule Start </div>
                  <Pick
                    ondateChange={(data) => setStartDate(data)}
                    className={styles.customPickWidth}
                  />
                </label>
              </div>
              <div className={styles.dateInput}>
                <label htmlFor="">
                  <div className={styles.labelText}>Schedule End </div>
                  <Pick
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

            {Days.map((item, index) => {
              const c = selectedSlots.find((x) => x.day === item.day);
              // console.log(c);
              return (
                <div className={styles.mainMapDiv1} key={index}>
                  <div className={styles.mainMapDiv}>
                    <div className={styles.EplyShiptcheck}>
                      <input
                        checked={
                          selectedSlots.find((x) => x.day === item.day) ?? false
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
                            name="startTime"
                            className={styles.EplyShiptSelectBox}
                            onChange={(e) => handleDaySelect(e, item)}
                          >
                            <option value="">
                              {c &&
                                c?.slots.length > 0 &&
                                c?.slots[0]?.start_time}
                              {c &&
                                c?.slots.length === 0 &&
                                c.isOnLeave &&
                                "Leave"}
                              {c &&
                                c?.slots.length === 0 &&
                                c.isClosed &&
                                "Closed"}

                              {!c && "please select"}
                            </option>

                            {slots?.length > 0 &&
                              slots?.map((x, i) => (
                                <option key={i} value={x.slot}>
                                  {x}{" "}
                                </option>
                              ))}
                            <option value="Close">Leave</option>
                          </select>
                        </div>
                        <div>
                          <select
                            name="endTime"
                            className={styles.EplyShiptSelectBox}
                            onChange={(e) => handleDaySelect(e, item)}
                          >
                            <option value="">
                              {c &&
                                c?.slots.length > 0 &&
                                c?.slots[0]?.end_time}
                              {c &&
                                c?.slots.length === 0 &&
                                c.isOnLeave &&
                                "Leave"}
                              {c &&
                                c?.slots.length === 0 &&
                                c.isClosed &&
                                "Closed"}

                              {!c && "please select"}
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
                      {shiftTimesVisible[index] && (
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
                      </div>
                    </div>
                    <div className={styles.copyImgR}>
                      <img src={copy} alt="copyImg" />
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
    </div>
  );
};

export default EmployeeSchedule;
