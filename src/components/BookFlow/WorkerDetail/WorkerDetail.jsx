import styles from '../../../pages/BookFlow/BookFlow.module.css'
import userIco from "../../../assets/images/SalonDetail/userIco.svg"
import WorkerComponent from '../WorkerComponent/WorkerComponent'
import ServiceTime from '../ServiceTime/ServiceTime'

export default function WorkerDetail() {

    return (
        <div className={styles.worker_detailMain}>
            <div className={styles.worker_detailA}>
                <div className={styles.worker_detailAD}>
                    <div className={styles.worker_detailAA}>
                        <img src={userIco} alt="" />
                    </div>
                    <div className={styles.worker_detailAB}>
                        <div>No Preference</div>
                        <div>Professional assigned by the salon. Maximum availability</div>
                    </div>
                </div>
                <div className={styles.worker_detailAC}>
                    <input type="radio" name="preference" />
                </div>
            </div>
            <div className={styles.worker_detailB}>
                <WorkerComponent/>
                <WorkerComponent/>
                <WorkerComponent/>
                <WorkerComponent/>
            </div>
            <div className={styles.worker_detailC}>
                <ServiceTime/>
            </div>
        </div>
    )
}