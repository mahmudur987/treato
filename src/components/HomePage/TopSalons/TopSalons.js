import React, { useRef } from "react";
import styles from "./styles.module.css";
import scrollRight from "../../../assets/images/recommendImages/scrollRight.png";
import scrollRightBW from "../../../assets/images/recommendImages/scrollRightBW.png";
import star_line from "../../../assets/images/recommendImages/star_line.png";
import Picture from "../../../assets/images/recommendImages/Picture.png";
import Picture1 from "../../../assets/images/recommendImages/Picture1.png";
import Picture2 from "../../../assets/images/recommendImages/Picture2.png";
const TopSalons = (props) => {
    const trSalonBoxRef = useRef(null);
  //  salon objects 
    const salons = [
      {
        name: 'She Hair & Beauty',
        rating: '4.8',
        ratingsCount: '1361',
        location: 'Ejipura, Bengaluru',
        img: Picture,
      },
      {
        name: 'Geetanjali Beauty Salon',
        rating: '4.8',
        ratingsCount: '1361',
        location: 'Koramangala, Bengaluru',
        img: Picture1,
      },
      {
        name: 'Brush n Fye Hair Care Centre',
        rating: '4.8',
        ratingsCount: '1361',
        location: 'Ejipura, Bengaluru',
        img: Picture2,
      },
      {
        name: 'She Hair & Beauty',
        rating: '4.8',
        ratingsCount: '1361',
        location: 'Ejipura, Bengaluru',
        img: Picture,
      },
      {
        name: 'Geetanjali Beauty Salon',
        rating: '4.8',
        ratingsCount: '1361',
        location: 'Koramangala, Bengaluru',
        img: Picture1,
      },
      {
        name: 'Brush n Fye Hair Care Centre',
        rating: '4.8',
        ratingsCount: '1361',
        location: 'Ejipura, Bengaluru',
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
      {salons.map((salon, index) => (
        <div key={index} className={styles["trItem"]}>
          <img src={salon.img} className={styles["trItemImg"]} alt="Salon" />
          <div className={styles["trItemDetails"]}>
            <h4>{salon.name}</h4>
            <div className={styles["rating"]}>
              {salon.rating} <img src={star_line} alt="Star" /> ({salon.ratingsCount} ratings)
            </div>
            <small>{salon.location}</small>
          </div>
        </div>
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
