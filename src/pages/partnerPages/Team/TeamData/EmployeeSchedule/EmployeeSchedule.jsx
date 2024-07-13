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

const EmployeeSchedule = () => {
  const [shiftTimesVisible, setShiftTimesVisible] = useState(
    Array(Days.length).fill(false)
  );
  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const { data, isLoading, isError, error, refetch } = useGetAllTeamMemSche();
  const toggleShiftTimes = (index) => {
    return toast.error("Shifting systems are not available right now");

    // const newShiftTimesVisible = [...shiftTimesVisible];
    // newShiftTimesVisible[index] = !newShiftTimesVisible[index];
    // setShiftTimesVisible(newShiftTimesVisible);
  };
  const teamMembers = data?.data.map((x) => {
    return {
      id: x._id,
      name: x.stylist_name,
      imageUrl: x.stylist_Img.public_url,
    };
  });

  const { data: Slots } = useGetSlots();

  const slots =
    Slots?.slotsPerDay[0]?.slots > 0
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
        ];
  useEffect(() => {
    setSelectedMember(teamMembers ? teamMembers[0] : null);
  }, [data]);

  const handleDaySelect = (e, selectedDay) => {
    // console.log(e.target.checked);

    const { name, value } = e.target;
    const updatedSelectedSlots = [...selectedSlots];
    const index = updatedSelectedSlots.findIndex(
      (slot) => slot.day === selectedDay.day
    );

    if (value === "Close") {
      // If "Close" is selected, set isClosed to true and empty the slots
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
      // If not "Close", update the slot values

      if (index !== -1) {
        if (name === "startTime") {
          updatedSelectedSlots[index].slots[0].start_time = value ?? "09:00";
          updatedSelectedSlots[index].isOnLeave = false; // Reset isOnLeave if startTime is selected
        } else if (name === "endTime") {
          updatedSelectedSlots[index].slots[0].end_time = value ?? "20:00";
          updatedSelectedSlots[index].isOnLeave = false; // Reset isOnLeave if endTime is selected
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
  };

  const handleSubmit = async () => {
    if (!startDate) {
      return toast.error("select start date");
    }
    if (!endDate) {
      return toast.error("select end date");
    }
    if (!selectedMember) {
      return toast.error("select member");
    }
    if (selectedSlots.length === 0) {
      return toast.error("select slots");
    }

    const scheduleStart = formatStateDate(startDate);
    const scheduleEnd = formatStateDate(endDate);
    const submitData = {
      scheduleStart,
      scheduleEnd,
      stylistId: selectedMember.id,
      dayWiseShift: selectedSlots,
    };

    console.log(submitData);

    const headers = {
      token: localStorage.getItem("jwtToken"),
    };
    try {
      const { data } = await axiosInstance.patch(
        "stylist/editEmployeeSchedule",
        submitData,
        { headers }
      );
      console.log(data);
      toast.success(data?.message || "");
    } catch (error) {
      console.log(error);
    }
  };
  if (isLoading) {
    return <LoadSpinner />;
  }
  if (isError) {
    return <ErrorComponent message={error ? error.message : "Error"} />;
  }
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
                  {teamMembers ? (
                    <CustomSelect2
                      options={null}
                      value={selectedMember}
                      onChange={setSelectedMember}
                      teamMembers={teamMembers}
                    />
                  ) : (
                    <ErrorComponent message={"Error"} />
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

            {Days.map((item, index) => (
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
                          <option value="">please select</option>

                          {slots.length > 0 &&
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
                          <option value="">please select</option>

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
                      <p>Add Shift</p>
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
            ))}
          </div>
          <div className={styles.SubmitBtn}>
            <button className={styles.CancelBtn}>Cancel</button>
            <button
              type="button"
              onClick={handleSubmit}
              className={styles.SaveBtn}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeSchedule;
