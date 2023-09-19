import React, { useRef, useState, useEffect } from "react";
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
import { ScrollRight, scrollright } from "../../../assets/images/icons";

export default function RecommendedSection({mainData}) {
  const rmdBoxRef = useRef(null);
  const trSalonBoxRef = useRef(null);

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

  const carouselRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const isRmdContentOverflowing = services.length > 7;

  // Check screen width and services length to hide right arrow
  const screenWidth = window.innerWidth;
  const hideRightArrow = screenWidth > 1400 && !isRmdContentOverflowing;

  const handleScroll = () => {
    const scrollLeft = carouselRef.current.scrollLeft;
    // setScrollPosition(scrollLeft);

    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(
      scrollLeft <
        carouselRef.current.scrollWidth - carouselRef.current.clientWidth
    );
  };

  const scrollLeft = () => {
    carouselRef?.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    carouselRef?.current.scrollBy({ left: 200, behavior: "smooth" });
  };
  useEffect(() => {
    carouselRef?.current.addEventListener("scroll", handleScroll);
    handleScroll(); // Call handleScroll initially to set initial arrow visibility
    return () => {
      carouselRef?.current?.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <section id="recommended" className={styles.container}>
      <div className={styles.recommended}>
        <h2 className={styles.rmdHeading}>Recommended for you</h2>
        <div className={styles.rmdWrapper}>
          {showLeftArrow && (
            <img src={scrollright} onClick={scrollLeft} alt="scrollleft" className={styles.scroll_left}/>
          )}
          <div className={styles.rmdBox} ref={carouselRef}>
            {services.map((service, index) => (
              <a key={index} className={styles.rmdItem}>
                <img src={service.icon} alt={service.title} />
                <h4>{service.title}</h4>
              </a>
            ))}
          </div>
          {showRightArrow && (
            <img src={scrollright} onClick={scrollRight} alt="scrollRight" className={styles.scroll_right} />
          )}
        </div>
      </div>
    </section>
  );
}
