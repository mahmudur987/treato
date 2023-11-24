import styles from '../../../pages/BookFlow/BookFlow.module.css'
import calendar_cancel from "../../../assets/images/SalonDetail/calendar-cancel.svg"
import TimeComponent from './TimeComponent'
import { useState } from 'react'
import CalendarModal from '../../_modals/CalendarModal/CalendarModal'

export default function ServiceTime() {

    let [activeTime, updateActiveTime] = useState(0)

    return (
        <div className={styles.service_time}>
            <div className={styles.service_timeA}>Choose time of service</div>
            <div className={styles.service_timeB}>Showing available slots as per the salon and service professional’s schedule. Your service will take approx. 1 hour 15 mins.</div>
            <CalendarModal />
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