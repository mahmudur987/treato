import styles from '../SalonMain/SalonMain.module.css'
import SalonStar from '../SalonStar/SalonStar'
import pp2 from "../../../assets/images/SalonDetail/profilepic2.png"

export default function SalonReview() {
    return (
        <div className={styles.salon_reviewsA}>
            <div className={styles.salon_reviewsAA}>
                <div className={styles.salon_reviewsAAA}>
                    <img src={pp2} alt="" />
                </div>
                <div className={styles.salon_reviewsAAB}>
                    <div>Dani D.</div>
                    <div>12 days ago</div>
                </div>
            </div>
            <div className={styles.salon_reviewsAB}>
                <div>4.0</div>
                <div>
                    <SalonStar fill="#08090A" />
                    <SalonStar fill="#08090A" />
                    <SalonStar fill="#08090A" />
                    <SalonStar fill="#08090A" />
                    <SalonStar fill="#EAEFF2" />
                </div>
            </div>
            <div className={styles.salon_reviewsAC}>
                She Hair & Beauty is a luxurious hair spa nestled in the heart of Ejipura, Bengaluru. Step into a haven of relaxation and rejuvenation, where expert stylists and therapists pamper you with personalized treatments, from haircare to beauty services. Experience the perfect blend of modern techniques and traditional remedies at She Hair & Beauty.
            </div>
        </div>
    )
}