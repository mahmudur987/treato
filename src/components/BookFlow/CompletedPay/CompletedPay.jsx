import SuccessCircle from "../../../assets/images/icons/SuccessCircle.svg"
import clock from "../../../assets/images/icons/clock.svg"
import styles from '../../../pages/BookFlow/BookFlow.module.css'
import AddedService from "../AddedService/AddedService"
import PrimaryButton from "../../Buttons/PrimaryButton/PrimaryButton"
import { useNavigate } from "react-router-dom"
export default function CompletedPay() {

  let navigate = useNavigate();
  return (
    <div className={styles.payMain}>
        <div className={styles.payMainA}>
            <div className={styles.payMainB}>
                <img src={SuccessCircle} alt="success" />
            </div>
            <div className={styles.payMainC}>
                Your appointment at <span>She Hair & Beauty</span> was successfully booked. {" "}
                <span>Add to Calendar</span>
            </div>
            <div className={styles.payMainD}>
                To reschedule or cancel, go to My Appointments. {" "}
                <span>Add to Calendar</span>
            </div>
            <div className={styles.payMainE}>
                <div className={styles.payMainEA}>
                    Order Details
                </div>
                <div className={styles.payMainEB}>
                    <img src={clock} alt="" />
                    <div>Mon - Aug 18, 8:30 PM</div>
                </div>
                <AddedService/>
                <AddedService/>
                <div className={`${styles.payMainEC} ${styles.fwBold}`}>
                    <div>Item total</div>
                    <div>₹998</div>
                </div>
                <div className={styles.payMainEC}>
                    <div className={styles.payMainECA}>Taxes and fees</div>
                    <div>₹179</div>
                </div>
                <div className={`${styles.payMainEC} ${styles.fwBold}`}>
                    <div>Amount paid</div>
                    <div>₹1,177</div>
                </div>
            </div>
            <div className={styles.payMainD}>
                <PrimaryButton children={"Back to home"} onClick={()=>navigate('/')}/>
            </div>
        </div>
    </div>
  )
}
