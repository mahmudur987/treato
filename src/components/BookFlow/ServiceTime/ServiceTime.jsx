import styles from '../../../pages/BookFlow/BookFlow.module.css'
import calendar_cancel from "../../../assets/images/SalonDetail/calendar-cancel.svg"
import TimeComponent from './TimeComponent'
import { useEffect, useRef, useState } from 'react'
import CalendarModal from '../../_modals/CalendarModal/CalendarModal'

export default function ServiceTime({getWorkerData,availableSlots}) {
    const timeFRef = useRef(null);
    let [activeTime, updateActiveTime] = useState(-1);
    let arr = ['10:30 AM','10:45 AM','11:00 AM','11:15 AM','11:30 AM','12:00 AM'];

    useEffect(() => {
   // Scroll to the top when availableSlots change
   if (timeFRef.current) {
    timeFRef.current.scrollTop = 0;
  }
    }, [availableSlots])
    
    return (
        <div className={styles.service_time}>
            <div className={styles.service_timeA}>Choose time of service</div>
            <div className={styles.service_timeB}>Showing available slots as per the salon and service professional’s schedule. Your service will take approx. 1 hour 15 mins.</div>
            <CalendarModal getWorkerData={getWorkerData}/>
            <div className={styles.service_timeC}>Start time</div>
            <div className={styles.service_timeF} ref={timeFRef}>
                {availableSlots?.length?
                       availableSlots.map((v,i)=>{
                        return(
                            <TimeComponent index={i} activeTime={activeTime} updateActiveTime={updateActiveTime} getWorkerData={getWorkerData} key={i} timeData={v}/>
                        )
                    })
                :
                    arr.map((v,i)=>{
                        return(
                            <TimeComponent index={i} activeTime={activeTime} updateActiveTime={updateActiveTime} getWorkerData={getWorkerData} key={i} timeData={v}/>
                        )
                    })
                }
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