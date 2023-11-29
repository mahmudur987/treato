import styles from '../../../pages/BookFlow/BookFlow.module.css'
import ellipse from "../../../assets/images/SalonDetail/Ellipse.svg"
import RadioInput from '../../Input/RadioInput/RadioInput'
import SalonStar from '../../SalonDetail/SalonStar/SalonStar'

export default function WorkerComponent({workerData,index,getWorkerData}) {

    return (
        <label className={styles.worker_compA} htmlFor={`worker${index}`} onClick={getWorkerData}>
            <div className={styles.worker_compAA}>
                <img src={workerData?.stylist_Img?.public_url} alt="" />
                <div className={styles.worker_compAC}>
                    <div className={styles.worker_compACBA}>
                        <div className={styles.worker_compACA}>{workerData?.stylist_name}</div>
                        <div className={styles.worker_prevBooked}>Previously booked</div>
                    </div>
                    <div className={styles.worker_compACB}>
                        <div className={styles.worker_compStar}>
                            <div>{workerData?.rating}</div>
                            <SalonStar fill="#6D747A" />
                            <div>({workerData?.reviews?.length})</div>
                        </div>
                        <img src={ellipse} alt="" />
                        <div>{workerData?.stylist_service}</div>
                        <img src={ellipse} alt="" />
                        <div>251 bookings</div>
                    </div>
                </div>
            </div>
            <div className={styles.worker_compAB}>
                <RadioInput Type={'radio'} NAME={'preference'} id={`worker${index}`} VALUE={workerData?._id}/>
            </div>
        </label>
    )
}