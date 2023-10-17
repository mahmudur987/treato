import React, { useRef, useState, useEffect } from "react";
import styles from "./styles.module.css";
import Salon from "../../Cards/Salon/Salon";
import { scrollright } from "../../../assets/images/icons";
import { salon } from "../../../services/salon";
import Title from "../../Typography/Title/Title";
import { useSelector } from "react-redux";

const TopSalons = (props) => {
  const salonsState = useSelector((state) => state.salons);
  let [topSalonData, setTopSalonData] = useState([]);

  useEffect(() => {
    if (props.heading === "Top-rated Hair Salons") {
      let filterResult = [...salonsState?.salonContent].sort(
        (a, b) => b.rating - a.rating
      );
      setTopSalonData(filterResult);
    } else if (props?.heading === "Popular near you") {
      let filterResult = [...salonsState?.salonContent]
        .filter((salon) => salon.distances < 200)
        .sort((a, b) => {
          const distanceA = a.unit === "km" ? a.distances * 1000 : a.distances;
          const distanceB = b.unit === "km" ? b.distances * 1000 : b.distances;
          return distanceA - distanceB;
        })
        .sort((a, b) => b.rating - a.rating);
      setTopSalonData(filterResult);
    }
  }, [salonsState]);
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

  const isRmdContentOverflowing = topSalonData.length > 4;

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
  let [winWidthMain, updateWinWidthMain] = useState(window.innerWidth);
  function reportWindowSize() {
    let winWidth = window.innerWidth;
    updateWinWidthMain(winWidth);
  }
  window.onresize = reportWindowSize;
  return (
    <section className={styles["container"]}>
      <div className={styles["top-ratedSalons"]}>
        <div className={styles["trHeadWrapper"]}>
          {winWidthMain <= 768 ? (
            <div className={styles["trMobHeading"]}>
              <h3>{props.heading}</h3>
              <img src={scrollright} className={styles.mobScrollRight} />
            </div>
          ) : (
            <Title>{props.heading}</Title>
          )}
        </div>

        <div>
          {showLeftArrow && (
            <img
              src={scrollright}
              onClick={scrollLeft}
              alt="scrollleft"
              className={styles.scroll_left}
            />
          )}
          <div ref={carouselRef} className={styles["trWrapper"]}>
            {topSalonData.length
              ? topSalonData.map((salon, index) => (
                  <Salon salonData={salon} place={"homePage"} key={index} />
                ))
              : ""}
          </div>
          <img
            src={scrollright}
            onClick={scrollRight}
            alt="scrollRight"
            className={styles.scroll_right}
          />
        </div>
      </div>
    </section>
  );
};

export default TopSalons;
