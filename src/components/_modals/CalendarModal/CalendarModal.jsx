import React from 'react'
import styles from '../../../pages/BookFlow/BookFlow.module.css'
import DateComponent from '../../BookFlow/DateComponent/DateComponent';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './CalendarModal.css'
import { useState } from 'react'
import rightIco from "../../../assets/images/SalonDetail/chevron-right.svg"
import leftIco from "../../../assets/images/SalonDetail/chevron-left.svg"
import { useEffect } from 'react';

export default function CalendarModal({getWorkerData}) {
    let [actveCard, updateActiveCard] = useState(-1)
    const settings = {
        dots: false,
        infinite: false,
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
    let threeMonths = [];
    months.forEach((v,i)=>{
        if(i>=date.getMonth()){
            threeMonths.push(v)
        }
        if(threeMonths.length===2&&i===11){
            threeMonths.push(months[0]);
        }
    })
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
        <div>
            <div className={styles.service_timeC}>Date</div>
            <div className={styles.service_timeMonth}>
                <img src={showMonth!==0?rightIco:leftIco} alt="left icon" onClick={() => updateMonthYear(1)} className={showMonth!==0?"rotateImg":""}/>
                <div>{threeMonths[showMonth]}</div>
                <div>{showYear}</div>
                <img src={showMonth===2?leftIco:rightIco} alt="right icon" onClick={() => updateMonthYear(0)} className={showMonth===2?"rotateImg":""}/>
            </div>
            <div className={`time_slick`}>
                {
                    allCalendar ?
                        <Slider {...settings}>
                            {
                                allCalendar[0].allDates.map((v, i) => {
                                    return (
                                        <DateComponent index={i} updateActiveCard={updateActiveCard} actveCard={actveCard} allCalendar={allCalendar} key={i} getWorkerData={getWorkerData} month={threeMonths[0]}/>
                                    )
                                })
                            }
                        </Slider>
                        :
                        null
                }

            </div>
        </div>
    )
}
