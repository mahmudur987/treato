import styles from '../SalonMain/SalonMain.module.css'
import ellipse from "../../../assets/images/SalonDetail/Ellipse.svg"
import { useState } from 'react'

export default function SalonServiceCard() {
    let [itemCounter,updateItemCounter] = useState(0)

    return (
        <div className={styles.salon_serviceB}>
            <div className={styles.salon_serviceC}>
                <div className={styles.salon_serviceD}>Hair cut ladies</div>
                <div>
                    <button className={styles.salon_serviceE}>
                        {
                            itemCounter !== 0 ?
                            <div className={styles.salon_serviceEA}>
                                <div onClick={()=>updateItemCounter(itemCounter !==0 ? itemCounter-1 : 0)}>-</div>
                                <div>{itemCounter}</div>
                                <div onClick={()=>updateItemCounter(itemCounter+1)}>+</div>
                            </div>
                            :
                            <div className={styles.salon_serviceEB} onClick={()=>updateItemCounter(itemCounter=1)}>Add</div>
                        }
                    </button>
                </div>
            </div>
            <div className={styles.salon_serviceF}>
                <div>1 hr 15 mins</div>
                <img src={ellipse} alt="" />
                <div>₹599</div>
            </div>
        </div>
    )
}