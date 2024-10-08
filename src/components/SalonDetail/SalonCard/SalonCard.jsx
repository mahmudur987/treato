import styles from "./SalonCard.module.css";
import star from "../../../assets/images/SalonDetail/star_line.svg";
import ellipse from "../../../assets/images/SalonDetail/Ellipse.svg";
import discount from "../../../assets/images/SalonDetail/discountIco.svg";
import clock from "../../../assets/images/SalonDetail/clock.svg";
import SalonMap from "../SalonMap/SalonMap";
import BookNow from "../BookNow/BookNow";
import { memo, useState } from "react";
import { useEffect } from "react";
import { useGetAllSalonOffer } from "../../../services/Appointments";

export default function SalonCard({ SalonData, salonId }) {
  let storeSchedule = SalonData?.working_hours;
  const [checkSalonOpen, setCheckSalonOpen] = useState(false);
  const { data: offer, isError, isLoading } = useGetAllSalonOffer();
  useEffect(() => {
    if (storeSchedule) {
      const checkIfOpen = () => {
        const now = new Date();
        const currentDay = now.toLocaleString("en-US", { weekday: "long" });
        const currentTime = now.getHours() * 60 + now.getMinutes(); // Current time in minutes

        const todaySchedule = storeSchedule.find(
          (day) => day.day === currentDay
        );

        if (todaySchedule) {
          const openingTime = convertTimeToMinutes(todaySchedule.opening_time);
          const closingTime = convertTimeToMinutes(todaySchedule.closing_time);

          // Check if current time is within opening and closing times
          if (currentTime >= openingTime && currentTime <= closingTime) {
            setCheckSalonOpen(true);
          } else {
            setCheckSalonOpen(false);
          }
        }
      };

      // Convert time in "hh:mm AM/PM" to minutes
      const convertTimeToMinutes = (timeString) => {
        const [time, modifier] = timeString.split(" ");
        let [hours, minutes] = time.split(":").map(Number);

        if (modifier === "PM" && hours !== 12) hours += 12;
        if (modifier === "AM" && hours === 12) hours = 0;

        return hours * 60 + minutes;
      };

      checkIfOpen();

      const intervalId = setInterval(checkIfOpen, 60000);

      return () => clearInterval(intervalId);
    }
  }, [storeSchedule]);
  console.log(offer);
  return (
    <div className={styles.salon_card}>
      <div className={styles.salon_cardA}>
        {SalonData ? SalonData.salon_name : null}
      </div>
      <div className={styles.salon_cardB}>
        <div>{Number(SalonData?.total_rating) > 0 ? SalonData.rating : 0} </div>
        <img loading="lazy" src={star} alt="" />
        <div>
          (based on{" "}
          {Number(SalonData?.total_rating) > 0 ? SalonData.total_rating : 0}{" "}
          ratings)
        </div>
        <img loading="lazy" src={ellipse} alt="" />
        <div>See reviews</div>
      </div>
      <div className={styles.salon_cardC}>
        <BookNow salonId={salonId ? salonId : null} />
      </div>
      {offer && !isLoading && !isError && (
        <div className={styles.salon_cardD}>
          <img loading="lazy" src={discount} alt="" />
          <div>{offer?.data[0]?.description}</div>
        </div>
      )}
      <div className={styles.salon_cardD}>
        <img loading="lazy" src={clock} alt="" />
        <div>
          <div className={styles.salon_cardDA}>
            <div>{checkSalonOpen ? "Open" : "Closed"}</div>
            <img loading="lazy" src={ellipse} alt="" />
            <div>
              Opens {SalonData?.working_hours[0]?.opening_time}{" "}
              {SalonData?.working_hours[0]?.day}
            </div>
          </div>
          <div className={styles.salon_cardDB}>See timings</div>
        </div>
      </div>
      <SalonMap SalonData={SalonData ? SalonData : null} />
    </div>
  );
}

export const MemoizeSalonCard = memo(SalonCard);
