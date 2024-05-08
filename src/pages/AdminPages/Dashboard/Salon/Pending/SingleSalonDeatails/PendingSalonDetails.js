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
import PendingSalonMainPage from "../../../../../../components/AdminPage/AdminDashboard/Salon/Pending/PendingSalonDetails/PendingSalonMainPage/PendingSalonMainPage.jsx";
import { Link, useParams } from "react-router-dom";
import { updateAdminPage } from "../../../../../../redux/slices/AdminSlice.js";
import { useSalonDetails } from "../../../../../../services/superAdmin/Dashboard.js";
import LoadSpinner from "../../../../../../components/LoadSpinner/LoadSpinner.js";
import ErrorComponent from "../../../../../../components/ErrorComponent/ErrorComponent.js";
import NoDataDisplay from "../../../../../../components/NodataToDisplay/NoDataDisplay.js";
export default function PendingSalonDetail() {
  let [SalonData, setSalonData] = useState(null);
  let [addedServices, addServices] = useState([]);
  let [SalonDetails1, setSalonDetails1] = useState(null);
  let { id } = useParams();
  let [firstImage, setFirstImage] = useState(null);
  const userDetails = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  useEffect(() => {
    let SalonDataFunc = async () => {
      const { res, err } = await salon();
      if (res) {
        res?.data?.salons?.map((v) => {
          if (v?._id === "655c6b4234b93dcd675e1740") {
            setSalonData(v);
            setFirstImage(v?.salon_Img[0]?.public_url);
            dispatch(updateAdminPage());
          }
        });
      }
    };
    SalonDataFunc();
  }, []);

  const { data, isLoading, isError, error } = useSalonDetails(id);

  useEffect(() => {
    setSalonDetails1(data?.data[0]);
    setFirstImage(data?.data[0]?.salon_image[0]?.public_url);
  }, [data]);
  console.log(SalonDetails1);
  return (
    <div className={styles.salon_page}>
      {data && !isLoading && !isError && (
        <div className={styles.salon_pcView}>
          <Link to={"/admin/salon/active"}>
            <div className={styles.back}>
              <img src={leftIco} alt="" />
            </div>
          </Link>
          <div className={styles.wrapper}>
            <div className={styles.salon_name}>
              {SalonDetails1 ? SalonDetails1.salon_name : null}
            </div>
            <div className={styles.salon_info}>
              <div className={styles.salon_star}>
                {SalonDetails1?.salon_rating > 0
                  ? SalonDetails1?.salon_rating
                  : ""}{" "}
                {SalonDetails1?.salon_rating > 0 && <img src={star} alt="" />}
              </div>
              {SalonDetails1?.total_rating && (
                <div>({SalonDetails1?.total_rating || ""})</div>
              )}
              <img src={ellipse} alt="" />
              <div>{SalonDetails1 ? SalonDetails1.salon_address : null}</div>
            </div>
          </div>

          <div className={styles.btnWrapper}>
            <button className={styles.approve}>Approve</button>
            <button className={styles.reject}>Reject</button>
          </div>
        </div>
      )}

      {isLoading && <LoadSpinner />}
      {isError && <ErrorComponent message={error ? error.message : "Error"} />}
      {data &&
        !isLoading &&
        !isError &&
        SalonDetails1?.salon_image.length > 0 && (
          <div className={styles.salon_images}>
            <div className={styles.salon_image_slider}>
              <SalonSlickSlider
                SalonData={SalonDetails1 ? SalonDetails1 : null}
              />
            </div>
            <div className={styles.salon_images_right}>
              {SalonDetails1?.salon_image?.slice(1, 4).map((v, i) => {
                return <img src={v.public_url} alt="salon image" key={i} />;
              })}
              {SalonDetails1?.salon_image?.length > 3 && (
                <Link
                  to={"/admin/salon/active/gallery/1"}
                  className={styles.salon_imagesA}
                >
                  <div>
                    <div>
                      View <span>{SalonDetails1?.salon_Img?.length}</span>
                    </div>
                    <div>images</div>
                  </div>
                  <img src={firstImage ? firstImage : null} alt="" />
                </Link>
              )}
            </div>
          </div>
        )}

      {SalonDetails1?.salon_image.length === 0 && <NoDataDisplay />}
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
    </div>
  );
}
