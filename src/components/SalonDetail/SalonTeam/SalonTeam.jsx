import styles from '../SalonMain/SalonMain.module.css'
import starWhite from "../../../assets/images/SalonDetail/starWhite.svg"

export default function SalonTeam({stylistData}) {
    return (
        <div className={styles.salon_teamAA}>
            <div className={styles.salon_teamAAA}>
                <img src={stylistData?.stylist_Img?.public_url} alt="stylist image" />
            </div>
            <div className={styles.salon_teamAAD}>
                <img src={starWhite} alt="star" />
                {stylistData?.rating}
            </div>
            <div className={styles.salon_teamAAB}>{stylistData?.stylist_name}</div>
            <div className={styles.salon_teamAAC}>{stylistData?.stylist_service[0]}</div>
        </div>
    )
}