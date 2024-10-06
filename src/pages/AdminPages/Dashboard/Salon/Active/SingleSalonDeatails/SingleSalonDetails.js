import styles from "./SingleSalonDetails.module.css";
import star from "../../../../../../assets/images/SalonDetail/star_line.svg";
import ellipse from "../../../../../../assets/images/SalonDetail/Ellipse.svg";
import leftIco from "../../../../../../assets/images/AccountSettings/arrow-left.svg";
import { useNavigate, useParams } from "react-router-dom";
import SalonSlickSlider, {
  MemoizedSalonSlickSLider2,
} from "./SalonSlickSlider.jsx";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  calculateSalonDistance,
  displayDistance,
} from "../../../../../../utils/utils.js";
import { salon } from "../../../../../../services/salon.js";
import SalonMainPage, {
  MemoizedSalonMainPage1,
} from "../../../../../../components/AdminPage/AdminDashboard/Salon/SingleSalonDetails/SalonMainPage/SalonMainPage.jsx";
import { Link } from "react-router-dom";
import { updateAdminPage } from "../../../../../../redux/slices/AdminSlice.js";
import {
  adminToken,
  useSalonDetails,
} from "../../../../../../services/superAdmin/Dashboard.js";
import LoadSpinner from "../../../../../../components/LoadSpinner/LoadSpinner.js";
import ErrorComponent from "../../../../../../components/ErrorComponent/ErrorComponent.js";
import NoDataDisplay from "../../../../../../components/NodataToDisplay/NoDataDisplay.js";
import axiosInstance from "../../../../../../services/axios.js";
import { toast } from "react-toastify";
export default function SingleSalonDetail() {
  let [SalonDetails1, setSalonDetails1] = useState(null);
  let [addedServices, addServices] = useState([]);
  let { id } = useParams();
  let [firstImage, setFirstImage] = useState(null);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useSalonDetails(id);
  useEffect(() => {
    setSalonDetails1(data?.data[0]);
    setFirstImage(data?.data[0]?.salon_image[0]?.public_url);
    dispatch(updateAdminPage());
  }, [data]);

  const handleDeactivate = async () => {
    const headers = {
      token: localStorage.getItem("jwtToken"),
    };

    try {
      const { data } = await axiosInstance.patch(
        "super/salondeactivate",
        {
          ids: [id],
        },
        { headers }
      );

      if (data) {
        toast.success("Salon deactivated successfully");
        navigate("/admin/salon/active");
      }
    } catch (error) {
      console.error("Error deactivating salon:", error);
      toast.error(
        error?.response?.data?.message ||
          "An error occurred while deactivating the salon. Please try again."
      );
    }
  };

  return (
    <div className={styles.salon_page}>
      {data && !isLoading && !isError && (
        <div className={styles.salon_pcView}>
          <Link to={"/admin/salon/active"}>
            <div className={styles.back}>
              <img loading="lazy" src={leftIco} alt="" />
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
                {SalonDetails1?.salon_rating > 0 && (
                  <img loading="lazy" src={star} alt="" />
                )}
              </div>
              {SalonDetails1?.salon_total_rating > 0 && (
                <div>({SalonDetails1?.salon_total_rating || ""})</div>
              )}
              <img loading="lazy" src={ellipse} alt="" />
              <div>{SalonDetails1 ? SalonDetails1.salon_address : null}</div>
            </div>
          </div>

          <div className={styles.btnWrapper}>
            <button onClick={handleDeactivate}>Deactivate Salon</button>
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
              <MemoizedSalonSlickSLider2
                SalonData={SalonDetails1 ? SalonDetails1 : null}
              />
            </div>
            <div className={styles.salon_images_right}>
              {SalonDetails1?.salon_image?.slice(1, 4).map((v, i) => {
                return (
                  <img
                    loading="lazy"
                    src={v.public_url}
                    alt="salon image"
                    key={i}
                  />
                );
              })}
              {SalonDetails1?.salon_image?.length > 3 && (
                <Link
                  to={`/admin/salon/active/gallery/${id}`}
                  className={styles.salon_imagesA}
                >
                  <div className={styles.viewImage}>
                    <p>View {SalonDetails1?.salon_image?.length}</p>
                    <span>images</span>
                  </div>
                  <img
                    loading="lazy"
                    src={firstImage ? firstImage : null}
                    alt=""
                  />
                </Link>
              )}
            </div>
          </div>
        )}

      {SalonDetails1?.salon_image.length === 0 && <NoDataDisplay />}

      <div className={styles.salon_mobView}>
        <div className={styles.salon_name}>{SalonDetails1?.salon_name}</div>
        <div className={styles.salon_info}>
          <div className={styles.salon_star}>
            {SalonDetails1?.salon_rating > 0 ? SalonDetails1?.salon_rating : ""}{" "}
            {SalonDetails1?.salon_rating > 0 && (
              <img loading="lazy" src={star} alt="" />
            )}{" "}
            {SalonDetails1?.total_rating && (
              <div>({SalonDetails1?.total_rating || ""})</div>
            )}
          </div>
          <div className={styles.salon_infoA}>
            <p>{SalonDetails1 ? SalonDetails1.salon_address : null}</p>{" "}
            <p className={styles.viewBtn}>View map</p>
          </div>
        </div>
      </div>
      <div className={styles.salon_middle}>
        <MemoizedSalonMainPage1
          addServices={addServices}
          addedServices={addedServices}
        />
      </div>
    </div>
  );
}
