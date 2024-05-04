import React, { useEffect, useState } from "react";
import styles from "./Gallery.module.css";
import { salon } from "../../../../../../services/salon";
import LoadSpinner from "../../../../../../components/LoadSpinner/LoadSpinner";
import ErrorComponent from "../../../../../../components/ErrorComponent/ErrorComponent";
import leftIco from "../../../../../../assets/images/AccountSettings/arrow-left.svg";
import { Link } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
const PendingSalonGallery = () => {
  let [isLoading, setIsLoading] = useState(null);
  const [images, setImages] = useState([]);

  const [showMenu, setShowMenu] = useState("");
  const [showButton, setShowButton] = useState(false);

  let id = "655c6b4234b93dcd675e1740";
  useEffect(() => {
    setIsLoading(true);
    let SalonDataFunc = async () => {
      const { res, err } = await salon();
      if (res) {
        res?.data?.salons?.map((v) => {
          if (v?._id === id) {
            setImages(v.salon_Img);
            setIsLoading(false);
          }
        });
      }
    };
    SalonDataFunc();
  }, []);
  if (isLoading) {
    return <LoadSpinner />;
  }
  return (
    <div className={styles.mainContainer}>
      <div className={styles.header}>
        <Link to={"/admin/salon/pending/1"}>
          <div className={styles.back}>
            <img src={leftIco} alt="" />
          </div>
        </Link>
        <h2>Pictures</h2>
      </div>

      {images && images.length > 0 ? (
        <>
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
        </>
      ) : (
        <>
          <ErrorComponent message={"Error"} />
        </>
      )}
    </div>
  );
};

export default PendingSalonGallery;
