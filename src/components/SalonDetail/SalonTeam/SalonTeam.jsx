import styles from '../SalonMain/SalonMain.module.css'
import pp1 from "../../../assets/images/SalonDetail/profilepic1.png"
import starWhite from "../../../assets/images/SalonDetail/starWhite.svg"

export default function SalonTeam() {
    return (
        <div className={styles.salon_teamAA}>
            <div className={styles.salon_teamAAA}>
                <img src={pp1} alt="" />
            </div>
            <div className={styles.salon_teamAAD}>
                <img src={starWhite} alt="" />
                4.2
            </div>
            <div className={styles.salon_teamAAB}>Nayanika</div>
            <div className={styles.salon_teamAAC}>Hair Styling Specialist</div>
        </div>
    )
}