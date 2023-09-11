import React, { useRef, useState, useEffect } from "react";
// import styles"./Slider.module.css";
import styles from "./styles.module.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {
  Makeup,
  fingernail,
  hair,
  hairRemoval,
  massage,
  skincare,
  spa,
} from "../../../assets/images/recommendImages";

export default function RecommendedSection() {
  const rmdBoxRef = useRef(null);
  const trSalonBoxRef = useRef(null);
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 7,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 7,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 7,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 4,
    },
  };
  //  service objects
  const services = [
    { icon: hair, title: "Hair" },
    { icon: hairRemoval, title: "Hair removal" },
    { icon: fingernail, title: "Nail care" },
    { icon: skincare, title: "Facial & skincare" },
    { icon: Makeup, title: "Makeup" },
    { icon: massage, title: "massage" },
    { icon: spa, title: "spa" },
    { icon: skincare, title: "Facial & skincare" },
    { icon: hair, title: "Hair" },
    { icon: hairRemoval, title: "Hair removal" },
    { icon: fingernail, title: "Nail care" },
    { icon: skincare, title: "Facial & skincare" },
  ];
  const CustomDot = ({ onMove, index, onClick, active }) => {
    // onMove means if dragging or swiping in progress.
    // active is provided by this lib for checking if the item is active or not.
    return (
      <button className={`${styles.carouselDot} ${active ? styles.dotActive : ""}`} onClick={() => onClick()}></button>
    );
  };
  const CustomRight = ({ onClick }) => (
    <button className={styles.rightArrow} onClick={onClick} >
    </button>
  );
  const CustomLeft = ({ onClick }) => (
    <button className={styles.leftArrow} onClick={onClick}>
    </button>
  );
  return (
    <section id="recommended" className={styles.container}>
      <div className={styles.recommended}>
        <h2 className={styles.rmdHeading}>Recommended for you</h2>
        <Carousel
          responsive={responsive}
          customRightArrow={<CustomRight />}
          customLeftArrow={<CustomLeft />}
          showDots={true}
          removeArrowOnDeviceType={["mobile"]}
          dotListClass={styles["custom-dot-list-style"]}
          itemClass={styles["carousel-item-padding-40-px"]}
          className={styles.rmdWrapper}
          draggable={false}
          swipeable={false}
          renderDotsOutside
          customDot={<CustomDot />}
        >
          {services.map((service, index) => (
            <a key={index} className={styles.rmdItem}>
              <img src={service.icon} alt={service.title} />
              <h4>{service.title}</h4>
            </a>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
