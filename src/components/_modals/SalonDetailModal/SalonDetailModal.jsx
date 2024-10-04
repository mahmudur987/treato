import React, { useEffect, useState } from "react";
import PrimaryButton from "../../Buttons/PrimaryButton/PrimaryButton";
import SalonOffers from "../../SalonDetail/SalonOffers/SalonOffers";
import styles from "./SalonDetailModal.module.css";
import { cross } from "../../../assets/images/icons";
import { useParams } from "react-router-dom";
import { getSingleSalonData } from "../../../services/salon";
import { useDispatch, useSelector } from "react-redux";
import { getAvailableOffers } from "../../../services/Appointments";
import {
  updateAmount,
  updateAppliedOffer,
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

  useEffect(() => {
    let getOfferData = {
      user_id: userDetails?._id,
      salons_id: id,
      totalAmount: parseFloat(serviceDetails?.Amount),
    };
    getAvailableOffers(getOfferData).then((res) => {
      setuserOffers(res?.res?.data?.data);

      setOfferCount(res?.res?.data?.data ? res?.res?.data?.data : 0);
    });
    if (id && userDetails?._id && serviceDetails?.Amount) {
    }
  }, [serviceDetails, userDetails]);

  const handleOfferClick = (Data) => {
    dispatch(updateAppliedOffer(Data));
    setselectedOffer(Data);
  };
  const handleApplyOffer = () => {
    if (selectedOffer !== null && selectedOffer.amount_for_discount) {
      setShowModal(false);
    } else {
      setisError(true);
    }
  };
  console.log(userOffers);
  return (
    <div className={styles.ModalMain}>
      <div className={styles.ModalMainA}>
        <div className={styles.ModalMainAA}>
          <div>Select Offers</div>
          <img
            loading="lazy"
            src={cross}
            alt=""
            onClick={() => (setShowModal ? setShowModal(false) : "")}
          />
        </div>
        {isError && (
          <h3 className={styles.OfferError}>
            Please select an offer to proceed.
          </h3>
        )}
        <div className={styles.ModalMainB}>
          {userOffers ? (
            userOffers?.map((e, i) => (
              <SalonOffers
                isFromModal={true}
                offerData={e}
                key={i}
                handleOfferClick={handleOfferClick}
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
            onClick={() => {
              if (setShowModal) {
                setShowModal(false);
                dispatch(updateAppliedOffer(null));
              }
            }}
          />
          <PrimaryButton children={"Apply"} onClick={handleApplyOffer} />
        </div>
      </div>
    </div>
  );
}
