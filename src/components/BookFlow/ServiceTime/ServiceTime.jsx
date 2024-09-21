import styles from "../../../pages/BookFlow/BookFlow.module.css";
import calendar_cancel from "../../../assets/images/SalonDetail/calendar-cancel.svg";
import TimeComponent from "./TimeComponent";
import { useEffect, useRef, useState } from "react";
import CalendarModal from "../../_modals/CalendarModal/CalendarModal";
import ErrorComponent from "../../ErrorComponent/ErrorComponent";

export default function ServiceTime({
  getWorkerData,
  availableSlots,
  stepTwoDetails,
}) {
  const timeFRef = useRef(null);
  let [activeTime, updateActiveTime] = useState(-1);

  useEffect(() => {
    if (timeFRef.current) {
      timeFRef.current.scrollTop = 0;
    }
  }, [availableSlots]);

  return (
    <div className={styles.service_time}>
      <div className={styles.service_timeA}>Choose time of service</div>
      <div className={styles.service_timeB}>
        Showing available slots as per the salon and service professional’s
        schedule. Your service will take approx. 1 hour 15 mins.
      </div>
      <CalendarModal getWorkerData={getWorkerData} />
      <div className={styles.service_timeC}>Start time</div>
      <div className={styles.service_timeF} ref={timeFRef}>
        {availableSlots?.length > 0 ? (
          availableSlots.map((v, i) => {
            return (
              <TimeComponent
                index={i}
                activeTime={activeTime}
                updateActiveTime={updateActiveTime}
                getWorkerData={getWorkerData}
                key={i}
                timeData={v}
                stepTwoDetails={stepTwoDetails}
              />
            );
          })
        ) : (
          <ErrorComponent message={"No slots are available"} />
        )}
      </div>
      <div className={styles.service_timeE}>
        <img loading="lazy" src={calendar_cancel} alt="" />
        <div className={styles.service_timeEA}>
          Free cancellation & rescheduling till 4 hours before the start time,
          post that cancellation charge(s) apply.{" "}
          <span>Cancellation Policy.</span>
        </div>
      </div>
    </div>
  );
}
