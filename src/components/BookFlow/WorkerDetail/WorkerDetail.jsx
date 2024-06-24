import styles from "../../../pages/BookFlow/BookFlow.module.css";
import userIco from "../../../assets/images/SalonDetail/userIco.svg";
import WorkerComponent from "../WorkerComponent/WorkerComponent";
import ServiceTime from "../ServiceTime/ServiceTime";
import RadioInput from "../../Input/RadioInput/RadioInput";
import { useEffect, useRef } from "react";

export default function WorkerDetail({
  SalonData,
  getWorkerData,
  availableSlots,
  updateItemCounter,
  itemCounter,
}) {
  const noneLabelRef = useRef(null);

  useEffect(() => {
    // Click the label when the component mounts
    noneLabelRef.current.click();
  }, []);

  return (
    <div className={styles.worker_detailMain}>
      <label htmlFor="none" onClick={getWorkerData} ref={noneLabelRef}>
        <div className={styles.worker_detailA}>
          <div className={styles.worker_detailAD}>
            <div className={styles.worker_detailAA}>
              <img src={userIco} alt="" />
            </div>
            <div className={styles.worker_detailAB}>
              <div>No Preference</div>
              <div>
                Professional assigned by the salon. Maximum availability
              </div>
            </div>
          </div>
          <div className={styles.worker_detailAC}>
            <RadioInput
              Type={"radio"}
              NAME={"preference"}
              id={`none`}
              VALUE={"none"}
            />
          </div>
        </div>
      </label>
      <div className={styles.worker_detailB}>
        {SalonData?.stylists?.map((v, i) => {
          return (
            <WorkerComponent
              workerData={v}
              key={i}
              index={i}
              getWorkerData={getWorkerData}
            />
          );
        })}
      </div>
      <div className={styles.worker_detailC}>
        <ServiceTime
          getWorkerData={getWorkerData}
          availableSlots={availableSlots}
        />
      </div>
    </div>
  );
}
