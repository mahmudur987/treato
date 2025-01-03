import styles from "../../../pages/BookFlow/BookFlow.module.css";
import ellipse from "../../../assets/images/SalonDetail/Ellipse.svg";
import RadioInput from "../../Input/RadioInput/RadioInput";
import SalonStar from "../../SalonDetail/SalonStar/SalonStar";

export default function WorkerComponent({
  checked,
  workerData,
  index,
  getWorkerData,
  bookingAble,
}) {
  const totalBookings = bookingAble.find(
    (x) => x._id === workerData._id
  )?.totalAppointments;

  const isPreviouslyBooked = bookingAble.find(
    (x) => x._id === workerData._id
  )?.previouslyBooked;

  return (
    <label
      className={styles.worker_compA}
      htmlFor={`worker${index}`}
      onClick={getWorkerData}
    >
      <div className={styles.worker_compAA}>
        <img loading="lazy" src={workerData?.stylist_Img?.public_url} alt="" />
        <div className={styles.worker_compAC}>
          <div className={styles.worker_compACBA}>
            <div className={styles.worker_compACA}>
              {workerData?.stylist_name}
            </div>
            {isPreviouslyBooked && (
              <div className={styles.worker_prevBooked}>Previously booked</div>
            )}
          </div>
          <div className={styles.worker_compACB}>
            {/* <div className={styles.worker_compStar}>
              <div>{workerData?.rating}</div>
              <SalonStar fill="#6D747A" />
              <div>({workerData?.reviews?.length})</div>
            </div> */}
            <img loading="lazy" src={ellipse} alt="" />
            <div>{workerData?.stylist_service}</div>
            <img loading="lazy" src={ellipse} alt="" />
            {totalBookings > 0 && <div>{totalBookings} bookings</div>}
          </div>
        </div>
      </div>
      <div className={styles.worker_compAB}>
        <RadioInput
          checked={checked ? checked : false}
          Type={"radio"}
          NAME={"preference"}
          id={`worker${index}`}
          VALUE={workerData?._id}
        />
      </div>
    </label>
  );
}
