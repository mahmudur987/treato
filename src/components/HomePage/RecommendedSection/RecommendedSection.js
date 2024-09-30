import React, { useState, useEffect, memo } from "react";
// import styles"./Slider.module.css";
import styles from "./styles.module.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { fingernail } from "../../../assets/images/recommendImages";
import Title from "../../Typography/Title/Title";
import { useGetServices } from "../../../services/Services";
import LoadSpinner from "../../LoadSpinner/LoadSpinner";

export default function RecommendedSection() {
  const { data, isLoading } = useGetServices();
  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 7 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 5 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 3 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 3 },
  };

  const CustomDot = ({ onMove, index, onClick, active }) => {
    return (
      <button
        className={`${styles.carouselDot} ${active ? styles.dotActive : ""}`}
        onClick={() => onClick()}
      ></button>
    );
  };
  const CustomRight = ({ onClick }) => (
    <button className={styles.rightArrow} onClick={onClick}></button>
  );
  const CustomLeft = ({ onClick }) => (
    <button className={styles.leftArrow} onClick={onClick}></button>
  );

  return (
    <section id="recommended" className={styles.container}>
      <div className={styles.recommended}>
        <Title>Recommended for you</Title>
        {data && !isLoading && (
          <Carousel
            responsive={responsive}
            customRightArrow={<CustomRight />}
            customLeftArrow={<CustomLeft />}
            showDots={true}
            removeArrowOnDeviceType={["mobile"]}
            dotListClass={styles["custom-dot-list-style"]}
            className={styles.rmdWrapper}
            draggable={false}
            swipeable={false}
            renderDotsOutside
            customDot={<CustomDot />}
          >
            {data?.data?.map((service, index) => (
              <a key={index} href="#" className={styles.rmdItem}>
                <img
                  loading="lazy"
                  src={service?.serviceImg?.public_url ?? fingernail}
                  alt={service.serviceName}
                />
                <h4>{service.serviceName}</h4>
              </a>
            ))}
          </Carousel>
        )}

        {isLoading && <LoadSpinner />}
      </div>
    </section>
  );
}

export const MemoizedRecommendedSection = memo(RecommendedSection);
