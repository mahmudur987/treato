import styles from "../SalonMain/SalonMain.module.css";
import discount_shape from "../../../assets/images/SalonDetail/discount-shape.svg";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function SalonOffers({
  isFromModal,
  offerData,
  handleOfferClick,
  selectedOffer,
}) {
  const selectedServices = useSelector(
    (state) => state?.salonServices?.salonContent
  );
  const [saveAmount, setSaveAmount] = useState(0);
  const [eligible, setEligible] = useState(false);
  useEffect(() => {
    let prices = selectedServices.map((v, i) => {
      return v.service_price;
    });
    let totalPrice = prices.reduce((a, b) => a + b, 0);

    if (totalPrice > offerData?.least_amount_for_discount) {
      setEligible(true);
    }

    const updatedAmount = (totalPrice * offerData.discount_percentage) / 100;

    setSaveAmount(updatedAmount);
  }, []);

  return (
    <>
      {isFromModal ? (
        <div
          className={styles.salon_offersModal}
          onClick={() => handleOfferClick(offerData)}
        >
          <div className={styles.salon_offersModalA}>
            <div className={styles.salon_offersAB}>
              <img loading="lazy" src={discount_shape} alt="" />
              <div>{offerData?.title} </div>
            </div>
            <div className={styles.salon_offersAC}>
              {offerData?.description}
            </div>
            {eligible && (
              <div className={styles.salon_offersAE}>
                Save ₹{saveAmount} on this order
              </div>
            )}
          </div>
          <div className={styles.salon_offersModalB}>
            <input
              type="radio"
              name="offers"
              id=""
              checked={selectedOffer?._id === offerData?._id}
            />
          </div>
        </div>
      ) : (
        <div
          className={styles.salon_offersAA}
          onClick={() => handleOfferClick(offerData)}
        >
          <div className={styles.salon_offersAB}>
            <img loading="lazy" src={discount_shape} alt="" />
            <div>{offerData?.title} </div>
          </div>
          <div className={styles.salon_offersAC}>{offerData?.description}</div>
        </div>
      )}
    </>
  );
}
