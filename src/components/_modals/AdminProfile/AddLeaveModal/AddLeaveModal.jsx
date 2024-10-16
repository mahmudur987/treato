import React, { useContext, useState } from "react";
import Grey_Close from "../../../../assets/images/icons/Grey_Close.svg";
import styles from "./AddLeaveModal.module.css";
import search from "../../../../assets/images/TeamDetails/search.png";
import chevron_down from "../../../../assets/images/TeamDetails/chevron-down.png";
import plus from "../../../../assets/images/TeamDetails/plus.png";
import Profile_Pic from "../../../../assets/images/TeamDetails/pexels-stefan-stefancik-91227 1.png";
import Pick from "../../../../pages/partnerPages/Date/Pic";
import { TimeScheContext } from "../../../../pages/partnerPages/Team/TeamData/TimeSchedule";
import { formatCustomDate } from "../../../../pages/partnerPages/Team/TeamData/utils";
import { toast } from "react-toastify";
import axiosInstance from "../../../../services/axios";
const convertDate = (inputDate) => {
  const date = new Date(inputDate);
  date.setDate(date.getDate() + 31);
  const year = date.getFullYear();
  const month = String(date.getMonth()).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
const AddLeaveModal = ({ onClose }) => {
  const { schedule, member, sethandleShift, refetch } =
    useContext(TimeScheContext);
  const [timeFieldsCount, setTimeFieldsCount] = useState(1);
  const [isFullDayLeave, setIsFullDayLeave] = useState(false);
  const { day, month, date } = formatCustomDate(schedule?.date);
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const convertedDate = convertDate(startDate ? startDate : null);
  const handleFullDayLeaveChange = () => {
    setIsFullDayLeave(!isFullDayLeave);
  };

  const handleAddLeave = async () => {
    const headers = {
      token: localStorage.getItem("jwtToken"),
    };
    if (!startDate || !endDate) {
      return toast.error("Please select both start and end dates.");
    }

    if ((!isFullDayLeave && !startTime) || (!isFullDayLeave && !endTime)) {
      return toast.error("Please select both start and end times.");
    }

    const leaveData = {
      stylistId: member?.id,
      startDate: convertDate(startDate ? startDate : null),
      endDate: convertDate(endDate ? endDate : null),
      fullDay: isFullDayLeave,
      start_time: isFullDayLeave ? "" : startTime,
      end_time: isFullDayLeave ? "" : endTime,
    };

    console.log(leaveData);

    let url = `stylist/addLeave`;
    try {
      const { data } = await axiosInstance.patch(url, leaveData, { headers });
      console.log(data);
      toast.success(data.message ?? "Leave added successfully.");
      onClose();
      sethandleShift(false);
      refetch();
    } catch (error) {
      toast.error(
        error.message
          ? `An error occurred: ${error.message}`
          : "An unknown error occurred."
      );
      console.log(error);
    }
  };

  return (
    <div className={styles.shareMain}>
      <div className={styles.shareA}>
        <div className={styles.checkboxContainer}>
          <form className={styles.CheckBoxForm}>
            <div className={styles.ModalHeader}>
              <div className={styles.mob_d_none}>
                <div className={styles.shareB}>
                  <img
                    loading="lazy"
                    src={Grey_Close}
                    alt="close"
                    onClick={onClose}
                  />
                </div>
                <div className={styles.shareC}>Add Leave</div>
              </div>

              <div className={styles.selectPro}>
                <div className={styles.SubHeading}>Employee</div>

                <div className={styles.selectContainer}>
                  <img
                    loading="lazy"
                    src={member ? member.profile : Profile_Pic}
                    alt="Profile_Pic"
                    className={styles.Profile_Img}
                  />
                  <select name="" id="" className={styles.Select}>
                    <option value="">{member?.name}</option>
                  </select>
                </div>
              </div>
              <div className={styles.selectPro}>
                <div className={styles.SubHeading}>Type of Leave</div>

                <div className={styles.selectContainer}>
                  <select name="" id="" className={styles.Select}>
                    <option value="">Casual Leave</option>
                    <option value="">Medical Leave</option>
                  </select>
                </div>
              </div>

              <div className={styles.Profile_Time1}>
                <div className={styles.dateInput}>
                  <label htmlFor="">
                    <div className={styles.labelText}>Schedule Starts</div>
                    <Pick
                      ondateChange={(date) => setStartDate(date)}
                      className={styles.customPickWidth}
                    />
                  </label>
                </div>
                <div className={styles.dateInput}>
                  <label htmlFor="">
                    <div className={styles.labelText}>Schedule Date</div>
                    <Pick
                      ondateChange={(date) => setEndDate(date)}
                      className={styles.customPickWidth}
                    />
                  </label>
                </div>
              </div>
              <label className={styles.topLabel}>
                <input
                  type="checkbox"
                  onChange={handleFullDayLeaveChange}
                  checked={isFullDayLeave}
                />
                <span>Full-day leave</span>
              </label>
              <div className={styles.Profile_Time}>
                <div className={styles["inputField"]}>
                  <div className={styles.StartTime}>Start Time</div>
                  <select
                    name=""
                    id=""
                    className={styles.option}
                    disabled={isFullDayLeave}
                    onChange={(e) => setStartTime(e.target.value)}
                  >
                    <option value="">please select</option>

                    {schedule?.time_slots?.map((x, i) => (
                      <option key={i} value={x?.slot}>
                        {x?.slot}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles["inputField"]}>
                  <div className={styles.StartTime}>End Time</div>
                  <select
                    name=""
                    id=""
                    className={styles.option}
                    disabled={isFullDayLeave}
                    onChange={(e) => setEndTime(e.target.value)}
                  >
                    <option value="">please select</option>

                    {schedule?.time_slots?.map((x, i) => (
                      <option key={i} value={x?.slot}>
                        {x?.slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <p className={styles.noteInfo}>
              Online appointments cannot be placed when employees are on leave.
              Any existing appointments on these days will need to be reassigned
              from <span className={styles.Schedule}>Calendar.</span>
            </p>
            <div className={styles.horizontalLine}></div>
            <div className={styles.SubmitBtn}>
              <button className={styles.CancelBtn} onClick={onClose}>
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddLeave}
                className={styles.SaveBtn}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddLeaveModal;
