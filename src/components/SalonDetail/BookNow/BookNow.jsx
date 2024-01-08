import styles from '../SalonMain/SalonMain.module.css'
import ellipse from "../../../assets/images/SalonDetail/Ellipse.svg"
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function BookNow({ innerText, updateActiveBookFlowBA, activeBookFlowBA, SalonDetails, setCompletedPay, salonId, totalSalonServices, salonServices, Disabled }) {
    let [totalServicesPrice, setTotalServicesPrice] = useState(0);
    useEffect(() => {
        if (salonServices?.length) {
            let prices = salonServices.map((v, i) => {
                return v.service_price
            })
            let totalPrice = prices.reduce((a, b) => a + b, 0);
            setTotalServicesPrice(totalPrice);
        }
    }, [salonServices]);
    let proceedPayment = () => {
        if (Disabled) {
            toast.error('Please fill all required details!');
        } else {
            if (updateActiveBookFlowBA) {
                updateActiveBookFlowBA(activeBookFlowBA !== 4 ? activeBookFlowBA + 1 : 4);
            }
            if (setCompletedPay) {
                setCompletedPay(true);
            }
        }
    }
    return (
        <div className={styles.book_nowA}>
            <div className={styles.book_nowB}>
                {
                    SalonDetails ?
                        `${totalSalonServices ? totalSalonServices : null} services to choose from`
                        :
                        activeBookFlowBA === 4 ?
                            <>
                                <div className={styles.book_nowD}>
                                    Total: <span>₹{totalServicesPrice}</span>
                                </div>
                                <div className={styles.book_nowE}>
                                    View Bill
                                </div>
                            </>
                            :
                            <>
                                <div className={styles.book_nowBA}>
                                    <div>{salonServices?.length ? salonServices.length : 0} services</div>
                                    <img src={ellipse} alt="" />
                                    <div>{salonServices?.length ? salonServices.at(-1)?.service_time : '0 mins'}</div>
                                </div>
                                <div>
                                    Item total: <span className={styles.book_nowBB}>₹{totalServicesPrice}</span>
                                </div>
                            </>

                }
            </div>
            <div className={styles.book_nowC}>
                <Link to={updateActiveBookFlowBA ? '' : `/salons/${salonId}/book`}><button onClick={proceedPayment} className={styles.book_nowAA}>{innerText ? innerText : 'Book an appointment'}</button></Link>
            </div>
        </div>
    )
}