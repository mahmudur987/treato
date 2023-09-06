import React, { useRef, useState, useEffect } from "react";
import styles from "./styles.module.css";
import scrollRight from "../../../assets/images/recommendImages/scrollRight.png";
import scrollRightBW from "../../../assets/images/recommendImages/scrollRightBW.png";
import star_line from "../../../assets/images/recommendImages/star_line.png";
import Picture from "../../../assets/images/recommendImages/Picture.png";
import Picture1 from "../../../assets/images/recommendImages/Picture1.png";
import Picture2 from "../../../assets/images/recommendImages/Picture2.png";
import Salon from "../../Cards/Salon/Salon";
import { salonContent } from "../../../pages/Salons/SalonsContent";
import { scrollright } from "../../../assets/images/icons";

const TopSalons = (props) => {
  const trSalonBoxRef = useRef(null);

  const handle_trScrollRight = () => {
    if (trSalonBoxRef.current) {
      trSalonBoxRef.current.scrollBy({
        left: 350, // Adjust the value as needed
        behavior: "smooth",
      });
    }
  };


  const carouselRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const isRmdContentOverflowing = salonContent.length > 4;

  // Check screen width and services length to hide right arrow
  const screenWidth = window.innerWidth;
  const hideRightArrow = screenWidth > 1200 && !isRmdContentOverflowing;

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
    <section className={styles["container"]}>
      <div className={styles["top-ratedSalons"]}>
        <div className={styles["trHeadWrapper"]}>
          <h3 className={styles["trHeading"]}>{props.heading}</h3>
        </div>

        <div  >
        {showLeftArrow && (
            <img src={scrollright} onClick={scrollLeft} alt="scrollleft" className={styles.scroll_left}/>
          )}
          <div ref={carouselRef} className={styles["trWrapper"]}>
          {salonContent.map((salon, index) => (
            <Salon salonData={salon} place={"homePage"} />
          ))}
          </div>
        {showRightArrow && (
            <img src={scrollright} onClick={scrollRight} alt="scrollRight" className={styles.scroll_right} />
          )}
        </div>
      </div>
    </section>
  );
};

export default TopSalons;
