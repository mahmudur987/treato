import styles from '../../../pages/BookFlow/BookFlow.module.css'
import calendar_cancel from "../../../assets/images/SalonDetail/calendar-cancel.svg"
import TimeComponent from './TimeComponent'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './TimeSlickSlider.css'
import DateComponent from '../DateComponent/DateComponent';
import { useState } from 'react'
import rightIco from "../../../assets/images/SalonDetail/chevron-right.svg"
import leftIco from "../../../assets/images/SalonDetail/chevron-left.svg"
import { useEffect } from 'react';

export default function ServiceTime() {
    let [actveCard, updateActiveCard] = useState(0)
    let [activeTime, updateActiveTime] = useState(0)
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 3,
        autoplay: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                }
            }
        ]
    };
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const date = new Date();
    const year = date.getFullYear();
    let threeMonths = months.filter((v, i) => date.getMonth() <= i ? v : null)
    let [showMonth, setShowMonth] = useState(0)
    let [showYear, setShowYear] = useState(year)
    let [allCalendar, setallCalendar] = useState(null)

    function updateMonthYear(back) {
        if (back) {
            if (threeMonths[showMonth] === 'January' && showMonth === 2) {
                setShowYear(prev => prev - 1);
            }
            setShowMonth(showMonth === 0 ? 0 : showMonth - 1)
        } else {
            if (threeMonths[showMonth] === 'December' && showMonth === 1) {
                setShowYear(prev => prev + 1);
            }
            setShowMonth(showMonth === 2 ? 2 : showMonth + 1)
        }
    }

    useEffect(() => {
        let todayMonth = null
        let todayDate = null
        let day = null
        months.map((v, i) => {
            if (v === threeMonths[showMonth]) {
                todayMonth = i
            }
        })
        if (!showMonth) {
            todayDate = new Date().getDate();
            day = new Date().getDay();
        } else {
            todayDate = new Date(showYear, todayMonth, 1).getDate();
            day = new Date(showYear, todayMonth, 1).getDay();
        }
        let lastDate = new Date(showYear, todayMonth + 1, 0).getDate();
        let allDates = []
        let allDays = [];
        for (todayDate; todayDate <= lastDate; todayDate++) {
            allDates.push(todayDate)
            allDays.push(days[day])
            if (day === 6) {
                day = 0
            } else {
                day++;
            }
        }
        let finalCalendar = [{
            allDates,
            allDays
        }]
        setallCalendar(finalCalendar)
    }, [showMonth])

    return (
        <div className={styles.service_time}>
            <div className={styles.service_timeA}>Choose time of service</div>
            <div className={styles.service_timeB}>Showing available slots as per the salon and service professional’s schedule. Your service will take approx. 1 hour 15 mins.</div>
            <div className={styles.service_timeC}>Date</div>
            <div className={styles.service_timeMonth}>
                <img src={leftIco} alt="" onClick={() => updateMonthYear(1)} />
                <div>{threeMonths[showMonth]}</div>
                <div>{showYear}</div>
                <img src={rightIco} alt="" onClick={() => updateMonthYear(0)} />
            </div>
            <div className={`${styles.service_timeD} time_slick`}>
                {
                    allCalendar ?
                        <Slider {...settings}>
                            {
                                allCalendar[0].allDates.map((v, i) => {
                                    return (
                                        <DateComponent index={i} updateActiveCard={updateActiveCard} actveCard={actveCard} allCalendar={allCalendar} key={i} />
                                    )
                                })
                            }
                        </Slider>
                        :
                        null
                }

            </div>
            <div className={styles.service_timeC}>Start time</div>
            <div className={styles.service_timeF}>
                <TimeComponent index={1} activeTime={activeTime} updateActiveTime={updateActiveTime} />
                <TimeComponent index={2} activeTime={activeTime} updateActiveTime={updateActiveTime} />
                <TimeComponent index={3} activeTime={activeTime} updateActiveTime={updateActiveTime} />
                <TimeComponent index={4} activeTime={activeTime} updateActiveTime={updateActiveTime} />
                <TimeComponent index={5} activeTime={activeTime} updateActiveTime={updateActiveTime} />
                <TimeComponent index={6} activeTime={activeTime} updateActiveTime={updateActiveTime} />
                <TimeComponent index={7} activeTime={activeTime} updateActiveTime={updateActiveTime} />
                <TimeComponent index={8} activeTime={activeTime} updateActiveTime={updateActiveTime} />
            </div>
            <div className={styles.service_timeE}>
                <img src={calendar_cancel} alt="" />
                <div className={styles.service_timeEA}>
                    Free cancellation & rescheduling till 4 hours before the start time, post that cancellation charge(s) apply. <span>Cancellation Policy.</span>
                </div>
            </div>
        </div>
    )
}