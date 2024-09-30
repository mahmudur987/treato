import React, { useState, useEffect } from "react";
import style from "./schedule.module.css";
import { toast, Bounce } from "react-toastify";
import { Link } from "react-router-dom";
import {
  cancelAppointment,
  completeAppointment,
  noShow,
  startedAppointment,
  otpVerification,
} from "../../../services/calender";

const ScheduleTable = ({ profiles, getdata }) => {
  const [openMenus, setOpenMenus] = useState({});
  const [otp, setOtp] = useState(null);
  const [durations, setDurations] = useState([]);
  const [condition, setCondition] = useState(false);

  const toastSetting = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  };

  useEffect(() => {
    generateTimeArray();
  }, []);

  useEffect(() => {
    if (profiles?.length === 1) {
      setCondition(true);
    } else {
      setCondition(false);
    }
  }, [profiles]);

  const generateTimeArray = () => {
    const startTime = new Date();
    startTime.setHours(7, 0, 0, 0); // 7:00 AM
    const endTime = new Date();
    endTime.setHours(22, 0, 0, 0); // 10:00 PM

    const timeArray = [];
    let currentTime = new Date(startTime);

    while (currentTime <= endTime) {
      timeArray.push(
        currentTime.toLocaleTimeString([], {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
        })
      );
      currentTime.setMinutes(currentTime.getMinutes() + 30);
    }

    setDurations(timeArray);
  };

  const toggleMenu = (id) => {
    setOpenMenus((prevOpenMenus) => ({
      ...prevOpenMenus,
      [id]: !prevOpenMenus[id],
    }));
  };

  const nextProfile = () => {
    const box = document.querySelector("#header");
    box.scrollLeft = box.scrollLeft + 170;
  };

  const prevProfile = () => {
    const box = document.querySelector("#header");
    box.scrollLeft = box.scrollLeft - 170;
  };

  const convertTime = (timeString) => {
    const timeParts = timeString.split(" ");
    let totalMinutes = 0;

    for (let i = 0; i < timeParts.length; i += 2) {
      if (timeParts[i + 1] === "hr") {
        totalMinutes += parseInt(timeParts[i], 10) * 60;
      } else if (timeParts[i + 1] === "mins") {
        totalMinutes += parseInt(timeParts[i], 10);
      }
    }

    const totalHeight = (totalMinutes / 30) * 134; // 134px per 30-minute slot
    return { totalMinutes, totalHeight };
  };

  const changeStatus = (status) => {
    switch (status) {
      case "upcoming":
        return { textcolor: "#FFFFFF", background: "#DE2929" };
      case "completed":
        return { textcolor: "#FFFFFF", background: "#3AAB7C" };
      case "cancel":
        return { textcolor: "#FFFFFF", background: "#DE2929" };
      case "not-show":
        return { textcolor: "#FFFFFF", background: "#3AAB7C" };
      default:
        return { textcolor: "#FFFFFF", background: "#3AAB7C" };
    }
  };

  const handleOtpChange = (e) => {
    setOtp(parseInt(e.target.value));
  };

  const handleEnter = async (e, appointmentId) => {
    if (e.key === "Enter") {
      const { res, err } = await otpVerification({ appointmentId, otp });
      if (res) {
        toast.success("OTP verified", toastSetting);
        setOtp("");
      } else {
        toast.error(err.response.data.message, toastSetting);
        setOtp("");
      }
    }
  };

  const cancelation = async (id) => {
    const { res, err } = await cancelAppointment(id);
    if (res) {
      toast.success("Appointment Cancelled", toastSetting);
      getdata();
    } else {
      toast.error("Something went wrong!", toastSetting);
    }
  };

  const completeApp = async (id) => {
    const { res, err } = await completeAppointment(id);
    if (res) {
      toast.success("Appointment Completed", toastSetting);
      getdata();
    } else {
      toast.error("Something went wrong!", toastSetting);
    }
  };

  const noShowAppointment = async (id) => {
    const { res, err } = await noShow(id);
    if (res) {
      toast.success("Status changed successfully", toastSetting);
      getdata();
    } else {
      toast.error("Something went wrong!", toastSetting);
    }
  };

  const startAppointment = async (id) => {
    const { res, err } = await startedAppointment(id);
    if (res) {
      toast.success("Status changed successfully", toastSetting);
      getdata();
    } else {
      toast.error("Something went wrong!", toastSetting);
    }
  };

  const parseTimeStringToDate = (timeString) => {
    const timeParts = timeString.split(/:| /);
    let hours = parseInt(timeParts[0], 10);
    let minutes = parseInt(timeParts[1], 10);

    const date = new Date();
    date.setHours(hours, minutes, 0, 0);

    return date;
  };

  const generateNextServiceStartTime = (initialStartTime, previousDuration) => {
    const startTime = parseTimeStringToDate(initialStartTime);

    if (isNaN(startTime.getTime())) {
      return "Invalid start time";
    }

    startTime.setMinutes(startTime.getMinutes() + previousDuration);
    return startTime.toLocaleTimeString([], {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const calculateSlotIndex = (timeString) => {
    const start = new Date();
    start.setHours(7, 0, 0, 0);
    const time = parseTimeStringToDate(timeString);
    const diff = (time - start) / (1000 * 60);
    return Math.floor(diff / 30);
  };

  const createSlotsForProfile = (profile) => {
    const slots = Array(durations.length)
      .fill(null)
      .map(() => []);
    profile.appointments.forEach((appointment) => {
      let initialTime = appointment.time;
      let previousDuration = 0;

      appointment.services.forEach((service) => {
        const { totalMinutes } = convertTime(service.time_takenby_service);
        const exactTime = generateNextServiceStartTime(initialTime, previousDuration);
        const slotIndex = calculateSlotIndex(exactTime);

        if (slotIndex >= 0 && slotIndex < slots.length) {
          slots[slotIndex].push({
            ...service,
            appid: appointment._id,
            clientName: appointment.ClientName,
            status: appointment.status,
            exactTime,
          });
        }

        previousDuration += totalMinutes;
      });
    });

    return slots.map((slot) =>
      slot.length === 0 ? [{ isEmpty: true }] : slot
    );
  };

  return (
    <>
      <div  className={style.durationsBox}>
        {durations &&
          durations.map((duration, index) => <p key={index}>{duration}</p>)}
      </div>
      <div className={style.grids}>
        {durations &&
          durations.map((item, index) => (
            <React.Fragment key={index}>
              <div className={style.outerGrid}>
                <div></div>
              </div>
              <div className={style.outerGrid}>
                <div></div>
              </div>
            </React.Fragment>
          ))}
      </div>
      <div className={style.header}>
        <button className={style.prev} onClick={nextProfile}>
          &#10094;
        </button>
        <div className={style.carousel} id="header">
          {profiles &&
            profiles.map((profile, index) => {
              const slots = createSlotsForProfile(profile);
              return (
                <div className={style.profileContainer} key={index}>
                  <div className={style.profileBox}>
                    <img loading="lazy"
                      src={profile.stylistImage?.public_url}
                      alt={profile.stylistName}
                    />
                    <p>{profile.stylistName}</p>
                  </div>
                  <div className={style.slides}>
                    {slots &&
                      slots.map((slot, slotIndex) => (
                        <div key={slotIndex} className={style.slot}>
                          {slot.map((service, serviceIndex) => {
                            if (service.isEmpty) {
                              return (
                                <Link to="/partner/dashboard/addappoinment">
                                  <div
                                    key={serviceIndex}
                                    className={`${style.appointmentBox3} ${style.minheight} ${
                                      condition ? style.dBox : style.cBox
                                    }`}
                                    
                                  >
                                    <p className={style.addAppointment}>
                                      + Add Appointments
                                    </p>
                                  </div>
                                </Link>
                              );
                            } else {
                              const { textcolor, background } = changeStatus(
                                service.status
                              );
                              const { totalHeight } = convertTime(
                                service.time_takenby_service
                              );
                              return (
                                <div className={`${style.appointmentBox4} ${
                                  condition ? style.dBox : style.cBox
                                }`}>
                                  <div 
                                    key={serviceIndex}
                                    className={`${style.appointmentBox} ${
                                      condition ? style.dBox : style.cBox
                                    }`}
                                    style={{
                                      minHeight: `${totalHeight}px`,
                                      backgroundColor: `${service.color}`,
                                      
                                    }}
                                  >
                                    <div className={style.clientDetailsBox}>
                                      <div>
                                        <p className={style.timeDurations}>
                                          {service.time_takenby_service} (
                                          {service.exactTime})
                                        </p>
                                        <p className={style.serviceNames}>
                                          {service.service_name}
                                        </p>
                                        
                                        <p className={style.clientNames}>
                                          {service.clientName}
                                        </p>
                                      </div>
                                      <svg
                                        onClick={() =>
                                          toggleMenu(service.unique_id)
                                        }
                                        className="w-6 h-6 text-gray-800 dark:text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          stroke="currentColor"
                                          strokeLinecap="round"
                                          strokeWidth="2"
                                          d="M12 6h.01M12 12h.01M12 18h.01"
                                        />
                                      </svg>
                                    </div>
                                    <button
                                      className={style.statusButton}
                                      style={{
                                        color: `${textcolor}`,
                                        background: `${background}`,
                                      }}
                                    >
                                      {service.status}
                                    </button>
                                  </div>
                                  {openMenus[service.unique_id] && (
                                    <div
                                      className={`${style.dropdowncontent} ${
                                        condition
                                          ? style.dropBox
                                          : style.cropBox
                                      }`}
                                      key={service.unique_id}
                                    >
                                      <div className={style.inputContainer}>
                                        <input
                                          className={style.otpBox}
                                          type="number"
                                          placeholder="OTP"
                                          value={otp}
                                          onChange={handleOtpChange}
                                          onKeyDown={(e) =>
                                            handleEnter(e, service.unique_id)
                                          }
                                        />
                                      </div>
                                      {/*<div className={style.editButton}>
                                        Edit Details
                                      </div>*/}
                                      <div
                                        className={style.started}
                                        onClick={() =>
                                          startAppointment(service.appid)
                                        }
                                      >
                                        Started
                                      </div>
                                      <div
                                        className={style.started}
                                        onClick={() =>
                                          noShowAppointment(service.appid)
                                        }
                                      >
                                        No-Show
                                      </div>
                                      <div
                                        className={style.started}
                                        onClick={() =>
                                          completeApp(service.appid)
                                        }
                                      >
                                        Completed
                                      </div>
                                      <div
                                        className={style.started}
                                        onClick={() =>
                                          cancelation(service.appid)
                                        }
                                      >
                                        Cancel Appointment
                                      </div>
                                    </div>
                                  )}
                                </div>
                              );
                            }
                          })}
                        </div>
                      ))}
                  </div>
                </div>
              );
            })}
        </div>
        <button className={style.next} onClick={prevProfile}>
          &#10095;
        </button>
      </div>
    </>
  );
};

export default ScheduleTable;
