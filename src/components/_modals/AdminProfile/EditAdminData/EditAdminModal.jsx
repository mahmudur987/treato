import React, { useContext, useState } from "react";
import Grey_Close from "../../../../assets/images/icons/Grey_Close.svg";
import styles from "./EditAdminModal.module.css";
import search from "../../../../assets/images/TeamDetails/search.png";
import chevron_down from "../../../../assets/images/TeamDetails/chevron-down.png";
import plus from "../../../../assets/images/TeamDetails/plus.png";
import Profile_Pic from "../../../../assets/images/TeamDetails/pexels-stefan-stefancik-91227 1.png";
import { TimeScheContext } from "../../../../pages/partnerPages/Team/TeamData/TimeSchedule";
import { formatCustomDate } from "../../../../pages/partnerPages/Team/TeamData/utils";
import { toast } from "react-toastify";
import axiosInstance from "../../../../services/axios";
import { useGetSlots } from "../../../../services/Team";
import ErrorComponent from "../../../ErrorComponent/ErrorComponent";

const EditAdminModal = ({ onClose }) => {
  const { schedule, member, refetch, sethandleShift } =
    useContext(TimeScheContext);
  const { day, month, date } = formatCustomDate(schedule?.date);
  const [timeFieldsCount, setTimeFieldsCount] = useState(1);
  const [startTime, setStartTime] = useState("");
  const [startTime2, setStartTime2] = useState("");
  const [endTime, setEndTime] = useState("");
  const [endTime2, setEndTime2] = useState("");
  const handleAddTimeFields = () => {
    setTimeFieldsCount((prevCount) => prevCount + 1);
  };

  const { data, isLoading, isError, error } = useGetSlots();
  // const { slots } = data?.slotsPerDay[0] || {};
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
  const handleEditShift = async () => {
    const headers = {
      token: localStorage.getItem("jwtToken"),
    };
    if (!startTime || !endTime) {
      return toast.error("select Start/End Time");
    } else {
      if (startTime2 && endTime2) {
        const newdata = {
          stylistId: member?.id,
          date: schedule?.date,
          newShifts: [
            {
              start_time: startTime,
              end_time: endTime,
            },
            {
              start_time: startTime2,
              end_time: endTime2,
            },
          ],
        };
        try {
          const { data } = await axiosInstance.patch(
            "/stylist/editShift",
            newdata,
            { headers }
          );
          refetch();
          toast.success("shift edit successfully");
          onClose();
          sethandleShift(false);
        } catch (error) {
          toast.error(error.message);
          console.log(error);
        }
      } else {
        const newdata = {
          stylistId: member?.id,
          date: schedule?.date,
          newShifts: [
            {
              start_time: startTime,
              end_time: endTime,
            },
          ],
        };
        try {
          const { data } = await axiosInstance.patch(
            "/stylist/editShift",
            newdata,
            { headers }
          );
          console.log(data);
          toast.success("shift edit successfully");
          onClose();
          refetch();
          sethandleShift(false);
        } catch (error) {
          toast.error(error.message);
          console.log(error);
        }
      }
    }
  };
  return (
    <div className={styles.shareMain}>
      <div className={styles.shareA}>
        <div className={styles.checkboxContainer}>
          <div className={styles.mob_d_none}>
            <div className={styles.shareC}>
              Edit Shift - {day.slice(0, 3)} {month}
              {date}
            </div>
            <div className={styles.shareB}>
              <img src={Grey_Close} alt="close" onClick={onClose} />
            </div>
          </div>
          <form className={styles.CheckBoxForm}>
            <div className={styles.ModalHeader}>
              <div className={styles.selectPro}>
                <div className={styles.SubHeading}>Employee</div>

                <div className={styles.selectContainer}>
                  <select name="" id="" className={styles.Select}>
                    <option value="">{member?.name}</option>
                  </select>
                  <img
                    src={member ? member.profile : Profile_Pic}
                    alt="Profile_Pic"
                    className={styles.Profile_Img}
                  />
                </div>
              </div>

              {timeFieldsCount >= 0 && (
                <div className={styles.Profile_Time}>
                  <div className={styles["inputField"]}>
                    <div className={styles.StartTime}>Start Time</div>
                    <select
                      onChange={(e) => setStartTime(e.target.value)}
                      name=""
                      id=""
                      className={styles.option}
                    >
                      <option value="">please select</option>

                      {slots && !isLoading && !isError ? (
                        slots.map((x, i) => (
                          <option key={i} value={x?.slot}>
                            {x}
                          </option>
                        ))
                      ) : (
                        <ErrorComponent
                          message={error ? error.message : "slots error"}
                        />
                      )}
                    </select>
                  </div>
                  <div className={styles["inputField"]}>
                    <div className={styles.StartTime}>End Time</div>
                    <select
                      onChange={(e) => setEndTime(e.target.value)}
                      name=""
                      id=""
                      className={styles.option}
                    >
                      <option value="">please select</option>

                      {slots && !isLoading && !isError ? (
                        slots.map((x, i) => (
                          <option key={i} value={x?.slot}>
                            {x}
                          </option>
                        ))
                      ) : (
                        <ErrorComponent
                          message={error ? error.message : "slots error"}
                        />
                      )}
                    </select>
                  </div>
                </div>
              )}
              {timeFieldsCount > 1 && (
                <div className={styles.Profile_Time}>
                  <div className={styles["inputField"]}>
                    <div className={styles.StartTime}>Start Time</div>
                    <select
                      onChange={(e) => setStartTime2(e.target.value)}
                      name=""
                      id=""
                      className={styles.option}
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
                      onChange={(e) => setEndTime2(e.target.value)}
                      name=""
                      id=""
                      className={styles.option}
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
              )}
            </div>
            {timeFieldsCount === 2 ? null : (
              <div onClick={handleAddTimeFields} className={styles.plusDiv}>
                <img src={plus} alt="plus" className={styles.plus} />
                <span>Add another shift for this day</span>
              </div>
            )}

            <p className={styles.note}>
              You are editing this day’s shift only. To set regular shifts for
              this employee, click on{" "}
              <span className={styles.Schedule}>Edit Employee Schedule</span>
            </p>
            <div className={styles.horizontalLine}></div>
            <div className={styles.SubmitBtn}>
              <button className={styles.CancelBtn} onClick={onClose}>
                Cancel
              </button>
              <button
                type="button"
                onClick={handleEditShift}
                className={styles.SaveBtn}
              >
                Apply
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditAdminModal;
