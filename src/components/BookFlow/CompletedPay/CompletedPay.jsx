import SuccessCircle from "../../../assets/images/icons/SuccessCircle.svg";
import clock from "../../../assets/images/icons/clock.svg";
import styles from "../../../pages/BookFlow/BookFlow.module.css";
import AddedService from "../AddedService/AddedService";
import PrimaryButton from "../../Buttons/PrimaryButton/PrimaryButton";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { cross } from "../../../assets/images/icons";
import { resetSalonServicesState } from "../../../redux/slices/salonServices";
import { resetVisitorState } from "../../../redux/slices/VisitorDetails";
import { getSingleSalonData } from "../../../services/salon";

export default function CompletedPay() {
  const bookingDetails = useSelector((state) => state?.salonServices);
  const { id } = useParams();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [salon, setSalon] = useState(null);
  const [itemtotal, setItemtotal] = useState(null);
  const formatDate = (inputDate) => {
    console.log(inputDate);
    const options = { weekday: "short", month: "short", day: "numeric" };
    const dateObject = new Date(inputDate);
    const formattedDate = dateObject.toLocaleDateString("en-US", options);

    return formattedDate;
  };

  useEffect(() => {
    let prices = bookingDetails?.salonContent?.map((v, i) => {
      return v.service_price;
    });
    let totalPrice = prices.reduce((a, b) => a + b, 0);
    setItemtotal(totalPrice);
  }, [bookingDetails?.salonContent]);

  useEffect(() => {
    getSingleSalonData(id).then((res) => {
      console.log(res?.res?.data?.salon);
      setSalon(res?.res?.data?.salon);
    });
  }, [id]);

  const handleBackHomeBTn = () => {
    dispatch(resetSalonServicesState());
    dispatch(resetVisitorState());
    navigate("/");
  };
  let serviceDateTimeStart = new Date(bookingDetails?.serviceDate);
  let serviceDateTimeEnd = new Date(bookingDetails?.serviceDate);

  function convertTimeStringToDateTime(timeString, type) {
    const timeRegex = /^(\d{1,2}):(\d{2})\s?([APMapm]{2})$/;
    const match = timeString.match(timeRegex);

    if (!match) {
      throw new Error("Invalid time format");
    }

    let hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);
    const period = match[3].toUpperCase();

    if (hours === 12) {
      hours -= 12;
    }

    if (period === "PM") {
      hours += 12;
    }
    if (type === "start") {
      serviceDateTimeStart.setHours(hours, minutes, 0);
      console.log(serviceDateTimeStart.setHours(hours, minutes, 0));
    } else {
      serviceDateTimeEnd.setHours(hours + 1, minutes, 0);
      console.log(serviceDateTimeEnd.setHours(hours + 1, minutes, 0));
    }
    return {
      hours,
      minutes,
      isAM: period === "AM",
    };
  }

  const handleAddToCalendar = async () => {
    // Construct the Google Calendar "Add to Calendar" link
    let start = await convertTimeStringToDateTime(
      bookingDetails?.serviceTime,
      "start"
    );
    let end = await convertTimeStringToDateTime(
      bookingDetails?.serviceTime,
      "end"
    );
    console.log(start, end);
    const calendarLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      `Salon Appointment at ${salon?.salon_name}`
    )}&dates=${encodeURIComponent(
      serviceDateTimeStart.toISOString().replace(/-|:|\.\d+/g, "")
    )}/${encodeURIComponent(
      serviceDateTimeEnd.toISOString().replace(/-|:|\.\d+/g, "")
    )}&details=${encodeURIComponent(
      `**Appointment Details**\n\nSalon: ${salon?.salon_name}\nTiming: ${bookingDetails?.serviceTime}\n\n`
    )}&location=${encodeURIComponent(`${salon?.salon_name}`)}`;

    // Open the link in a new tab or window
    window.open(calendarLink, "_blank");
  };
  const handleNavigate = () => {
    navigate("/my-appointments/upcoming");
  };

  return (
    <div className={styles.payMain}>
      <div className={styles.payMainA}>
        <div className={styles.payMainB}>
          <img loading="lazy" src={SuccessCircle} alt="success" />
        </div>
        <div className={styles.payMainC}>
          Your appointment at <span>{salon?.salon_name}</span> was successfully
          booked.{" "}
          <span onClick={handleAddToCalendar} className={styles.AddCalendar}>
            Add to Calendar
          </span>
        </div>
        <div className={styles.payMainD}>
          To reschedule or cancel, go to{" "}
          <span onClick={handleNavigate} className={styles.myAppointment}>
            My Appointments
          </span>
          .
        </div>
        <div className={styles.payMainE}>
          <div className={styles.payMainEA}>Order Details</div>
          <div className={styles.payMainEB}>
            <img loading="lazy" src={clock} alt="" />
            <div>
              {formatDate(bookingDetails?.serviceDate)},{" "}
              {bookingDetails?.serviceTime}
            </div>
          </div>
          {bookingDetails?.salonContent?.map((item) => (
            <div className={styles.addedServiceA}>
              <div className={styles.addedServiceB}>
                <div>{item?.service_count}</div>
                <img loading="lazy" src={cross} alt="x" />
                <div>{item?.service_name}</div>
              </div>
              <div className={styles.addedServiceC}>₹{item?.service_price}</div>
            </div>
          ))}
          <div className={`${styles.payMainEC} ${styles.fwBold}`}>
            <div>Item total</div>
            <div>₹{itemtotal}</div>
          </div>
          {bookingDetails?.appliedOffer?.amount_for_discount && (
            <div className={styles.payMainEC}>
              <div className={styles.payMainECA}>Discount</div>
              <div className={styles.discontAmount}>
                - ₹
                {bookingDetails?.appliedOffer?.amount_for_discount?.toLocaleString()}
              </div>
            </div>
          )}
          <div className={styles.payMainEC}>
            <div className={styles.payMainECA}>Taxes and fees</div>
            <div>₹{bookingDetails?.serviceTaxPrice?.toLocaleString()}</div>
          </div>
          <div className={`${styles.payMainEC} ${styles.fwBold}`}>
            <div>Amount paid</div>
            <div>
              ₹
              {bookingDetails?.appliedOffer?.amount_for_discount
                ? (
                    bookingDetails?.Amount -
                    bookingDetails?.appliedOffer?.amount_for_discount
                  ).toLocaleString()
                : bookingDetails?.Amount?.toLocaleString()}
            </div>
          </div>
        </div>
        <div className={styles.payMainF}>
          <PrimaryButton
            children={"Back to home"}
            onClick={handleBackHomeBTn}
          />
        </div>
      </div>
    </div>
  );
}
