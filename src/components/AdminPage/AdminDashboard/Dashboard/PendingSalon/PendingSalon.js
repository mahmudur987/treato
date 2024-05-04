import React from "react";
import styles from "./PendingSalon.module.css";
import img from "../../../../../assets/images/SalonDetail/slide4.png";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import Slider from "react-slick";
const PendingSalon = () => {
  const pendingSalonData = [
    {
      image: img,
      name: "Getanjali Salon",
      address: "Windmills Road ,Bengaluru",
      date: "12,Mar ,2024",
    },
    {
      image: img,
      name: "Getanjali Salon",
      address: "Windmills Road ,Bengaluru",
      date: "12,Mar ,2024",
    },
    {
      image: img,
      name: "Getanjali Salon",
      address: "Windmills Road ,Bengaluru",
      date: "12,Mar ,2024",
    },
    {
      image: img,
      name: "Getanjali Salon",
      address: "Windmills Road ,Bengaluru",
      date: "12,Mar ,2024",
    },
  ];
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          centerMode: true,
        },
      },
      {
        breakpoint: 780,
        settings: {
          slidesToShow: 2,
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
        <h2>Pending Salon (11)</h2>
        <Link to={"/admin/salon/pending"}>view all</Link>
      </div>

      <div className={styles.contents}>
        <Slider {...settings}>
          {pendingSalonData?.slice(0, 4).map((x, y) => (
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
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default PendingSalon;
