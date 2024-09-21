import React, { useEffect, useState } from "react";
import styles from "./Gallery.module.css";
import LoadSpinner from "../../../../../../components/LoadSpinner/LoadSpinner";
import ErrorComponent from "../../../../../../components/ErrorComponent/ErrorComponent";
import leftIco from "../../../../../../assets/images/AccountSettings/arrow-left.svg";
import { Link, useParams } from "react-router-dom";
import { BsThreeDotsVertical } from "@react-icons/all-files/bs/BsThreeDotsVertical";
import {
  adminToken,
  useSalonImages,
} from "../../../../../../services/superAdmin/Dashboard";
import NoDataDisplay from "../../../../../../components/NodataToDisplay/NoDataDisplay";
import axiosInstance from "../../../../../../services/axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateAdminPage } from "../../../../../../redux/slices/AdminSlice";
const PendingSalonGallery = () => {
  const [images, setImages] = useState([]);
  const [showMenu, setShowMenu] = useState("");
  const [showButton, setShowButton] = useState(false);
  const dispatch = useDispatch();
  let { id } = useParams();
  const { data, isLoading, isError, error, refetch } = useSalonImages(id);
  useEffect(() => {
    setImages(data?.data);
    dispatch(updateAdminPage());
  }, [data]);

  const handleDelete = async (x) => {
    const deleteData = {
      salon_id: id,
      image_id: x,
    };
    console.log(deleteData);
    try {
      const headers = {
        token: adminToken,
      };

      const { data } = await axiosInstance.delete(
        "super/salonimagedelete",
        { headers },
        deleteData
      );
      if (data) {
        toast.success("Image  Delete Successfully");
      }

      refetch();
    } catch (error) {
      console.error("error", error);
      toast.error(error ? error.message : "Error");
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.header}>
        <Link to={`/admin/salon/pending/${id}`}>
          <div className={styles.back}>
            <img loading="lazy" src={leftIco} alt="" />
          </div>
        </Link>
        <h2>Pictures</h2>
      </div>
      {isLoading && <LoadSpinner />}
      {data && !isLoading && !isError && images?.length > 0 && (
        <div className={styles.container}>
          {images?.map((x, i) => (
            <figure
              className={styles.image}
              onMouseEnter={() => setShowMenu(x._id)}
              onMouseLeave={() => {
                setShowMenu("");
                setShowButton(false);
              }}
            >
              <img loading="lazy" src={x.public_url} alt="" />
              {x._id === showMenu && (
                <span onClick={() => setShowButton(!showButton)}>
                  <BsThreeDotsVertical />
                </span>
              )}
              {x._id === showMenu && showButton && (
                <button onClick={() => handleDelete(x._id)}>Delete</button>
              )}
            </figure>
          ))}
        </div>
      )}

      {images?.length === 0 && <NoDataDisplay />}

      {isError && <ErrorComponent message={error ? error.message : "Error"} />}
    </div>
  );
};

export default PendingSalonGallery;
