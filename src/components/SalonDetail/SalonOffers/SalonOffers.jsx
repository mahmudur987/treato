import styles from '../SalonMain/SalonMain.module.css'
import discount_shape from "../../../assets/images/SalonDetail/discount-shape.svg"

export default function SalonOffers({ isFromModal, offerData }) {
    return (
        <>
            {
                isFromModal ?
                    <div className={styles.salon_offersModal}>
                        <div className={styles.salon_offersModalA}>
                            <div className={styles.salon_offersAB}>
                                <img src={discount_shape} alt="" />
                                <div>{offerData?.title} </div>
                            </div>
                            <div className={styles.salon_offersAC}>
                                {offerData?.description}
                            </div>
                            <div className={styles.salon_offersAE}>
                                {offerData?.description}
                            </div>
                        </div>
                        <div className={styles.salon_offersModalB}>
                            <input type="radio" name="offers" id="" />
                        </div>
                    </div>
                    :
                    <div className={styles.salon_offersAA}>
                        <div className={styles.salon_offersAB}>
                            <img src={discount_shape} alt="" />
                            <div>{offerData?.title}  </div>
                        </div>
                        <div className={styles.salon_offersAC}>
                            {offerData?.description}
                        </div>
                    </div>

            }
        </>
    )
}