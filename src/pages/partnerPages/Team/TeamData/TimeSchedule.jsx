import React, { useRef, useState } from "react";
import editImg from "../../../../assets/images/AccountSettings/edit.svg";
import Mask1 from "../../../../assets/images/TeamDetails/Mask group.png";
import sty from "./TimeSchedule.module.css";
import topImg from "../../../../assets/images/TeamDetails/Vector (1).png";
import arrowLeft from "../../../../assets/images/TeamDetails/arrow-left.png";
import Scroller from "../../../../assets/images/TeamDetails/Scroller.png";
import chevronRight from "../../../../assets/images/TeamDetails/chevron-right (3).png";
import chevronLeft from "../../../../assets/images/TeamDetails/chevron-right (4).png";
import downLondIcon from "../../../../assets/images/TeamDetails/download-minimalistic-svgrepo-com 1.png";
import calendar_line from "../../../../assets/images/TeamDetails/calendar_line (1) 1.png";
import bottomImg from "../../../../assets/images/TeamDetails/Vector.png";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./../../../../components/AccountSettings/UserDetails/ReactCalendar.css";
import EditAdminModal from "../../../../components/_modals/AdminProfile/EditAdminData/EditAdminModal";
import AddLeaveModal from "../../../../components/_modals/AdminProfile/AddLeaveModal/AddLeaveModal";
import TimeScheduleModal from "../../../../components/_modals/AdminProfile/TimeScheduleModal/TimeScheduleModal";
import { useNavigate } from "react-router-dom";
import { useGetAllTeamMemSche } from "../../../../services/Team";
import LoadSpinner from "../../../../components/LoadSpinner/LoadSpinner";
import ErrorComponent from "../../../../components/ErrorComponent/ErrorComponent";
import { DateAndTime, formatCustomDate, formatDateRange } from "./utils";

const TimeSchedule = () => {
  const navigate = useNavigate();
  const [startPoint, setstartPoint] = useState(0);
  const [endPoint, setEndPoint] = useState(7);
  const { data, isLoading, isError, error } = useGetAllTeamMemSche();
  const [handleShift, sethandleShift] = useState(false);
  const [selectedCellIndex, setSelectedCellIndex] = useState(null);
  const handleShiftFun = (index) => {
    sethandleShift(!handleShift);
    setSelectedCellIndex(index === selectedCellIndex ? null : index);
  };
  const [isEdit, setIsEdit] = useState(false);
  const [isLeave, setIsLeave] = useState(false);
  const tableContainerRef = useRef(null);
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
  const scrollToLeft = () => {
    if (tableContainerRef.current) {
      tableContainerRef.current.scrollLeft -= 100;
    }
  };
  const employeeSchedule = () => {
    navigate("/partner/dashboard/EmployeeSchedule");
  };

  const sevenDates = data?.data[0]?.time_for_service
    .slice(startPoint, endPoint)
    .map((x) => {
      const date = formatCustomDate(x?.date);
      return date;
    });
  const SD = data?.data[0]?.time_for_service[startPoint]?.date;
  const Ed = data?.data[0]?.time_for_service[endPoint - 1]?.date;
  const { startDate, endDate } = formatDateRange(SD, Ed);
  const TeamDetailsData = data?.data?.map((x) => {
    const data = {
      profile: x.stylist_Img.public_url || "",
      name: x.stylist_name,
      schedule: x.time_for_service.slice(0, 7),
    };

    return data;
  });
  const handleIncrease = () => {
    if (endPoint === data?.data[0]?.time_for_service.length) {
      return;
    } else {
      setstartPoint((pre) => pre + 1);
      setEndPoint((pre) => pre + 1);
    }
  };
  const handledecrease = () => {
    if (startPoint === 0) {
      return;
    } else {
      setstartPoint((pre) => pre - 1);
      setEndPoint((pre) => pre - 1);
    }
  };

  if (isLoading) {
    return <LoadSpinner />;
  }
  if (isError) {
    return <ErrorComponent message={error.message} />;
  }
  return (
    <div className={sty.container}>
      <div className={sty.TeamSchedule}>
        <div className={sty.TeamScheduleForResponsive}>
          <img src={arrowLeft} alt="arrowLeft" className={sty.arrowLeft} />
          <h1 className={sty.headingTeam}>Team Schedule</h1>
        </div>
        {data?.data[0]?.time_for_service.length > 0 && (
          <div className={sty.teamCal}>
            <p className={sty.teamCalIcon}>
              <span onClick={handledecrease}>
                <img
                  src={chevronLeft}
                  alt="chevronLeft"
                  className={sty.chevronLeft}
                />
              </span>
              <span className={sty.cal}>
                {startDate} - {endDate}{" "}
                <img src={calendar_line} alt="calendar_line" />
              </span>
              <span onClick={handleIncrease}>
                <img
                  src={chevronRight}
                  alt="chevronRight"
                  className={sty.chevronRight}
                />{" "}
              </span>
            </p>
            <div onClick={scrollToLeft}>
              <img src={Scroller} alt="Scroller" className={sty.ScrollerImg} />
            </div>
          </div>
        )}

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

          <tbody>
            {TeamDetailsData?.map((item, index) => {
              return (
                <>
                  <tr key={index}>
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

                    {/* closebutton */}
                    {/* <td>
                      <button className={sty.Closed}>Closed</button>{" "}
                    </td> */}

                    {item?.schedule && item?.schedule.length > 0 ? (
                      item?.schedule.map((y, i) => {
                        const { startTime, endTime } = DateAndTime(
                          y?.date,
                          y?.time_slots
                        );

                        return (
                          <td key={i} className={sty.times1}>
                            <div
                              className={sty.times}
                              onClick={(e) => handleShiftFun()}
                              style={{ border: "1px solid #EBEDF0" }}
                            >
                              {startTime}-{endTime}
                            </div>
                          </td>
                        );
                      })
                    ) : (
                      <td>
                        <ErrorComponent message={"No data found"} />
                      </td>
                    )}
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>

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
      />
    </div>
  );
};

export default TimeSchedule;
