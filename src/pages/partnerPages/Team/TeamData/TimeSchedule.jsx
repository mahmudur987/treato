
import React, { useRef, useState } from 'react'
import editImg from "../../../../assets/images/AccountSettings/edit.svg"
import Mask1 from "../../../../assets/images/TeamDetails/Mask group.png"
import sty from "./TimeSchedule.module.css"
import topImg from "../../../../assets/images/TeamDetails/Vector (1).png"
import arrowLeft from "../../../../assets/images/TeamDetails/arrow-left.png"
import Scroller from "../../../../assets/images/TeamDetails/Scroller.png"
import chevronRight from "../../../../assets/images/TeamDetails/chevron-right (3).png"
import chevronLeft from "../../../../assets/images/TeamDetails/chevron-right (4).png"
import downLondIcon from "../../../../assets/images/TeamDetails/download-minimalistic-svgrepo-com 1.png"
import calendar_line from "../../../../assets/images/TeamDetails/calendar_line (1) 1.png"
import bottomImg from "../../../../assets/images/TeamDetails/Vector.png"
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './../../../../components/AccountSettings/UserDetails/ReactCalendar.css'
import EditAdminModal from '../../../../components/_modals/AdminProfile/EditAdminData/EditAdminModal'
import AddLeaveModal from '../../../../components/_modals/AdminProfile/AddLeaveModal/AddLeaveModal'
import TimeScheduleModal from '../../../../components/_modals/AdminProfile/TimeScheduleModal/TimeScheduleModal'
import { useNavigate } from 'react-router-dom'

const TimeSchedule = () => {
    const navigate = useNavigate()
    const TeamDetailsData = [
        {
            profile: Mask1,
            name: "Nayanika",
            time: "10am-7pm",

        },
        {
            profile: Mask1,
            name: "Nayanika",
            time: "10am-7pm",

        },
        {
            profile: Mask1,
            name: "Nayanika",
            time: "10am-7pm",

        },
        {
            profile: Mask1,
            name: "Nayanika",
            time: "10am-7pm",

        },
        {
            profile: Mask1,
            name: "Nayanika",
            time: "10am-7pm",

        },
        {
            profile: Mask1,
            name: "Nayanika",
            time: "10am-7pm",

        },
        {
            profile: Mask1,
            name: "Nayanika",
            time: "10am-7pm",

        },


    ]
    const [handleShift, sethandleShift] = useState(false);

    const handleShiftFun1 = () => {
        sethandleShift(!handleShift)
    }

    const [isEdit, setIsEdit] = useState(false);
    const [isLeave, setIsLeave] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
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
        navigate("/service/EmployeeSchedule")
    }
    return (
        <div className={sty.container}>
            <div className={sty.TeamSchedule}>
                <div className={sty.TeamScheduleForResponsive}>

                    <img src={arrowLeft} alt="arrowLeft" className={sty.arrowLeft} />
                    <h1 className={sty.headingTeam}>Team Schedule</h1>
                </div>
                <div className={sty.teamCal}>
                    <p className={sty.teamCalIcon}>
                        <span ><img src={chevronLeft} alt="chevronLeft" className={sty.chevronLeft} />
                        </span>
                        <span className={sty.cal}>Nov 26 - Dec 2 <img src={calendar_line} alt="calendar_line" /></span>
                        <span><img src={chevronRight} alt="chevronRight" className={sty.chevronRight} /> </span>
                    </p>
                    <div onClick={scrollToLeft}>

                        <img src={Scroller} alt="Scroller" className={sty.ScrollerImg} />
                    </div>
                </div>

                <div className={sty.downloadButtonContainer}>
                    <button className={sty.dBtn}>
                        <img src={downLondIcon} alt="downLondIcon" className={sty.dBtnImg} />
                        Download CSV
                    </button>
                </div>
            </div>
            <div className={sty.tableContainer} ref={tableContainerRef}>
                <table className={sty.styledTable}>
                    <thead>

                        <tr>
                            <th className={sty.headingDiv} style={{ display: 'flex', alignItems: 'center' }}>
                                <span style={{ margin: "10px" }}>Name</span>
                                <div style={{ display: 'flex', flexDirection: 'column', marginTop: "5px", gap: "2px" }}>
                                    <img src={topImg} alt="" />
                                    <img src={bottomImg} alt="" />
                                </div>
                            </th>


                            <th>Sun - Nov 26</th>
                            <th>Mon - Nov 27</th>
                            <th>Tue - Nov 28</th>
                            <th>Wen - Nov 29</th>
                            <th>Thu - Nov 30</th>
                            <th>Fri - Dec 1</th>
                            <th>Sat - Dec 2</th>

                        </tr>
                    </thead>



                    <tbody>

                        {TeamDetailsData.map((item, i) => <>
                            <tr onClick={handleShiftFun1} key={i}>

                                <td><div className={sty.nameProfile}>

                                    <img src={item.profile} alt="profile" className={sty.profile} />
                                    <span className={sty.name}>{item.name}</span>
                                </div>
                                </td>
                                <td><button className={sty.Closed}>Closed</button> </td>

                                <td className={sty.times1}><div className={sty.times} >{item.time}</div></td>
                                <td className={sty.times1}><div className={sty.times} >{item.time}</div></td>
                                <td className={sty.times1}><div className={sty.times} >{item.time}</div></td>
                                <td className={sty.times1}><div className={sty.times} >{item.time}</div></td>
                                <td className={sty.times1}><div className={sty.times} >{item.time}</div></td>
                                <td className={sty.times1}><div className={sty.times} >{item.time}</div></td>


                            </tr >
                        </>)}


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
            />
        </div >
    )
}

export default TimeSchedule