import styles from "../SalonMain/SalonMain.module.css";
import discount_shape from "../../../assets/images/SalonDetail/discount-shape.svg";

export default function SalonOffers({
  isFromModal,
  offerData,
  handleOfferClick,
  selectedOffer,
}) {
  console.log(offerData);
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
            <div className={styles.salon_offersAE}>
              Save ₹{offerData?.amount_for_discount} on this order
            </div>
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
