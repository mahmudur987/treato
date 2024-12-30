import React, { createContext, useRef, useState } from "react";
import sty from "./TimeSchedule.module.css";
import topImg from "../../../../assets/images/TeamDetails/Vector (1).png";
import arrowLeft from "../../../../assets/images/TeamDetails/arrow-left.png";
import chevronRight from "../../../../assets/images/TeamDetails/chevron-right (3).png";
import chevronLeft from "../../../../assets/images/TeamDetails/chevron-right (4).png";
import downLondIcon from "../../../../assets/images/TeamDetails/download-minimalistic-svgrepo-com 1.png";
import calendar_line from "../../../../assets/images/TeamDetails/calendar_line (1) 1.png";
import bottomImg from "../../../../assets/images/TeamDetails/Vector.png";
import "react-calendar/dist/Calendar.css";
import "./../../../../components/AccountSettings/UserDetails/ReactCalendar.css";
import TimeScheduleModal, {
  MemoizedTimeScheduleModal,
} from "../../../../components/_modals/AdminProfile/TimeScheduleModal/TimeScheduleModal";
import { useNavigate } from "react-router-dom";
import { useGetAllTeamMemSche } from "../../../../services/Team";
import ErrorComponent from "../../../../components/ErrorComponent/ErrorComponent";
import { DateAndTime, formatStateDate } from "./utils";
import axiosInstance from "../../../../services/axios";
import { toast } from "react-toastify";
export const TimeScheContext = createContext();

function getDateRange(startDate, endDate) {
  const dateArray = [];
  let currentDate = new Date(startDate);
  let lastDate = new Date(endDate);
  while (currentDate <= lastDate) {
    const day = currentDate.toLocaleString("en-US", { weekday: "short" });
    const month = currentDate.toLocaleString("en-US", { month: "short" });
    const date = currentDate.getDate().toString();

    dateArray.push({
      day: `${day},`,
      month: month,
      date: date,
    });

    // Move to the next day
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dateArray;
}

// Usage

const TimeSchedule = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(formatStateDate(new Date()));
  const [endDate, setEndDate] = useState(
    formatStateDate(new Date(Date.now() + 6 * 24 * 60 * 60 * 1000))
  ); // Adding 7 days
  const { data, isError, error, refetch } = useGetAllTeamMemSche(
    startDate,
    endDate
  );

  const [handleShift, sethandleShift] = useState(false);
  const [schedule, setschedule] = useState(null);
  const [member, setMember] = useState(null);
  const handleShiftFun = (item, mem) => {
    sethandleShift(!handleShift);
    setschedule(item);
    setMember(mem);
  };
  const [isEdit, setIsEdit] = useState(false);
  const [isLeave, setIsLeave] = useState(false);
  const tableContainerRef = useRef(null);

  const sevenDates = getDateRange(startDate, endDate);

  const sD = sevenDates[0].month + " " + sevenDates[0].date;
  const eD =
    sevenDates[sevenDates.length - 1].month +
    " " +
    sevenDates[sevenDates.length - 1].date;

  // team data as schedule
  const TeamDetailsData = data?.data?.map((x) => {
    const data = {
      id: x?._id,
      profile: x?.stylist_Img.public_url || "",
      name: x?.stylist_name,
      schedule: x?.time_for_service,
    };

    return data;
  });

  const increaseDates = () => {
    const newStartDate = new Date(startDate);
    newStartDate.setDate(newStartDate.getDate() + 1);
    setStartDate(formatStateDate(newStartDate));
    const newEndDate = new Date(endDate);
    newEndDate.setDate(newEndDate.getDate() + 1);
    setEndDate(formatStateDate(newEndDate));
  };

  const decreaseDates = () => {
    const newStartDate = new Date(startDate);
    newStartDate.setDate(newStartDate.getDate() - 1);
    setStartDate(formatStateDate(newStartDate));

    const newEndDate = new Date(endDate);
    newEndDate.setDate(newEndDate.getDate() - 1);
    setEndDate(formatStateDate(newEndDate));
  };
  const closeEditModal = () => {
    setIsEdit(false);
  };
  const openEditModal = () => {
    setIsEdit(true);
  };
  const closeLeaveModal = () => {
    setIsLeave(false);
  };
  const openLeaveModal = () => {
    setIsLeave(true);
  };

  console.log(startDate);

  const handleDownloadCSV = async () => {
    try {
      setLoading(true);
      const headers = {
        token: localStorage.getItem("jwtToken"),
      };

      const { data } = await axiosInstance.post(
        `stylist/generatecsv`,
        { start_date: startDate, end_date: endDate },
        { headers }
      );

      if (data?.fileUrl) {
        // Create a link element to trigger the download
        const link = document.createElement("a");
        link.href = data.fileUrl;
        link.download = "schedules.csv"; // Set the filename for the downloaded file
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); // Cleanup

        // Show success toast
        toast.success("CSV downloaded successfully!");
      } else {
        throw new Error("File URL not found in response.");
      }
    } catch (error) {
      // Show error toast
      toast.error("An error occurred while downloading the CSV.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const employeeSchedule = (id) => {
    navigate(`/partner/dashboard/EmployeeSchedule/${id}`);
  };

  return (
    <TimeScheContext.Provider
      value={{ schedule, member, refetch, sethandleShift }}
    >
      <div className={sty.container}>
        <div className={sty.TeamSchedule}>
          <div className={sty.TeamScheduleForResponsive}>
            <img
              loading="lazy"
              src={arrowLeft}
              alt="arrowLeft"
              className={sty.arrowLeft}
            />
            <h1 className={sty.headingTeam}>Team Schedule</h1>
          </div>

          <div className={sty.teamCal}>
            <p className={sty.teamCalIcon}>
              <span onClick={decreaseDates}>
                <img
                  loading="lazy"
                  src={chevronLeft}
                  alt="chevronLeft"
                  className={sty.chevronLeft}
                />
              </span>

              {data ? (
                <span className={sty.cal}>
                  {sD} - {eD}{" "}
                  <img loading="lazy" src={calendar_line} alt="calendar_line" />
                </span>
              ) : (
                <span className={sty.cal}>Loading</span>
              )}
              {/* {isLoading && <LoadSpinner />} */}
              <span onClick={increaseDates}>
                <img
                  loading="lazy"
                  src={chevronRight}
                  alt="chevronRight"
                  className={sty.chevronRight}
                />{" "}
              </span>
            </p>
          </div>

          <div className={sty.downloadButtonContainer}>
            <button className={sty.dBtn} onClick={handleDownloadCSV}>
              {loading ? "Loading.." : " Download CSV"}
              <img
                loading="lazy"
                src={downLondIcon}
                alt="downLondIcon"
                className={sty.dBtnImg}
              />
            </button>
          </div>
        </div>
        <div className={sty.tableContainer} ref={tableContainerRef}>
          <table className={sty.styledTable}>
            <thead>
              <tr>
                <th className={sty.headingDiv}>
                  <span className={sty.headingName}>Name</span>
                  <div className={sty.imageBox}>
                    <img loading="lazy" src={topImg} alt="" />
                    <img loading="lazy" src={bottomImg} alt="" />
                  </div>
                </th>
                {sevenDates &&
                  sevenDates.map((x, i) => (
                    <th key={i}>
                      {x?.day.slice(0, 3)} - {x?.month} {x?.date}
                    </th>
                  ))}
              </tr>
            </thead>
            <br />

            <tbody>
              {TeamDetailsData?.map((item, index) => {
                return (
                  <tr className={sty.tr} key={index}>
                    {/* img */}
                    <td>
                      <div className={sty.nameProfile}>
                        <img
                          loading="lazy"
                          src={item.profile}
                          alt="profile"
                          className={sty.profile}
                        />
                        <span className={sty.name}>{item.name}</span>
                      </div>
                    </td>

                    {item?.schedule && item?.schedule.length > 0 ? (
                      item?.schedule.map((y, i) => {
                        // console.log(y);

                        if (y.isClosed) {
                          return (
                            <td>
                              <button className={sty.Closed}>Closed</button>{" "}
                            </td>
                          );
                        }

                        if (y.isOnLeave) {
                          return (
                            <td key={i} className={sty.times1}>
                              <div className={`${sty.times} ${sty.timeBorder}`}>
                                leave
                              </div>
                            </td>
                          );
                        }
                        if (y.time_slots.length > 0) {
                          const { startTime, endTime } = DateAndTime(
                            y?.date,
                            y?.time_slots
                          );

                          return (
                            <td key={i} className={sty.times1}>
                              <div
                                className={`${sty.times} ${
                                  item?.name === member?.name &&
                                  schedule?._id === y._id &&
                                  sty.selectedTime
                                }`}
                                onClick={() => handleShiftFun(y, item)}
                              >
                                {startTime}-{endTime}
                              </div>
                              {schedule?._id === y._id &&
                                handleShift &&
                                item.name === member.name && (
                                  <div className={sty.modalWrapper}>
                                    <TimeScheduleModal
                                      openLeaveModal={openLeaveModal}
                                      closeLeaveModal={closeLeaveModal}
                                      openEditModal={openEditModal}
                                      closeEditModal={closeEditModal}
                                      isLeave={isLeave}
                                      isEdit={isEdit}
                                      handleShift={handleShift}
                                      employeeSchedule={() =>
                                        employeeSchedule(item?.id)
                                      }
                                      handleShiftFun={handleShiftFun}
                                      schedule={schedule}
                                      member={member}
                                      refetch={refetch}
                                    />
                                  </div>
                                )}
                            </td>
                          );
                        }

                        return (
                          <td key={i} className={sty.times1}>
                            <div
                              className={`${sty.times} ${
                                item?.name === member?.name &&
                                schedule?._id === y._id &&
                                sty.selectedTime
                              }`}
                              onClick={() => handleShiftFun(y, item)}
                            >
                              N/A
                            </div>
                            {schedule?._id === y._id &&
                              handleShift &&
                              item.name === member.name && (
                                <div className={sty.modalWrapper}>
                                  <MemoizedTimeScheduleModal
                                    openLeaveModal={openLeaveModal}
                                    closeLeaveModal={closeLeaveModal}
                                    openEditModal={openEditModal}
                                    closeEditModal={closeEditModal}
                                    isLeave={isLeave}
                                    isEdit={isEdit}
                                    handleShift={handleShift}
                                    employeeSchedule={employeeSchedule}
                                    handleShiftFun={handleShiftFun}
                                    schedule={schedule}
                                    member={member}
                                    refetch={refetch}
                                  />
                                </div>
                              )}
                          </td>
                        );
                      })
                    ) : (
                      <td>
                        <ErrorComponent message={"No data found"} />
                      </td>
                    )}
                  </tr>
                );
              })}

              {isError && (
                <ErrorComponent message={error ? error.message : "Error"} />
              )}
            </tbody>
          </table>
        </div>
        <div className={sty.downloadButtonContainer2}>
          <button className={sty.dBtn}>
            Download CSV
            <img
              loading="lazy"
              src={downLondIcon}
              alt="downLondIcon"
              className={sty.dBtnImg}
            />
          </button>
        </div>
      </div>
    </TimeScheContext.Provider>
  );
};

export default TimeSchedule;
