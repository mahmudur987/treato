import styles from "./SalonDetail.module.css";
import star from "../../assets/images/SalonDetail/star_line.svg";
import ellipse from "../../assets/images/SalonDetail/Ellipse.svg";
import { MemoizeSalonMain } from "../../components/SalonDetail/SalonMain/SalonMain";
import SalonMain from "../../components/SalonDetail/SalonMain/SalonMain";
import { MemoizeSalonCard } from "../../components/SalonDetail/SalonCard/SalonCard";
import BackButton from "../../components/Buttons/BackButton/BackButton";
import { MemoizeBookNow } from "../../components/SalonDetail/BookNow/BookNow";
import { MemoizeSalonSlickSlider } from "./SalonSlickSlider";
import { MemoizeSalonGallery } from "../../components/SalonDetail/SalonGallery/SalonGallery";
import { useState } from "react";
import { salon, useGetSalonByID } from "../../services/salon";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { calculateSalonDistance, displayDistance } from "../../utils/utils.js";
import { resetSalonServicesState } from "../../redux/slices/salonServices.jsx";
import LoadSpinner from "../../components/LoadSpinner/LoadSpinner.js";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent.js";
export default function SalonDetail() {
  let [showGallery, setShowGallery] = useState(false);
  let [salonImages, setSalonImages] = useState(null);
  let [SalonData, setSalonData] = useState(null);
  let [addedServices, addServices] = useState([]);
  let [totalSalonServices, setTotalSalonServices] = useState(0);
  let { id } = useParams();
  const dispatch = useDispatch();
  let [firstImage, setFirstImage] = useState(null);
  const userDetails = useSelector((state) => state?.user?.user);
  const { data, isLoading, isError, error } = useGetSalonByID(id);

  useEffect(() => {
    let v = data?.salon;
    setSalonData(v);
    setTotalSalonServices(v?.services[0]?.mainCategories?.length);
    setFirstImage(v?.salon_Img[0]?.public_url);
    setSalonImages(v?.salon_Img);
    dispatch(resetSalonServicesState());
  }, [data]);

  if (isLoading) {
    return (
      <div
        
        className={styles.loaderBox}
      >
        <LoadSpinner />
      </div>
    );
  }
  if (isError) {
    return <ErrorComponent message={error ? error.message : ""} />;
  }
  return (
    <div
      className={
        showGallery
          ? `${styles.salon_page} ${styles.overHidden}`
          : styles.salon_page
      }
    >
      <BackButton />
      <div className={styles.salon_pcView}>
        <div className={styles.salon_name}>
          {SalonData ? SalonData.salon_name : null}
        </div>
        <div className={styles.salon_info}>
          <div className={styles.salon_star}>
            {SalonData ? SalonData.rating : null} <img loading="lazy" src={star} alt="" />
          </div>
          <div>({SalonData ? SalonData.total_rating : null})</div>
          <img loading="lazy" src={ellipse} alt="" />
          <div>
            {SalonData ? SalonData.locationText : null} (
            {displayDistance(
              calculateSalonDistance(
                SalonData?.location?.coordinates[0],
                SalonData?.location?.coordinates[1],
                userDetails?.latitude,
                userDetails?.longitude
              )
            )}{" "}
            away)
          </div>
        </div>
      </div>
      <div className={styles.salon_images}>
        <div className={`${styles.salon_image_slider} salon_slick`}>
          <MemoizeSalonSlickSlider
            setShowGallery={setShowGallery}
            SalonData={SalonData ? SalonData : null}
          />
        </div>
        <div className={styles.salon_images_right}>
          {SalonData?.salon_Img?.slice(0, 4).map((v, i) => {
            if (i >= 1 && i <= SalonData?.salon_Img?.length) {
              return <img loading="lazy" src={v.public_url} alt="salon image" key={i} />;
            }
          })}
          <div className={styles.salon_imagesA}>
            <div onClick={() => setShowGallery(true)}>
              <div>
                View <span>{SalonData?.salon_Img?.length}</span>
              </div>
              <div>images</div>
            </div>
            <img loading="lazy" src={firstImage ? firstImage : null} alt="" />
          </div>
        </div>
      </div>
      <div className={styles.salon_mobView}>
        <div className={styles.salon_name}>{SalonData?.salon_name}</div>
        <div className={styles.salon_info}>
          <div className={styles.salon_star}>
            {SalonData?.salon_rating} <img loading="lazy" src={star} alt="" /> (
            {SalonData?.total_rating} ratings)
          </div>
          <div className={styles.salon_infoA}>
            <div>{SalonData?.locationText} (570 m away)</div>
            <div>View map</div>
          </div>
          <div className={styles.salon_infoB}>
            <div>Closed</div>
            <img loading="lazy" src={ellipse} alt="" />
            <div>
              Opens {SalonData?.working_hours[0]?.opening_time}{" "}
              {SalonData?.working_hours[0]?.day}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.salon_middle}>
        <SalonMain
          SalonData={SalonData}
          addServices={addServices}
          addedServices={addedServices}
        />
        <MemoizeSalonCard
          SalonData={SalonData ? SalonData : null}
          addServices={addServices}
          addedServices={addedServices}
          salonId={id}
        />
      </div>
      <div className={styles.book_flowMob}>
        <MemoizeBookNow
          SalonDetails={true}
          salonId={id}
          totalSalonServices={totalSalonServices}
        />
      </div>
      {showGallery ? (
        <MemoizeSalonGallery
          gallery={salonImages}
          setShowGallery={setShowGallery}
        />
      ) : (
        ""
      )}
    </div>
  );
}
