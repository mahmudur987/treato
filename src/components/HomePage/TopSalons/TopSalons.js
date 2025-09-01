import React, { useRef, useState, useEffect, memo } from "react";
import styles from "./styles.module.css";
import Salon from "../../Cards/Salon/Salon";
import { scrollright } from "../../../assets/images/icons";
import Title from "../../Typography/Title/Title";
import img1 from "../../../assets/images/LookbookImages/Lookbook1.webp";
import img2 from "../../../assets/images/LookbookImages/Lookbook2.webp";
import img3 from "../../../assets/images/LookbookImages/Lookbook3.webp";
import img4 from "../../../assets/images/LookbookImages/Lookbook4.webp";
import img5 from "../../../assets/images/LookbookImages/Lookbook5.webp";
import img6 from "../../../assets/images/LookbookImages/Lookbook6.webp";

// ✅ Dummy static salons data

const dummySalons = [
  {
    _id: "1",
    salon_name: "Luxury Hair Studio",
    rating: 4.8,
    total_rating: 120,
    distances: 1.2,
    location_details: { location: "Delhi" },
    salon_Img: [{ public_url: img1, isPrimary: true }],
    services: [
      { service_name: "Haircut", service_timing: "45 mins", price: 500 },
      { service_name: "Hair Color", service_timing: "60 mins", price: 1200 },
    ],
  },
  {
    _id: "2",
    salon_name: "Elegant Spa & Salon",
    rating: 4.5,
    total_rating: 90,
    distances: 2.5,
    location_details: { location: "Mumbai" },
    salon_Img: [{ public_url: img2, isPrimary: true }],
    services: [
      { service_name: "Facial", service_timing: "50 mins", price: 700 },
      { service_name: "Manicure", service_timing: "30 mins", price: 400 },
    ],
  },
  {
    _id: "3",
    salon_name: "Urban Cuts",
    rating: 4.2,
    total_rating: 70,
    distances: 0.9,
    location_details: { location: "Bangalore" },
    salon_Img: [{ public_url: img3, isPrimary: true }],
    services: [
      { service_name: "Pedicure", service_timing: "30 mins", price: 350 },
      { service_name: "Massage", service_timing: "60 mins", price: 1000 },
    ],
  },
  {
    _id: "3",
    salon_name: "Urban Cuts",
    rating: 4.2,
    total_rating: 70,
    distances: 0.9,
    location_details: { location: "Bangalore" },
    salon_Img: [{ public_url: img3, isPrimary: true }],
    services: [
      { service_name: "Pedicure", service_timing: "30 mins", price: 350 },
      { service_name: "Massage", service_timing: "60 mins", price: 1000 },
    ],
  },
  {
    _id: "3",
    salon_name: "Urban Cuts",
    rating: 4.2,
    total_rating: 70,
    distances: 0.9,
    location_details: { location: "Bangalore" },
    salon_Img: [{ public_url: img3, isPrimary: true }],
    services: [
      { service_name: "Pedicure", service_timing: "30 mins", price: 350 },
      { service_name: "Massage", service_timing: "60 mins", price: 1000 },
    ],
  },
  {
    _id: "3",
    salon_name: "Urban Cuts",
    rating: 4.2,
    total_rating: 70,
    distances: 0.9,
    location_details: { location: "Bangalore" },
    salon_Img: [{ public_url: img3, isPrimary: true }],
    services: [
      { service_name: "Pedicure", service_timing: "30 mins", price: 350 },
      { service_name: "Massage", service_timing: "60 mins", price: 1000 },
    ],
  },
];

const TopSalons = ({ heading }) => {
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const carouselRef = useRef(null);

  const handleScroll = () => {
    const scrollLeft = carouselRef.current.scrollLeft;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(
      scrollLeft <
        carouselRef.current.scrollWidth - carouselRef.current.clientWidth
    );
  };

  const scrollLeft = () =>
    carouselRef.current.scrollBy({ left: -200, behavior: "smooth" });
  const scrollRight = () =>
    carouselRef.current.scrollBy({ left: 200, behavior: "smooth" });

  useEffect(() => {
    carouselRef.current.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      carouselRef.current.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className={styles.container}>
      <div className={styles.topRatedSalons}>
        <div className={styles.trHeadWrapper}>
          <Title>{heading}</Title>
        </div>
        <div>
          {showLeftArrow && (
            <img
              src={scrollright}
              onClick={scrollLeft}
              alt="scrollLeft"
              className={styles.scroll_left}
            />
          )}

          <div ref={carouselRef} className={styles.trWrapper}>
            {dummySalons.map((salon) => (
              <Salon key={salon._id} salonData={salon} place="homePage" />
            ))}
          </div>

          {showRightArrow && (
            <img
              src={scrollright}
              onClick={scrollRight}
              alt="scrollRight"
              className={styles.scroll_right}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default TopSalons;
export const MemoizedTopSalons = memo(TopSalons);
