import React, { useEffect, useState } from "react";
import PrimaryButton from "../../Buttons/PrimaryButton/PrimaryButton";
import SalonOffers from "../../SalonDetail/SalonOffers/SalonOffers";
import styles from "./SalonDetailModal.module.css";
import { cross } from "../../../assets/images/icons";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAvailableOffers } from "../../../services/Appointments";
import {
  updateAmount,
  updateAppliedOffer,
  updateOfferAmount,
} from "../../../redux/slices/salonServices";
import { toast } from "react-toastify";
export default function SalonDetailModal({ setShowModal, setOfferCount }) {
  const userDetails = useSelector((state) => state.user?.user);
  const serviceDetails = useSelector((state) => state.salonServices);
  const [isError, setisError] = useState(false);
  const [selectedOffer, setselectedOffer] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [userOffers, setuserOffers] = useState(null);
  const selectedServices = useSelector(
    (state) => state?.salonServices?.salonContent
  );

  useEffect(() => {
    let getOfferData = {
      user_id: userDetails?._id,
      salons_id: id,
      totalAmount: parseFloat(serviceDetails?.Amount),
    };
    getAvailableOffers(getOfferData).then((res) => {
      setuserOffers(res?.res?.data?.data);
      setOfferCount(
        res?.res?.data?.data?.length ? res?.res?.data?.data?.length : 0
      );
    });
    if (id && userDetails?._id && serviceDetails?.Amount) {
    }
  }, [serviceDetails, userDetails]);

  const handleOfferClick = (Data) => {
    let prices = selectedServices.map((v, i) => {
      return v.service_price;
    });
    let totalPrice = prices.reduce((a, b) => a + b, 0);
    if (totalPrice > Data?.least_amount_for_discount) {
      dispatch(updateAppliedOffer(Data));
      setselectedOffer(Data);
      const saveAmount = (totalPrice * Data.discount_percentage) / 100;

      dispatch(
        updateOfferAmount(
          saveAmount < (Data?.max_discount ?? Infinity)
            ? saveAmount
            : saveAmount
        )
      );
    } else {
      return toast.error("You are not eligible for this offer");
    }
  };
  const handleApplyOffer = () => {
    if (selectedOffer !== null) {
      setShowModal(false);
    } else {
      setisError(true);
    }
  };

  const primaryShowModal = () => {
    if (setShowModal) {
      setShowModal(false);
      dispatch(updateAppliedOffer(null));
    }
  };
  const handleInline = () => {
    if (setShowModal) {
      setShowModal(false);
    }
  };

  return (
    <div className={styles.ModalMain}>
      <div className={styles.ModalMainA}>
        <div className={styles.ModalMainAA}>
          <div>Select Offers</div>
          <img loading="lazy" src={cross} alt="" onClick={handleInline} />
        </div>
        {isError && (
          <h3 className={styles.OfferError}>
            Please select an offer to proceed.
          </h3>
        )}
        <div className={styles.ModalMainB}>
          {userOffers && userOffers.length > 0 ? (
            userOffers?.map((e, i) => (
              <SalonOffers
                isFromModal={true}
                offerData={e}
                key={i}
                handleOfferClick={handleOfferClick}
                selectedOffer={selectedOffer}
              />
            ))
          ) : (
            <div className="zeroResponse">No offer available</div>
          )}
        </div>
        <div className={styles.ModalMainC}>
          <PrimaryButton
            children={"Cancel"}
            className={styles.bgWhite}
            onClick={primaryShowModal}
          />
          <PrimaryButton children={"Apply"} onClick={handleApplyOffer} />
        </div>
      </div>
    </div>
  );
}
