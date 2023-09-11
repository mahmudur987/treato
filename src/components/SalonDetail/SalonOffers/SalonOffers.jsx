import styles from '../SalonMain/SalonMain.module.css'
import discount_shape from "../../../assets/images/SalonDetail/discount-shape.svg"

export default function SalonOffers() {
    return (
        <div className={styles.salon_offersAA}>
        <div className={styles.salon_offersAB}>
            <img src={discount_shape} alt="" />
            <div>15% off up to ₹99 </div>
        </div>
        <div className={styles.salon_offersAC}>
            USE BEAUTY100 | Applicable on orders above ₹599
        </div>
    </div>
    )
}