import React, { memo } from "react";
import styles from "./styles.module.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {
  fingernail,
  Makeup,
  hair,
  hairRemoval,
  skincare,
  massage,
  spa,
} from "../../../assets/images/recommendImages";
import Title from "../../Typography/Title/Title";
import { Link } from "react-router-dom";

const RecommendedSection = () => {
  // ✅ Dummy static services (replace with backend later)
  const services = [
    { serviceName: "Haircut", serviceImg: { public_url: hair } },
    { serviceName: "Manicure", serviceImg: { public_url: fingernail } },
    { serviceName: "Hair Color", serviceImg: { public_url: Makeup } },
    { serviceName: "Facial", serviceImg: { public_url: skincare } },
    { serviceName: "Pedicure", serviceImg: { public_url: hairRemoval } },
    { serviceName: "Massage", serviceImg: { public_url: massage } },
    { serviceName: "Spa", serviceImg: { public_url: spa } },
  ];

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 7 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 5 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 3 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 3 },
  };

  const CustomDot = ({ onClick, active }) => (
    <button
      className={`${styles.carouselDot} ${active ? styles.dotActive : ""}`}
      onClick={onClick}
    />
  );

  const CustomRight = ({ onClick }) => (
    <button className={styles.rightArrow} onClick={onClick} />
  );

  const CustomLeft = ({ onClick }) => (
    <button className={styles.leftArrow} onClick={onClick} />
  );

  return (
    <section id="recommended" className={styles.container}>
      <div className={styles.recommended}>
        <Title>Recommended for you</Title>

        <Carousel
          responsive={responsive}
          customRightArrow={<CustomRight />}
          customLeftArrow={<CustomLeft />}
          showDots
          removeArrowOnDeviceType={["mobile"]}
          dotListClass={styles["custom-dot-list-style"]}
          className={styles.rmdWrapper}
          draggable={false}
          swipeable={false}
          renderDotsOutside
          customDot={<CustomDot />}
        >
          {services.map((service, index) => (
            <Link
              key={index}
              to={`/salons?service=${service.serviceName}`}
              className={styles.rmdItem}
            >
              <img
                loading="lazy"
                src={service.serviceImg.public_url}
                alt={service.serviceName}
              />
              <h4>{service.serviceName}</h4>
            </Link>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export const MemoizedRecommendedSection = memo(RecommendedSection);

export default RecommendedSection;
