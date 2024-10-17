import { memo, useEffect, useState } from "react";
import styles from "./SalonMainPage.module.css";
import SalonServiceMain from "../SalonService/SalonService";
import BookingsPart from "../Bookings/BookingsPart";
import BillAndPaymentPart from "../BillAndPayment/BillAndPaymentPart";
import ReviewsPart from "../Reviews/ReviewsPart";
import { useParams } from "react-router-dom";
import { useSalonDetailsServices } from "../../../../../../services/superAdmin/Dashboard";
import LoadSpinner from "../../../../../LoadSpinner/LoadSpinner";
import ErrorComponent from "../../../../../ErrorComponent/ErrorComponent";
import NoDataDisplay from "../../../../../NodataToDisplay/NoDataDisplay";

export default function SalonMainPage({ addServices, addedServices }) {
  let [activeSalon, updateActiveSalon] = useState(1);
  let { id } = useParams();
  const { data, isLoading, isError, error } = useSalonDetailsServices(id);

  const updateActiveOption1 =()=>{
    updateActiveSalon(1);
  }
  const updateActiveOption2 =()=>{
    updateActiveSalon(2);
  }
  const updateActiveOption3 =()=>{
    updateActiveSalon(3);
  }
  const updateActiveOption4 =()=>{
    updateActiveSalon(4);
  }

  return (
    <div className={styles.salon_main}>
      <div className={styles.salon_options}>
        <ul>
          <a href="#" onClick={updateActiveOption1}>
            <li className={activeSalon === 1 ? styles.active_salon_option : ""}>
              Services
            </li>
          </a>
          <a href="#" onClick={updateActiveOption2}>
            <li className={activeSalon === 2 ? styles.active_salon_option : ""}>
              Bookings
            </li>
          </a>
          <a href="#" onClick={updateActiveOption3}>
            <li className={activeSalon === 3 ? styles.active_salon_option : ""}>
              Billing and payment
            </li>
          </a>
          <a href="#" onClick={updateActiveOption4}>
            <li className={activeSalon === 4 ? styles.active_salon_option : ""}>
              Reviews
            </li>
          </a>
        </ul>
      </div>
      {activeSalon === 1 && (
        <>
          {isLoading && <LoadSpinner />}

          {data &&
            !isLoading &&
            !isError &&
            data?.data?.services?.length > 0 &&
            data?.data?.services?.map((x, y) => (
              <SalonServiceMain
                key={y}
                data={x}
                addServices={addServices}
                addedServices={addedServices}
              />
            ))}
          {data &&
            !isLoading &&
            !isError &&
            data?.data?.services.length === 0 && <NoDataDisplay />}

          {isError && (
            <ErrorComponent message={error ? error.message : "Error"} />
          )}
        </>
      )}
      {activeSalon === 2 && <BookingsPart />}
      {activeSalon === 3 && <BillAndPaymentPart />}
      {activeSalon === 4 && <ReviewsPart />}
    </div>
  );
}

export const MemoizedSalonMainPage1 = memo(SalonMainPage);
