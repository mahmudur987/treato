import React, { useEffect, useState } from "react";
import styles from "./LookbookDetails.module.css";
import Img1 from "../../../assets/images/LookbookImages/Lookbook2.png";
import { arrowleft, star_line } from "../../../assets/images/icons";
import mask from "../../../assets/images/NavbarImages/Mask.png";
import PrimaryButton from "../../../components/Buttons/PrimaryButton/PrimaryButton";
import { getALookbook } from "../../../services/lookbook";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateLookbookData } from "../../../redux/slices/lookbook";

const LookbookDetails = () => {
  const [lookbook, setlookbook] = useState(null);
  const navigate=useNavigate()
  const dispatch = useDispatch();
  let { id } = useParams();
  const handleGoBack = () => {
    window.history.back(); // This will navigate back to the previous page in the browser's history
  };

  const handleAddService=()=>{
    let data={
      lookbookID:lookbook?._id,
      services:lookbook?.service,
      stylists:lookbook?.stylist
    }
    console.log(data,lookbook?.salon);
    dispatch(updateLookbookData(data))
    // TODO:temporary hard coded will be dynamic once we get salon id in api
    navigate(`/salons/65577b8e02c48c1d72b0604c`)
  }
  useEffect(() => {
    getALookbook(id).then((res) => {
      setlookbook(res?.res?.data?.data[0]);
      console.log(res?.res?.data?.data[0]);
    });
  }, []);

  return (
    <>
      {lookbook ? (
        <div className={styles.LookbookDetails}>
          <div className={styles.imageSection}>
            <div onClick={handleGoBack}>
              <img src={arrowleft} alt="backBtn" />
            </div>
            <h3>{lookbook?.name}</h3>
            <div className={styles.rating}>
              {lookbook?.rating} <img src={star_line} alt="starIcon" /> 
            </div>
            <p>{lookbook?.description}</p>
            <img
              src={lookbook?.photo?.public_url}
              alt="Image"
              className={styles.lookbookImage}
            />
          </div>
          <div className={styles.paymentContainer}>
            <div className={styles.paymentBox}>
              <div className={styles.salonInfo}>
                <h3>{lookbook?.salon[0]?.salon_name}</h3>
                <span>{lookbook?.locationText[0]}</span>
              </div>
              <hr className={styles.line} />
              <div className={styles.serviceWrap}>
                <div className={styles.serviceInfo}>
                  <div className={styles.serviceName}>
                    <h4>{lookbook?.serviceSubCategoryData?.service_name}</h4>
                    <small>
                      {lookbook?.serviceSubCategoryData?.time_takenby_service}
                    </small>
                  </div>
                  <span className={styles.serviceAmount}>
                    ₹{lookbook?.serviceSubCategoryData?.price}
                  </span>
                </div>
              </div>
              <hr className={styles.line} />

              <div className={styles.stylistInfo}>
                <img
                  src={mask}
                  alt="stylistImage"
                  className={styles.stylistImage}
                />
                <img
                  src={mask}
                  alt="stylistImage"
                  className={styles.stylistImageOffset1}
                />
                <img
                  src={mask}
                  alt="stylistImage"
                  className={styles.stylistImageOffset2}
                />
                <span> by </span> {lookbook?.stylist[0]?.stylist_name[0]}
                {lookbook?.stylist?.length > 1
                  ? `+${lookbook?.stylist?.length - 1}`
                  : ""}
                <span> at </span>
                <span className={styles.salonName}>
                  {lookbook?.salon[0]?.salon_name}
                </span>
              </div>
              <hr className={styles.line} />

              <button className={styles.addVenueBtn} onClick={handleAddService}>
                + Add another service from this venue
              </button>
              <PrimaryButton className={styles.bookNow}>Book now</PrimaryButton>
            </div>
            {/* Your payment box content goes here */}
          </div>
        </div>
      ) : (
        "null"
      )}
    </>
  );
};

export default LookbookDetails;
