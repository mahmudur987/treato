import { useEffect, useState } from "react";
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
        <>
          {isLoading && <LoadSpinner />}

          {data &&
            !isLoading &&
            !isError &&
            data?.data?.services.length > 0 &&
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
