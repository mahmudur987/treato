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
import TimeScheduleModal from "../../../../components/_modals/AdminProfile/TimeScheduleModal/TimeScheduleModal";
import { useNavigate } from "react-router-dom";
import { useGetAllTeamMemSche } from "../../../../services/Team";
import LoadSpinner from "../../../../components/LoadSpinner/LoadSpinner";
import ErrorComponent from "../../../../components/ErrorComponent/ErrorComponent";
import {
  DateAndTime,
  formatCustomDate,
  formatDateRange,
  formatStateDate,
} from "./utils";
export const TimeScheContext = createContext();
const TimeSchedule = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(formatStateDate(new Date()));
  const [endDate, setEndDate] = useState(
    formatStateDate(new Date(Date.now() + 6 * 24 * 60 * 60 * 1000))
  ); // Adding 7 days
  const { data, isLoading, isError, error, refetch } = useGetAllTeamMemSche(
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
  const team = data?.data[0]?.time_for_service;
  // startdate to enddate function
  const SD = data?.data[0]?.time_for_service[0]?.date ?? "N/A";
  const Ed = data?.data[0]?.time_for_service[team.length - 1]?.date ?? "N/A";
  const { startDate: sD, endDate: eD } = formatDateRange(SD, Ed);

  // table top 7 dates with days
  const sevenDates = data?.data[0]?.time_for_service?.map((x) => {
    const date = formatCustomDate(x?.date);
    return date;
  });
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

  const employeeSchedule = () => {
    navigate("/partner/dashboard/EmployeeSchedule");
  };

  // console.log(data?.data?.length);
  // if (isLoading) {
  //   return <LoadSpinner />;
  // }
  return (
    <TimeScheContext.Provider
      value={{ schedule, member, refetch, sethandleShift }}
    >
      <div className={sty.container}>
        <div className={sty.TeamSchedule}>
          <div className={sty.TeamScheduleForResponsive}>
            <img src={arrowLeft} alt="arrowLeft" className={sty.arrowLeft} />
            <h1 className={sty.headingTeam}>Team Schedule</h1>
          </div>

          <div className={sty.teamCal}>
            <p className={sty.teamCalIcon}>
              <span onClick={decreaseDates}>
                <img
                  src={chevronLeft}
                  alt="chevronLeft"
                  className={sty.chevronLeft}
                />
              </span>

              {data?.data[0]?.time_for_service.length > 0 ? (
                <span className={sty.cal}>
                  {sD} - {eD} <img src={calendar_line} alt="calendar_line" />
                </span>
              ) : (
                <span className={sty.cal}>Add A Team Member</span>
              )}
              {/* {isLoading && <LoadSpinner />} */}
              <span onClick={increaseDates}>
                <img
                  src={chevronRight}
                  alt="chevronRight"
                  className={sty.chevronRight}
                />{" "}
              </span>
            </p>
          </div>

          <div className={sty.downloadButtonContainer}>
            <button className={sty.dBtn}>
              Download CSV
              <img
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
                <th
                  className={sty.headingDiv}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <span style={{ margin: "10px" }}>Name</span>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginTop: "5px",
                      gap: "2px",
                    }}
                  >
                    <img src={topImg} alt="" />
                    <img src={bottomImg} alt="" />
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
                          src={item.profile}
                          alt="profile"
                          className={sty.profile}
                        />
                        <span className={sty.name}>{item.name}</span>
                      </div>
                    </td>

                    {item?.schedule && item?.schedule.length > 0 ? (
                      item?.schedule.map((y, i) => {
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
                              <div
                                className={sty.times}
                                style={{ border: "1px solid pink" }}
                              >
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
                                  <TimeScheduleModal
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
