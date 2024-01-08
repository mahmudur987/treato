import SuccessCircle from "../../../assets/images/icons/SuccessCircle.svg"
import clock from "../../../assets/images/icons/clock.svg"
import styles from '../../../pages/BookFlow/BookFlow.module.css'
import AddedService from "../AddedService/AddedService"
import PrimaryButton from "../../Buttons/PrimaryButton/PrimaryButton"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from 'react'
import { cross } from "../../../assets/images/icons"
import { resetSalonServicesState } from "../../../redux/slices/salonServices"
import { resetVisitorState } from "../../../redux/slices/VisitorDetails"

export default function CompletedPay() {
    const bookingDetails = useSelector(
        (state) => state?.salonServices
      );
  let navigate = useNavigate();
  const dispatch=useDispatch()
const [itemtotal, setItemtotal] = useState(null)
  const formatDate = (inputDate) => {
    console.log(inputDate);
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    const dateObject = new Date(inputDate);
    const formattedDate = dateObject.toLocaleDateString('en-US', options);
  
    return formattedDate;
  };

  useEffect(() => {
    let prices = bookingDetails?.salonContent?.map((v, i) => {
        return v.service_price;
      });
      let totalPrice = prices.reduce((a, b) => a + b, 0);
      setItemtotal(totalPrice)
  }, [bookingDetails?.salonContent])
  
const handleBackHomeBTn=()=>{
    dispatch(resetSalonServicesState())
    dispatch(resetVisitorState())
    navigate('/')
}



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
                To reschedule or cancel, go to {" "}
                <span>My Appointments</span>.
            </div>
            <div className={styles.payMainE}>
                <div className={styles.payMainEA}>
                    Order Details
                </div>
                <div className={styles.payMainEB}>
                    <img src={clock} alt="" />
                    <div>{formatDate(bookingDetails?.serviceDate)}, {bookingDetails?.serviceTime}</div>
                </div>
                {bookingDetails?.salonContent?.map((item)=>(
                    <div className={styles.addedServiceA}>            
              <div className={styles.addedServiceB}>
              <div>{item?.service_count}</div>
              <img src={cross} alt="x" />
              <div>{item?.service_name}</div>
          </div>
          <div className={styles.addedServiceC}>
              ₹{item?.service_price}
          </div>
                    </div>
                ))}
                <div className={`${styles.payMainEC} ${styles.fwBold}`}>
                    <div>Item total</div>
                    <div>₹{itemtotal}</div>
                </div>
           {bookingDetails?.appliedOffer?.amount_for_discount &&     <div className={styles.payMainEC}>
                    <div className={styles.payMainECA}>Discount</div>
                    <div className={styles.discontAmount}>- ₹{bookingDetails?.appliedOffer?.amount_for_discount?.toLocaleString()}</div>
                </div>}
                <div className={styles.payMainEC}>
                    <div className={styles.payMainECA}>Taxes and fees</div>
                    <div>₹{bookingDetails?.serviceTaxPrice?.toLocaleString()}</div>
                </div>
                <div className={`${styles.payMainEC} ${styles.fwBold}`}>
                    <div>Amount paid</div>
                    <div>₹{bookingDetails?.appliedOffer?.amount_for_discount?(bookingDetails?.Amount-bookingDetails?.appliedOffer?.amount_for_discount).toLocaleString():bookingDetails?.Amount?.toLocaleString()}</div>
                </div>
            </div>
            <div className={styles.payMainF}>
                <PrimaryButton children={"Back to home"} onClick={handleBackHomeBTn}/>
            </div>
        </div>
    </div>
  )
}
