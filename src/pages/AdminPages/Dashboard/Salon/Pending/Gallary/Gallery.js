import React, { useEffect, useState } from "react";
import styles from "./Gallery.module.css";
import { salon } from "../../../../../../services/salon";
import LoadSpinner from "../../../../../../components/LoadSpinner/LoadSpinner";
import ErrorComponent from "../../../../../../components/ErrorComponent/ErrorComponent";
import leftIco from "../../../../../../assets/images/AccountSettings/arrow-left.svg";
import { Link, useParams } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useSalonDetailsServices } from "../../../../../../services/superAdmin/Dashboard";
import NoDataDisplay from "../../../../../../components/NodataToDisplay/NoDataDisplay";
const PendingSalonGallery = () => {
  const [images, setImages] = useState([]);
  const [showMenu, setShowMenu] = useState("");
  const [showButton, setShowButton] = useState(false);

  let { id } = useParams();
  const { data, isLoading, isError, error } = useSalonDetailsServices(id);
  useEffect(() => {
    setImages(data?.data?.salon_Img);
  }, [data]);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.header}>
        <Link to={`/admin/salon/pending/${id}`}>
          <div className={styles.back}>
            <img src={leftIco} alt="" />
          </div>
        </Link>
        <h2>Pictures</h2>
      </div>
      {isLoading && <LoadSpinner />}
      {data && !isLoading && !isError && images.length > 0 && (
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
              <img src={x.public_url} alt="" />
              {x._id === showMenu && (
                <span onClick={() => setShowButton(!showButton)}>
                  <BsThreeDotsVertical />
                </span>
              )}
              {x._id === showMenu && showButton && <button>Delete</button>}
            </figure>
          ))}
        </div>
      )}

      {images.length === 0 && <NoDataDisplay />}

      {isError && <ErrorComponent message={error ? error.message : "Error"} />}
    </div>
  );
};

export default PendingSalonGallery;
