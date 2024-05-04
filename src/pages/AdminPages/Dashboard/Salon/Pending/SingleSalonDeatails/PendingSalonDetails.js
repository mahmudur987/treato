import styles from "./PendingSalonDetails.module.css";
import star from "../../../../../../assets/images/SalonDetail/star_line.svg";
import ellipse from "../../../../../../assets/images/SalonDetail/Ellipse.svg";
import leftIco from "../../../../../../assets/images/AccountSettings/arrow-left.svg";
import SalonSlickSlider from "./SalonSlickSlider.jsx";
import SalonGallery from "../../../../../../components/SalonDetail/SalonGallery/SalonGallery";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  calculateSalonDistance,
  displayDistance,
} from "../../../../../../utils/utils.js";
import { salon } from "../../../../../../services/salon.js";
import { resetSalonServicesState } from "../../../../../../redux/slices/salonServices.jsx";
import PendingSalonMainPage from "../../../../../../components/AdminPage/AdminDashboard/Salon/Pending/PendingSalonDetails/PendingSalonMainPage/PendingSalonMainPage.jsx";

export default function PendingSalonDetail() {
  let [showGallery, setShowGallery] = useState(false);
  let [salonImages, setSalonImages] = useState(null);
  let [SalonData, setSalonData] = useState(null);
  let [addedServices, addServices] = useState([]);
  let [totalSalonServices, setTotalSalonServices] = useState(0);
  let id = "655c6b4234b93dcd675e1740";
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
      <div className={styles.salon_pcView}>
        <div className={styles.back}>
          <img src={leftIco} alt="" />
        </div>

        <div className={styles.wrapper}>
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

        <div className={styles.btnWrapper}>
          <button className={styles.approve}>Approve</button>
          <button className={styles.reject}>Reject</button>
        </div>
      </div>
      <div className={styles.salon_images}>
        <div className={styles.salon_image_slider}>
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
          {/* <div className={styles.salon_infoB}>
            <div>Closed</div>
            <img src={ellipse} alt="" />
            <div>
              Opens {SalonData?.working_hours[0].opening_time}{" "}
              {SalonData?.working_hours[0].day}
            </div>
          </div> */}
        </div>
        <div className={styles.btnWrapper}>
          <button className={styles.approve}>Approve</button>
          <button className={styles.reject}>Reject</button>
        </div>
      </div>

      <div className={styles.ownerDetails}>
        <h4>Owner Details </h4>

        <div className={styles.details}>
          <p>
            Owner Name: <span>Vivek Sharma</span>
          </p>
          <p>
            Mobile Number: <span>+998586547145</span>
          </p>
          <p>
            Registration Date: <span>11 Nov 2023</span>
          </p>
        </div>
      </div>

      <div className={styles.salon_middle}>
        <PendingSalonMainPage
          SalonData={SalonData ? SalonData : null}
          addServices={addServices}
          addedServices={addedServices}
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
