import styles from '../../../pages/BookFlow/BookFlow.module.css'
import visa from "../../../assets/images/SalonDetail/visa.png"
import phonepe from "../../../assets/images/SalonDetail/phonepe.png"
import paytm from "../../../assets/images/SalonDetail/paytm.png"
import plus from "../../../assets/images/SalonDetail/plus.svg"
import rightBlue from "../../../assets/images/SalonDetail/rightBlue.svg"
import bank from "../../../assets/images/SalonDetail/bank.svg"
import simpl from "../../../assets/images/SalonDetail/simpl.png"
import RadioInput from '../../Input/RadioInput/RadioInput'
import { useEffect, useRef } from 'react'

export default function FinalBill({ setShowPay, showPay, setPaySelected }) {
const defaultClick = useRef(null)
useEffect(() => {
defaultClick.current.click()
}, [])


    return (
        <div className={styles.final_billMain}>
            <div className={styles.final_billA}>
                <div className={styles.final_billAA}>Mode of payment</div>
                <div className={styles.final_billAB} >
        <input type="radio" className={styles.radio_input} value="" id="payNow" name="payment" onClick={()=>setShowPay(true)} ref={defaultClick} />
                    {/* <RadioInput Type={'radio'} NAME={'payment'} id={"payNow"} setShowPay={setShowPay} showPay={true} /> */}
                    <label htmlFor="payNow">
                        <div className={styles.final_billABA}>
                            <div>Online payment</div>
                            <div>Pay now using UPI, cards, NetBanking or wallets.</div>
                        </div>
                    </label>
                </div>
                <div className={styles.final_billAB}>
                    <RadioInput Type={'radio'} NAME={'payment'} id={'onsite'} setShowPay={setShowPay} showPay={false} />
                    <label htmlFor="onsite">
                        <div className={styles.final_billABA}>
                            <div>On-site payment after service</div>
                            <div>Pay directly at the salon.</div>
                        </div>
                    </label>
                </div>
            </div>

        </div>
    )
}