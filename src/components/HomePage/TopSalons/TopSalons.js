import React, { useRef } from "react";
import styles from "./styles.module.css";
import scrollRight from "../../../assets/images/recommendImages/scrollRight.png";
import scrollRightBW from "../../../assets/images/recommendImages/scrollRightBW.png";
import star_line from "../../../assets/images/recommendImages/star_line.png";
import Picture from "../../../assets/images/recommendImages/Picture.png";
import Picture1 from "../../../assets/images/recommendImages/Picture1.png";
import Picture2 from "../../../assets/images/recommendImages/Picture2.png";
import Salon from "../../Cards/Salon/Salon";
import { salonContent } from "../../../pages/Salons/SalonsContent";

const TopSalons = (props) => {
  const trSalonBoxRef = useRef(null);
  //  salon objects
  const salons = [
    {
      name: "She Hair & Beauty",
      rating: "4.8",
      ratingsCount: "1361",
      location: "Ejipura, Bengaluru",
      img: Picture,
    },
    {
      name: "Geetanjali Beauty Salon",
      rating: "4.8",
      ratingsCount: "1361",
      location: "Koramangala, Bengaluru",
      img: Picture1,
    },
    {
      name: "Brush n Fye Hair Care Centre",
      rating: "4.8",
      ratingsCount: "1361",
      location: "Ejipura, Bengaluru",
      img: Picture2,
    },
    {
      name: "She Hair & Beauty",
      rating: "4.8",
      ratingsCount: "1361",
      location: "Ejipura, Bengaluru",
      img: Picture,
    },
    {
      name: "Geetanjali Beauty Salon",
      rating: "4.8",
      ratingsCount: "1361",
      location: "Koramangala, Bengaluru",
      img: Picture1,
    },
    {
      name: "Brush n Fye Hair Care Centre",
      rating: "4.8",
      ratingsCount: "1361",
      location: "Ejipura, Bengaluru",
      img: Picture2,
    },
  ];

  const handle_trScrollRight = () => {
    if (trSalonBoxRef.current) {
      trSalonBoxRef.current.scrollBy({
        left: 350, // Adjust the value as needed
        behavior: "smooth",
      });
    }
  };

  return (
    <section className={styles["container"]}>
      <div className={styles["top-ratedSalons"]}>
        <div className={styles["trHeadWrapper"]}>
          <h3 className={styles["trHeading"]}>{props.heading}</h3>
          <img
            src={scrollRight}
            className={styles["trScrollRight_mobo"]}
            onClick={handle_trScrollRight}
          />
        </div>

        <div className={styles["trWrapper"]} ref={trSalonBoxRef}>
          {salonContent.map((salon, index) => (
            <Salon salonData={salon} place={"homePage"} />
          ))}
        </div>
        <img
          src={scrollRightBW}
          className={styles["trScrollRight"]}
          onClick={handle_trScrollRight}
        />
      </div>
    </section>
  );
};

export default TopSalons;
