import { useEffect, useState } from "react";
import styles from "./SalonMainPage.module.css";
import SalonServiceMain from "../SalonService/SalonService";
import BookingsPart from "../Bookings/BookingsPart";

export default function SalonMainPage({
  SalonData,
  addServices,
  addedServices,
}) {
  let [activeSalon, updateActiveSalon] = useState(1);

  return (
    <div className={styles.salon_main}>
      <div className={styles.salon_options}>
        <ul>
          <a onClick={() => updateActiveSalon(1)}>
            <li className={activeSalon === 1 ? styles.active_salon_option : ""}>
              Services
            </li>
          </a>
          <a onClick={() => updateActiveSalon(2)}>
            <li className={activeSalon === 2 ? styles.active_salon_option : ""}>
              Bookings
            </li>
          </a>
          <a onClick={() => updateActiveSalon(3)}>
            <li className={activeSalon === 3 ? styles.active_salon_option : ""}>
              Billing and payment
            </li>
          </a>
          <a onClick={() => updateActiveSalon(4)}>
            <li className={activeSalon === 4 ? styles.active_salon_option : ""}>
              Reviews
            </li>
          </a>
        </ul>
      </div>
      {activeSalon === 1 && (
        <SalonServiceMain
          SalonData={SalonData ? SalonData : null}
          addServices={addServices}
          addedServices={addedServices}
        />
      )}
      {activeSalon === 2 && <BookingsPart />}
    </div>
  );
}
