import React, { useEffect, useState } from "react";
import styles from "./LookbookDetails.module.css";
import PrimaryButton from "../../../components/Buttons/PrimaryButton/PrimaryButton";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GetSingleLook } from "../../../services/GetSingleLook";
import { GetLooks } from "../../../services/GetLooks";
import { useDispatch, useSelector } from "react-redux";
import { addService } from "../../../redux/slices/salonServices";
import LoadSpinner from "../../../components/LoadSpinner/LoadSpinner";
const LookbookDetails = () => {
  let [lookData, setLookData] = useState(null);
  let [allLookData, setAllLookData] = useState(null);
  let [salonData, setSalonData] = useState(null);
  let [serviceData, setServiceData] = useState(null);
  let [salonId, setSalonId] = useState(null);
  let [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const salonServices = useSelector(
    (state) => state.salonServices.salonContent
  );
  const id = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    let getLooks = async () => {
      const { res, err } = await GetSingleLook(id.id);
      if (res) {
        setLookData(res?.data?.data[0]);
        setSalonData(res?.data?.data[0].service[0]);
        setServiceData(res?.data?.data[0].serviceSubCategoryData);
      }
      setLoading(false);
    };
    getLooks();
  }, []);

  useEffect(() => {
    let getAllLooks = async () => {
      setLoading(true);
      const { res, err } = await GetLooks();
      if (res) {
        let data = res?.data?.data.filter((v) => v._id === lookData?._id);
        setSalonId(data[0]?.salon);
        setAllLookData(data);
        setLoading(false);
      }
    };
    getAllLooks();
  }, [lookData]);

  let handleNavigation = (step, stylistID) => {
    let services = {
      salon_id: salonId,
      service_category: lookData?.service[0]?.service_name,
      service_id: serviceData?._id,
      service_name: serviceData?.service_name,
      service_time: serviceData?.time_takenby_service,
      service_price: serviceData?.price,
      service_count: 1,
    };
    let allServices = [services];

    if (step === 1) {
      dispatch(addService(allServices));
      navigate(`/salons/${salonId}/book?step=1`);
    } else if (step === 2) {
      dispatch(addService(allServices));
      navigate(`/salons/${salonId}/book?step=2`);
    } else if (step === 3) {
      navigate(`/salons/${salonId}`);
    } else if (step === 4) {
      dispatch(addService(allServices));
      navigate(`/salons/${salonId}/book?step=2&stylist=${stylistID}`);
    }
  };

  return (
    <div className={styles.LookbookDetails}>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            minHeight: "100vh",
          }}
        >
          <LoadSpinner />
        </div>
      ) : lookData ? (
        <>
          <div className={styles.imageSection}>
            <h3>{lookData?.name}</h3>
            {/* <div className={styles.rating}>
              {lookData?.rating} <img loading="lazy" src={greyStar} alt="starIcon" />
            </div> */}
            <p>{lookData?.description}</p>
            <img
              loading="lazy"
              src={lookData?.photo?.public_url}
              alt="look"
              className={styles.lookbookImage}
            />
          </div>
          <div className={styles.paymentContainer}>
            <div className={styles.paymentBox}>
              <div className={styles.salonInfo}>
                <h3
                  onClick={() => handleNavigation(3)}
                  style={{ cursor: "pointer" }}
                >
                  {lookData?.salon?.salon_name}
                </h3>
                <span>{lookData?.locationText}</span>
              </div>
              <hr className={styles.line} />
              <div className={styles.serviceWrap}>
                {serviceData ? (
                  <div className={styles.serviceInfo}>
                    <div className={styles.serviceName}>
                      <h4>{serviceData?.service_name}</h4>
                      <small>{serviceData?.time_takenby_service}</small>
                    </div>
                    <span className={styles.serviceAmount}>
                      ₹{serviceData?.price}
                    </span>
                  </div>
                ) : (
                  "service N/A"
                )}
              </div>
              <hr className={styles.line} />
              <div className={styles.stylistInfo}>
                {lookData?.stylists?.slice(0, 3).map((v, i) => {
                  return (
                    <figure className={styles.stylistImageWrapper}>
                      <img
                        loading="lazy"
                        src={v?.stylist_Img?.public_url}
                        alt="stylistImage"
                        className={styles.stylistImage}
                      />
                    </figure>
                  );
                })}
                {lookData.stylists.slice(0, 1).map((v, i) => {
                  return (
                    <>
                      <span> by </span> {v.stylist_name}
                    </>
                  );
                })}
                {lookData?.stylists.length > 1 && (
                  <>+ {lookData?.stylists.length - 1} </>
                )}
                {salonId ? (
                  <>
                    <span> at </span>
                    <Link to={`/salons/${salonId}`}>
                      <span className={styles.salonName}>
                        {lookData?.salon?.salon_name}
                      </span>
                    </Link>
                  </>
                ) : null}
              </div>
              <hr className={styles.line} />

              <button
                className={styles.addVenueBtn}
                onClick={() => handleNavigation(1)}
              >
                <span className={styles.plus}>+</span> Add another service from
                this venue
              </button>
              <PrimaryButton
                className={styles.bookNow}
                onClick={() => {
                  if (lookData?.stylists?.length > 0) {
                    handleNavigation(4, lookData?.stylists[0]?._id);
                  } else {
                    handleNavigation(2);
                  }
                }}
              >
                Book now
              </PrimaryButton>
            </div>
            {/* Your payment box content goes here */}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default LookbookDetails;
