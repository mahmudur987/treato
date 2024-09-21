import styles from "./SalonCard.module.css";
import star from "../../../assets/images/SalonDetail/star_line.svg";
import ellipse from "../../../assets/images/SalonDetail/Ellipse.svg";
import discount from "../../../assets/images/SalonDetail/discountIco.svg";
import clock from "../../../assets/images/SalonDetail/clock.svg";
import SalonMap from "../SalonMap/SalonMap";
import BookNow from "../BookNow/BookNow";
import { memo, useState } from "react";
import { useEffect } from "react";

export const SalonCard = ({ SalonData, salonId }) => {
  const currentTime = new Date().toLocaleTimeString();
  let [checkSalonOpen, setCheckSalonOpen] = useState(false);
  useEffect(() => {
    if (SalonData) {
      let salonTime = SalonData?.working_hours[0]?.closing_time.toLowerCase();
      if (currentTime < salonTime) {
        setCheckSalonOpen(true);
      }
    }
  }, [SalonData]);
  return (
    <div className={styles.salon_card}>
      <div className={styles.salon_cardA}>
        {SalonData ? SalonData.salon_name : null}
      </div>
      <div className={styles.salon_cardB}>
        <div>{SalonData ? SalonData.rating : null} </div>
        <img src={star} alt="" />
        <div>
          (based on {SalonData ? SalonData.total_rating : null} ratings)
        </div>
        <img src={ellipse} alt="" />
        <div>See reviews</div>
      </div>
      <div className={styles.salon_cardC}>
        <BookNow salonId={salonId ? salonId : null} />
      </div>
      <div className={styles.salon_cardD}>
        <img src={discount} alt="" />
        <div>
          Use code <span>BEAUTY100</span> during checkout and get 15% off up to
          ₹99. <span>T&C apply</span>
        </div>
      </div>
      <div className={styles.salon_cardD}>
        <img src={clock} alt="" />
        <div>
          <div className={styles.salon_cardDA}>
            <div>{checkSalonOpen ? "Open" : "Closed"}</div>
            <img src={ellipse} alt="" />
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
};

export const MemoizeSalonCard = memo(SalonCard);
