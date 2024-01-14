import styles from "./SalonDetail.module.css";
import star from "../../assets/images/SalonDetail/star_line.svg";
import ellipse from "../../assets/images/SalonDetail/Ellipse.svg";
import SalonMain from "../../components/SalonDetail/SalonMain/SalonMain";
import SalonCard from "../../components/SalonDetail/SalonCard/SalonCard";
import BackButton from "../../components/Buttons/BackButton/BackButton";
import BookNow from "../../components/SalonDetail/BookNow/BookNow";
import SalonSlickSlider from "./SalonSlickSlider";
import SalonGallery from "../../components/SalonDetail/SalonGallery/SalonGallery";
import { useState } from "react";
import { salon } from "../../services/salon";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { calculateSalonDistance, displayDistance } from "../../utils/utils.js";
import { resetSalonServicesState } from "../../redux/slices/salonServices.jsx";
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

  useEffect(() => {
    let SalonDataFunc = async () => {
      const { res, err } = await salon();
      if (res) {
        res?.data?.salons?.map((v) => {
          if (v?._id === id) {
            setSalonData(v);
            setTotalSalonServices(v?.services[0]?.mainCategories?.length);
            setFirstImage(v?.salon_Img[0]?.public_url);
            setSalonImages(v?.salon_Img);
          }
        });
      }
    };
    SalonDataFunc();
    dispatch(resetSalonServicesState());
  }, []);
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
            {SalonData ? SalonData.rating : null} <img src={star} alt="" />
          </div>
          <div>({SalonData ? SalonData.total_rating : null})</div>
          <img src={ellipse} alt="" />
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
          <SalonSlickSlider
            setShowGallery={setShowGallery}
            SalonData={SalonData ? SalonData : null}
          />
        </div>
        <div className={styles.salon_images_right}>
          {SalonData?.salon_Img?.map((v, i) => {
            if (i >= 1 && i <= SalonData?.salon_Img?.length) {
              return <img src={v.public_url} alt="salon image" key={i} />;
            }
          })}
          <div className={styles.salon_imagesA}>
            <div onClick={() => setShowGallery(true)}>
              <div>
                View <span>{SalonData?.salon_Img?.length}</span>
              </div>
              <div>images</div>
            </div>
            <img src={firstImage ? firstImage : null} alt="" />
          </div>
        </div>
      </div>
      <div className={styles.salon_mobView}>
        <div className={styles.salon_name}>{SalonData?.salon_name}</div>
        <div className={styles.salon_info}>
          <div className={styles.salon_star}>
            {SalonData?.salon_rating} <img src={star} alt="" /> (
            {SalonData?.total_rating} ratings)
          </div>
          <div className={styles.salon_infoA}>
            <div>{SalonData?.locationText} (570 m away)</div>
            <div>View map</div>
          </div>
          <div className={styles.salon_infoB}>
            <div>Closed</div>
            <img src={ellipse} alt="" />
            <div>
              Opens {SalonData?.working_hours[0].opening_time}{" "}
              {SalonData?.working_hours[0].day}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.salon_middle}>
        <SalonMain
          SalonData={SalonData ? SalonData : null}
          addServices={addServices}
          addedServices={addedServices}
        />
        <SalonCard
          SalonData={SalonData ? SalonData : null}
          addServices={addServices}
          addedServices={addedServices}
          salonId={id}
        />
      </div>
      <div className={styles.book_flowMob}>
        <BookNow
          SalonDetails={true}
          salonId={id}
          totalSalonServices={totalSalonServices}
        />
      </div>
      {showGallery ? (
        <SalonGallery gallery={salonImages} setShowGallery={setShowGallery} />
      ) : (
        ""
      )}
    </div>
  );
}