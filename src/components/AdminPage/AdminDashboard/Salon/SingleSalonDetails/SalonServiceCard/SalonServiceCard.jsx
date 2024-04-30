import styles from "../SalonMainPage/SalonMainPage.module.css";
import { CiStar } from "react-icons/ci";
import { FaPen } from "react-icons/fa";
export default function SalonServiceCard({
  salonServiceData,
  serviceCategory,
  salonId,
}) {
  return (
    <>
      {salonServiceData ? (
        <div className={styles.salon_serviceB}>
          <div className={styles.salon_serviceC}>
            <div className={styles.salon_serviceD}>
              {salonServiceData?.service_name}
            </div>
            <div className={styles.salon_serviceABC}>
              <span className={styles.salon_serviceIcon}>
                <CiStar />
              </span>
              <span>₹{salonServiceData?.price}</span>

              <button>
                <FaPen />
              </button>
            </div>
          </div>
          <div className={styles.salon_serviceF}>
            <div>{salonServiceData?.time_takenby_service}</div>
          </div>
        </div>
      ) : null}
    </>
  );
}
