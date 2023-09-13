import styles from '../../../pages/BookFlow/BookFlow.module.css'
import slide1 from "../../../assets/images/SalonDetail/slide1.png"
import discountIco from "../../../assets/images/SalonDetail/discountIco.svg"
import rightBlue from "../../../assets/images/SalonDetail/rightBlue.svg"
import calendar_cancel from "../../../assets/images/SalonDetail/calendar-cancel.svg"

export default function BillSummary() {

    return (
        <>
            <div className={styles.service_cardMain}>
                <div className={styles.bill_sumA}>Bill Summary</div>
                <div className={styles.bill_sumI}>
                    <div className={styles.bill_sumB}>
                        <img src={slide1} alt="" />
                        <div>She Hair & Beauty</div>
                    </div>
                    <div className={styles.bill_sumC}>
                        <div className={styles.bill_sumCA}>
                            <div>1</div>
                            <div>x</div>
                            <div>Hair cut girls</div>
                        </div>
                        <div>₹399</div>
                    </div>
                    <div className={styles.bill_sumD}>
                        <div className={styles.bill_sumDA}>
                            <div>1</div>
                            <div>x</div>
                            <div>Blow drying ladies</div>
                        </div>
                        <div>₹599</div>
                    </div>
                    <div className={styles.bill_sumE}>
                        <div>
                            Item total
                        </div>
                        <div>₹998 </div>
                    </div>
                    <div className={styles.bill_sumE}>
                        <div className={styles.bill_sumEA}>
                            Taxes and fees
                        </div>
                        <div className={styles.bill_sumEB}>₹179</div>
                    </div>
                    <div className={styles.bill_sumF}>
                        <div className={styles.bill_sumFA}>
                            Amount to be paid
                        </div>
                        <div className={styles.bill_sumFB}>₹1,177</div>
                    </div>
                </div>
                <div className={styles.bill_sumF}>
                    <div className={styles.bill_sumFC}>
                        <img src={discountIco} alt="" />
                        <div>Offers & Benefits</div>
                    </div>
                    <div className={styles.bill_sumFD}>
                        <div>4 offers</div>
                        <img src={rightBlue} alt="" />
                    </div>
                </div>
                <div className={styles.bill_sumG}>
                    <button>Pay ₹1,177</button>
                </div>
            </div>
            <div className={styles.bill_sumH}>
                <img src={calendar_cancel} alt="" />
                <div className={styles.bill_sumHA}>
                    Free cancellation & rescheduling till 4 hours before the start time, post that cancellation charge(s) apply. <span>Cancellation Policy.</span>
                </div>
            </div>
        </>
    )
}