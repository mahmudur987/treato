import styles from '../SalonMain/SalonMain.module.css'
import discount from "../../../assets/images/SalonDetail/discount-shape-svgrepo-com 1.svg"

export default function SalonOffers() {
    return (
        <div className={styles.salon_offersAA}>
        <div className={styles.salon_offersAB}>
            <img src={discount} alt="" />
            <div>15% off up to ₹99 </div>
        </div>
        <div className={styles.salon_offersAC}>
            USE BEAUTY100 | Applicable on orders above ₹599
        </div>
    </div>
    )
}