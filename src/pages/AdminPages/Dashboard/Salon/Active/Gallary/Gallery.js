import React, { useEffect, useState } from "react";
import styles from "./Gallery.module.css";
import { salon } from "../../../../../../services/salon";
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
const ActiveSalonGallery = () => {
  const [images, setImages] = useState([]);
  const [showMenu, setShowMenu] = useState("");
  const [showButton, setShowButton] = useState(false);

  let { id } = useParams();
  const { data, isLoading, isError, error, refetch } = useSalonImages(id);
  useEffect(() => {
    setImages(data?.data);
  }, [data]);

  const handleDelete = async (imageId) => {
    const deleteData = {
      salon_id: id,
      image_id: imageId,
    };
    console.log(deleteData);

    const headers = {
      token: adminToken,
    };

    try {
      const { data } = await axiosInstance.delete("super/salonimagedelete", {
        headers,
        data: deleteData, // Pass deleteData in the request body
      });

      if (data) {
        toast.success("Image deleted successfully");
        refetch();
      }
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error(
        error?.response?.data?.message ||
          "An error occurred while deleting the image. Please try again."
      );
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.header}>
        <Link to={`/admin/salon/active/${id}`}>
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
                <button type="button" onClick={() => handleDelete(x._id)}>
                  Delete
                </button>
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

export default ActiveSalonGallery;
