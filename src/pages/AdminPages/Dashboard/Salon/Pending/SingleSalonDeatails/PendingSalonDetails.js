import styles from "./PendingSalonDetails.module.css";
import star from "../../../../../../assets/images/SalonDetail/star_line.svg";
import ellipse from "../../../../../../assets/images/SalonDetail/Ellipse.svg";
import leftIco from "../../../../../../assets/images/AccountSettings/arrow-left.svg";
import SalonSlickSlider, {
  MemoizedSalonSlickSLider3,
} from "./SalonSlickSlider.jsx";
import SalonGallery from "../../../../../../components/SalonDetail/SalonGallery/SalonGallery";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  calculateSalonDistance,
  displayDistance,
} from "../../../../../../utils/utils.js";
import { salon } from "../../../../../../services/salon.js";
import PendingSalonMainPage, {
  MemoizedPendingSalonMainPage,
} from "../../../../../../components/AdminPage/AdminDashboard/Salon/Pending/PendingSalonDetails/PendingSalonMainPage/PendingSalonMainPage.jsx";
import { Link, useNavigate, useParams } from "react-router-dom";
import { updateAdminPage } from "../../../../../../redux/slices/AdminSlice.js";
import {
  useSalonDetails,
  useSalonDetailsServices,
} from "../../../../../../services/superAdmin/Dashboard.js";
import LoadSpinner from "../../../../../../components/LoadSpinner/LoadSpinner.js";
import ErrorComponent from "../../../../../../components/ErrorComponent/ErrorComponent.js";
import NoDataDisplay from "../../../../../../components/NodataToDisplay/NoDataDisplay.js";
import axiosInstance from "../../../../../../services/axios.js";
import { toast } from "react-toastify";
export default function PendingSalonDetail() {
  const navigate = useNavigate();

  let [addedServices, addServices] = useState([]);
  let [SalonDetails1, setSalonDetails1] = useState(null);
  let { id } = useParams();
  const { data, isLoading, isError, error } = useSalonDetails(id);
  let [firstImage, setFirstImage] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setSalonDetails1(data?.data[0]);
    setFirstImage(data?.data[0]?.salon_image[0]?.public_url);
    dispatch(updateAdminPage());
  }, [data]);

  const handleApprove = async () => {
    try {
      const Data = {
        salon_ids: [id],
      };
      const headers = {
        token: localStorage.getItem("jwtToken"),
      };

      const { data } = await axiosInstance.patch(
        "super/salonapproveaction",
        Data,
        {
          headers,
        }
      );
      console.log(data);
      if (data) {
        toast.success("Salon Approved successfully!");

        navigate("/admin/salon/pending");
      }
    } catch (error) {
      console.error(error);
      toast.error(error ? error?.message : "Error");
    }
  };

  const handleReject = async () => {
    try {
      const Data = {
        salon_ids: [id],
      };
      const headers = {
        token: localStorage.getItem("jwtToken"),
      };

      const { data } = await axiosInstance.patch("", Data, {
        headers,
      });
      console.log(data);
      if (data) {
        toast.success("Salon Rejected successfully!");
        navigate("/admin/salon/pending");
      }
    } catch (error) {
      console.error(error);
      toast.error(error ? error?.message : "Error");
    }
  };

  return (
    <div className={styles.salon_page}>
      {data && !isLoading && !isError && (
        <div className={styles.salon_pcView}>
          <Link to={"/admin/salon/pending"}>
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
              {SalonDetails1?.total_rating && (
                <div>({SalonDetails1?.total_rating || ""})</div>
              )}
              <img loading="lazy" src={ellipse} alt="" />
              <div>{SalonDetails1 ? SalonDetails1.salon_address : null}</div>
            </div>
          </div>

          <div className={styles.btnWrapper}>
            <button className={styles.approve} onClick={handleApprove}>
              Approve
            </button>
            <button className={styles.reject} onClick={handleReject}>
              Reject
            </button>
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
              <MemoizedSalonSlickSLider3
                SalonData={SalonDetails1 ? SalonDetails1 : null}
              />
            </div>
            <div className={styles.salon_images_right}>
              {SalonDetails1?.salon_image?.slice(1, 4).map((v, i) => {
                return (
                  <img loading="lazy" src={v.public_url} alt="salon " key={i} />
                );
              })}
              {SalonDetails1?.salon_image?.length > 3 && (
                <Link
                  to={`/admin/salon/pending/galley/${id}`}
                  className={styles.salon_imagesA}
                >
                  <div>
                    <div>
                      View <span>{SalonDetails1?.salon_Img?.length}</span>
                    </div>
                    <div>images</div>
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
            <p style={{ color: "#0d69d7" }}>View map</p>
          </div>
        </div>
        <div className={styles.btnWrapper2}>
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
        <MemoizedPendingSalonMainPage
          addServices={addServices}
          addedServices={addedServices}
        />
      </div>
    </div>
  );
}
