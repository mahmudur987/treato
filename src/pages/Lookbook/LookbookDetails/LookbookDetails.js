import React, { useEffect, useState } from "react";
import styles from "./LookbookDetails.module.css";
import { arrowleft } from "../../../assets/images/icons";
import greyStar from "../../../assets/images/icons/greyStar.svg"
import mask from "../../../assets/images/NavbarImages/Mask.png";
import PrimaryButton from "../../../components/Buttons/PrimaryButton/PrimaryButton";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GetSingleLook } from "../../../services/GetSingleLook";
import { GetLooks } from "../../../services/GetLooks";
import { useDispatch, useSelector } from 'react-redux';
import { addService } from '../../../redux/slices/salonServices';
const LookbookDetails = () => {
  let [lookData, setLookData] = useState(null);
  let [salonData, setSalonData] = useState(null);
  let [serviceData, setServiceData] = useState(null);
  let [salonId, setSalonId] = useState(null);

  const dispatch = useDispatch()
  const salonServices = useSelector(state => state.salonServices.salonContent);

  const id = useParams();
  let navigate = useNavigate();
  const handleGoBack = () => {
    window.history.back(); // This will navigate back to the previous page in the browser's history
  };
  useEffect(() => {
    let getLooks = async () => {
      const { res, err } = await GetSingleLook(id.id)
      if (res) {
        setLookData(res?.data?.data[0])
        setSalonData(res?.data?.data[0].salon[0])
        setServiceData(res?.data?.data[0].serviceSubCategoryData)
      }
    }
    getLooks();
  }, [])

  useEffect(() => {
    let getAllLooks = async () => {
      const { res, err } = await GetLooks()
      if (res) {
        let data = res?.data?.data.filter(v => v._id === lookData?._id)
        setSalonId(data[0]?.salon);
      }
    }
    getAllLooks();
  }, [lookData])

  let handleNavigation = () => {
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
    dispatch(addService(allServices));
    navigate(`/salons/${salonId}/book`);
  }

  return (
    <div className={styles.LookbookDetails}>
      {
        lookData ?
          <>
            <div className={styles.imageSection}>
              <div onClick={handleGoBack}><img src={arrowleft} alt="backBtn" className={styles.backBtn} /></div>
              <h3>{lookData?.name}</h3>
              <div className={styles.rating}>
                {lookData?.rating} <img src={greyStar} alt="starIcon" /> (61 rating)
              </div>
              <p>
                {lookData?.description}
              </p>
              <img src={lookData?.photo?.public_url} alt="Image" className={styles.lookbookImage} />
            </div>
            <div className={styles.paymentContainer}>
              <div className={styles.paymentBox}>
                <div className={styles.salonInfo}>
                  <h3>{salonData?.salon_name}</h3>
                  <span>{lookData?.locationText}</span>
                </div>
                <hr className={styles.line} />
                <div className={styles.serviceWrap}>
                  <div className={styles.serviceInfo}>
                    <div className={styles.serviceName}>
                      <h4>{serviceData?.service_name}</h4>
                      <small>{serviceData?.time_takenby_service}</small>
                    </div>
                    <span className={styles.serviceAmount}>₹{serviceData?.price}</span>
                  </div>
                </div>
                <hr className={styles.line} />

                <div className={styles.stylistInfo}>
                  {
                    lookData?.stylist.map((v, i) => {
                      return (
                        <img
                          src={mask}
                          alt="stylistImage"
                          className={styles.stylistImage}
                        />
                      )
                    })
                  }
                  {
                    lookData?.stylist[0] ?
                      <>
                        <span> by </span> {lookData?.stylist[0]?.stylist_name}{' '}+{' '}{lookData?.stylist.length - 1}
                      </>
                      :
                      null
                  }
                  {
                    salonId ?
                      <>
                        <span> at </span><Link to={`/salons/${salonId}`}><span className={styles.salonName}>{salonData?.salon_name}</span></Link>
                      </>
                      :
                      null
                  }
                </div>
                <hr className={styles.line} />

                <button className={styles.addVenueBtn}>
                  <span className={styles.plus}>+</span> Add another service from this venue
                </button>
                <PrimaryButton className={styles.bookNow} onClick={handleNavigation}>Book now</PrimaryButton>
              </div>
              {/* Your payment box content goes here */}
            </div>
          </>
          :
          null
      }
    </div>
  );
};

export default LookbookDetails;
