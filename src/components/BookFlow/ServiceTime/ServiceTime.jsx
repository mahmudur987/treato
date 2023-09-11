import styles from '../../../pages/BookFlow/BookFlow.module.css'
import calendar_cancel from "../../../assets/images/SalonDetail/calendar-cancel.svg"
import TimeComponent from './TimeComponent'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './TimeSlickSlider.css'
import DateComponent from '../DateComponent/DateComponent';
import { useState } from 'react'

export default function ServiceTime() {
    let [actveCard,updateActiveCard] = useState(0)
    let [activeTime,updateActiveTime] = useState(0)
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 1,
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
    return (
        <div className={styles.service_time}>
            <div className={styles.service_timeA}>Choose time of service</div>
            <div className={styles.service_timeB}>Showing available slots as per the salon and service professional’s schedule. Your service will take approx. 1 hour 15 mins.</div>
            <div className={styles.service_timeC}>Date</div>
            <div className={`${styles.service_timeD} time_slick`}>
                <Slider {...settings}>
                    <DateComponent index={1} updateActiveCard={updateActiveCard} actveCard={actveCard}/>
                    <DateComponent index={2} updateActiveCard={updateActiveCard} actveCard={actveCard}/>
                    <DateComponent index={3} updateActiveCard={updateActiveCard} actveCard={actveCard}/>
                    <DateComponent index={4} updateActiveCard={updateActiveCard} actveCard={actveCard}/>
                    <DateComponent index={5} updateActiveCard={updateActiveCard} actveCard={actveCard}/>
                    <DateComponent index={6} updateActiveCard={updateActiveCard} actveCard={actveCard}/>
                    <DateComponent index={7} updateActiveCard={updateActiveCard} actveCard={actveCard}/>
                    <DateComponent index={8} updateActiveCard={updateActiveCard} actveCard={actveCard}/>
                </Slider>
            </div>
            <div className={styles.service_timeC}>Start time</div>
            <div className={styles.service_timeF}>
                <TimeComponent index={1} activeTime={activeTime} updateActiveTime={updateActiveTime}/>
                <TimeComponent index={2} activeTime={activeTime} updateActiveTime={updateActiveTime}/>
                <TimeComponent index={3} activeTime={activeTime} updateActiveTime={updateActiveTime}/>
                <TimeComponent index={4} activeTime={activeTime} updateActiveTime={updateActiveTime}/>
                <TimeComponent index={5} activeTime={activeTime} updateActiveTime={updateActiveTime}/>
                <TimeComponent index={6} activeTime={activeTime} updateActiveTime={updateActiveTime}/>
                <TimeComponent index={7} activeTime={activeTime} updateActiveTime={updateActiveTime}/>
                <TimeComponent index={8} activeTime={activeTime} updateActiveTime={updateActiveTime}/>
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