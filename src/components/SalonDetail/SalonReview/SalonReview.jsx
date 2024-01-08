import styles from '../SalonMain/SalonMain.module.css'
import SalonStar from '../SalonStar/SalonStar'
import pp2 from "../../../assets/images/SalonDetail/profilepic2.png"

export default function SalonReview({ reviewData }) {
    let starData = [1, 2, 3, 4, 5]
    return (
        <div className={styles.salon_reviewsA}>
            <div className={styles.salon_reviewsAA}>
                <div className={styles.salon_reviewsAAA}>
                    <img src={pp2} alt="" />
                </div>
                <div className={styles.salon_reviewsAAB}>
                    <div>{reviewData.name}</div>
                    <div>{reviewData.time}</div>
                </div>
            </div>
            <div className={styles.salon_reviewsAB}>
                <div>{Math.ceil(reviewData.rating) === reviewData.rating ? reviewData.rating + ".0" : reviewData.rating}</div>
                <div>
                    {
                        starData.map((v, i) => {
                            if (i < reviewData.rating) {
                                return (<SalonStar fill="#08090A" key={i} />)
                            } else {
                                return (<SalonStar fill="#EAEFF2" key={i} />)
                            }
                        })
                    }
                </div>
            </div>
            <div className={styles.salon_reviewsAC}>
                {reviewData.comment}
            </div>
        </div>
    )
}