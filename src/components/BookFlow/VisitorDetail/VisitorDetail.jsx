import styles from '../../../pages/BookFlow/BookFlow.module.css'
import userIco from "../../../assets/images/SalonDetail/userIco.svg"

export default function VisitorDetail() {

    return (
        <div className={styles.visitor_detailMain}>
            <div className={styles.visitor_detailA}>
                <div className={styles.visitor_detailAA}>
                    Who are you booking for?
                </div>
                <div className={styles.visitor_detailAB}>
                    <input type="radio" name="visitor" id="" />
                    <div>Booking for myself</div>
                </div>
                <div className={styles.visitor_detailAB}>
                    <input type="radio" name="visitor" id="" />
                    <div>Booking for someone else (guest)</div>
                </div>
            </div>
            <div className={styles.visitor_detailA}>
                <div className={`${styles.visitor_detailAA} ${styles.mb_0}`}>
                    Enter contact details
                </div>
                <div className={styles.visitor_detailAB}>You may need this phone number at the salon for OTP purposes</div>
                <div className={styles.visitor_detailAC}>
                    <div className={styles.visitor_detailACA}>Name</div>
                    <div className={styles.visitor_detailACB}>
                        <input type="text" placeholder='Shreya Avasthi'/>
                    </div>
                </div>
                <div className={styles.visitor_detailAC}>
                    <div className={styles.visitor_detailACA}>Phone</div>
                    <div className={`${styles.visitor_detailACB} ${styles.visitor_detailAC_opt}`}>
                        <select name="country" id="">
                            <option value="+91">+91</option>
                            <option value="+88">+88</option>
                            <option value="+66">+66</option>
                        </select>
                        <div className={styles.visitor_detailBorder}></div>
                        <input type="tel" placeholder='Enter your phone number'/>
                    </div>
                </div>
                <div className={styles.visitor_detailAC}>
                    <div className={styles.visitor_detailACA}>Email</div>
                    <div className={styles.visitor_detailACB}>
                        <input type="email" placeholder='shreya2716@gmail.com'/>
                    </div>
                </div>
                <div className={styles.visitor_detailAC}>
                    <div className={styles.visitor_detailACA}>Preferences (optional)</div>
                    <div className={styles.visitor_detailACB}>
                        <textarea name="" id="" placeholder='Anything specific you want to share'></textarea>
                    </div>
                </div>
            </div>
        </div>
    )
}