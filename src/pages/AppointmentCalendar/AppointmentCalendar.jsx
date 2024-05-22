import React, { useState, useEffect } from 'react';
import style from './style.module.css';
import DatePicker from 'react-datepicker';
import { Link } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import ScheduleTable from './ScheduleTable/Schedule';
import { GetCalenderdata } from '../../services/calender';

function AppointmentCalendar() {
    const [date, setDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false);
    const [profiles, setEmployee] = useState(null);
    const [filteredData, setFilter] = useState(null);

    useEffect(() => {
        const getdata = async () => {
            const { res, err } = await GetCalenderdata()
            if (res) {
                setEmployee(res.data);
                setFilter(res.data)
                console.log(res)
            }
            else {
                console.log(err);
            }
        }
        getdata()
        console.log(profiles);
    }, []);

    const filteredFn = (e) => {
        if (e.target.value === "Everyone") {
            setEmployee(filteredData)
        }
        else {
            const filteredByName = filteredData.filter((ele) => ele.stylistName === e.target.value);
            setEmployee(filteredByName)
        }
    }


    const decreaseDate = () => {
        const newDate = new Date(date);
        newDate.setDate(date.getDate() - 1);
        setDate(newDate);
    };

    const increaseDate = () => {
        const newDate = new Date(date);
        newDate.setDate(date.getDate() + 1);
        setDate(newDate);
    };
    const handleDateChange = (newDate) => {
        setDate(newDate);
        setShowCalendar(false);
    };


    return (
        <>
            <div className={style.mainContainer} >
                <div className={style.header}  >
                    <div className={style.calenderBox}>
                        <p className="btn decrease-date" onClick={decreaseDate}><svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 19-7-7 7-7" />
                        </svg>
                        </p>
                        <div className="date">{date.toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' })}</div>
                        <p className="btn increase-date" onClick={increaseDate}><svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7" />
                        </svg>
                        </p>
                        <div className="calendar-icon" onClick={() => setShowCalendar(!showCalendar)}><svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z" />
                        </svg>
                        </div>
                        {showCalendar && (
                            <div className="calendar-popup">
                                <DatePicker selected={date} onChange={handleDateChange} />
                            </div>
                        )}
                    </div>
                    <div className={style.rightBox} >
                        <select className={`${style.filter} custom-select`} onChange={filteredFn} name="persons" id="dropdown">
                            <option value="Everyone" selected>Everyone</option>
                            {filteredData &&
                                filteredData.map((item, index) => (
                                    <option key={index} value={item.stylistName}>{item.stylistName}</option>
                                ))}
                        </select>
                        <Link to="/partner/dashboard/addappoinment"><button><span>+</span>Add Appointment</button></Link>
                    </div>
                </div>
                <div className={style.lineBar}></div>
                <div className={style.scheduleBox} >
                    <ScheduleTable profiles={profiles} />
                </div>

            </div>
        </>
    )
}

export default AppointmentCalendar
