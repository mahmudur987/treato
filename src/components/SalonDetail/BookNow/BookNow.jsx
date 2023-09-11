import styles from '../SalonMain/SalonMain.module.css'
import ellipse from "../../../assets/images/SalonDetail/Ellipse.svg"
import { Link } from "react-router-dom";

export default function BookNow({innerText,updateActiveBookFlowBA,activeBookFlowBA,SalonDetails}) {

    return (
        <div className={styles.book_nowA}>
            <div className={styles.book_nowB}>
                {
                    SalonDetails ? 
                    '32 services to choose from'
                    :
                    activeBookFlowBA===4?
                    <>
                        <div className={styles.book_nowD}>
                            Total: <span>₹1,177</span>
                        </div>
                        <div className={styles.book_nowE}>
                            View Bill
                        </div>
                    </>
                    :
                    <>
                        <div className={styles.book_nowBA}>
                            <div>2 services</div>
                            <img src={ellipse} alt="" />
                            <div>1 hr 15 mins</div>
                        </div>
                        <div>
                            Item total: <span className={styles.book_nowBB}>₹998</span>
                        </div>
                    </>

                }
            </div>
            <div className={styles.book_nowC}>
                <Link to={updateActiveBookFlowBA?'':'/salons/:id/book'}><button onClick={()=>updateActiveBookFlowBA?updateActiveBookFlowBA(activeBookFlowBA!==4?activeBookFlowBA+1:4):''} className={styles.book_nowAA}>{innerText?innerText:'Book Now'}</button></Link>
            </div>
        </div>
    )
}