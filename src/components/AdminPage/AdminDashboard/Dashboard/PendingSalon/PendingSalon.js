import React from "react";
import styles from "./PendingSalon.module.css";
import img from "../../../../../assets/images/SalonDetail/slide4.png";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import Slider from "react-slick";
import { usePendingSalons } from "../../../../../services/superAdmin/Dashboard";
import { formatDate } from "../../../../../pages/AdminPages/Dashboard/AdminDashboard";
import ErrorComponent from "../../../../ErrorComponent/ErrorComponent";
import LoadSpinner from "../../../../LoadSpinner/LoadSpinner";
import NoDataDisplay from "../../../../NodataToDisplay/NoDataDisplay";
const PendingSalon = () => {
  const { data, isLoading, isError, error } = usePendingSalons("");
  const pendingSalonData = data?.pendingSalons?.map((x) => {
    const data = {
      id: x._id,
      image: x?.salon_image?.public_url ?? img,
      name: x.salon_name ?? "N/A",
      address: x.salons_address ?? "N/A",
      date: formatDate(x.created) ?? "N/A",
    };
    return data;
  });

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow:
      data?.pendingSalons?.length < 4 ? data?.pendingSalons?.length : 4,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow:
            data?.pendingSalons?.length < 3 ? data?.pendingSalons?.length : 3,
          slidesToScroll: 1,
          centerMode: true,
        },
      },
      {
        breakpoint: 780,
        settings: {
          slidesToShow:
            data?.pendingSalons?.length < 2 ? data?.pendingSalons?.length : 2,
          slidesToScroll: 1,
          centerMode: true,
        },
      },
      {
        breakpoint: 513,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <section className={styles.mainContainer}>
      <div className={styles.top}>
        <h2>
          Pending Salon Approvals (
          {pendingSalonData.length > 0 ? pendingSalonData?.length : ""}){" "}
        </h2>
        <Link to={"/admin/salon/pending"}>view all</Link>
      </div>
      {isLoading && <LoadSpinner />}
      {data && !isLoading && !isError && data?.pendingSalons?.length > 0 && (
        <div className={styles.contents}>
          <Slider {...settings}>
            {pendingSalonData?.slice(0, 4)?.map((x, y) => (
              <Link to={`/admin/salon/pending/${x.id}`}>
                <div key={y}>
                  <div className={styles.cardWrapper}>
                    <div className={styles.card}>
                      <figure>
                        <img src={x.image} alt="" />
                      </figure>

                      <div className={styles.cardBottom}>
                        <div className={styles.info}>
                          <h3>{x.name}</h3>
                          <p className={styles.address}>{x.address}</p>
                          <p className={styles.date}>Applied on {x.date}</p>
                        </div>
                        <div className={styles.cardAction}>
                          <button className={styles.approve}>Approve</button>
                          <button className={styles.reject}>Reject</button>
                        </div>
                        <div className={styles.rightIcon}>
                          <FaArrowRight />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </Slider>
        </div>
      )}
      {data && !isLoading && !isError && pendingSalonData.length === 0 && (
        <div className={styles.contents}>
          <NoDataDisplay message={"No Pending Salons Are Available"} />
        </div>
      )}
      {isError && <ErrorComponent message={error ? error.message : "Error"} />}
    </section>
  );
};

export default PendingSalon;
