import { useState } from "react";
import styles from "../PendingSalonMainPage/PendingSalonMainPage.module.css";
import { CiStar } from "react-icons/ci";
import { FaPen } from "react-icons/fa";
import EditPriceModal from "../../../../../../_modals/AdminPage/EditPrice/EditPriceModal";
export default function SalonServiceCard({
  salonServiceData,
  serviceCategory,
  salonId,
}) {
  const [showModal, setShowModal] = useState(false);
const closeModal =()=>{
  setShowModal(false)
}
  return (
    <>
      <>
        {salonServiceData ? (
          <div className={styles.salon_serviceB}>
            <div className={styles.salon_serviceC}>
              <div className={styles.salon_serviceD}>
                {salonServiceData?.service_name}
              </div>
              <div className={styles.salon_serviceABC}>
                <button disabled>Add</button>
              </div>
            </div>
            <div className={styles.salon_serviceF}>
              <div>{salonServiceData?.time_takenby_service}</div>
            </div>
          </div>
        ) : null}
      </>
      <EditPriceModal
        showModal={showModal}
        onClose={closeModal}
      />
    </>
  );
}
