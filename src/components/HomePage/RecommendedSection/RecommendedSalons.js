import React, { useRef } from "react";
import styles from "./styles.module.css";
import scrollRight from "../../../assets/images/recommendImages/scrollRight.png";
import scrollRightBW from "../../../assets/images/recommendImages/scrollRightBW.png";
import star_line from "../../../assets/images/recommendImages/star_line.png";
import Picture from "../../../assets/images/recommendImages/Picture.png";
import Picture1 from "../../../assets/images/recommendImages/Picture1.png";
import Picture2 from "../../../assets/images/recommendImages/Picture2.png";
const RecommendedSalons = (props) => {
    const trSalonBoxRef = useRef(null);

    const handle_trScrollRight = () => {
        if (trSalonBoxRef.current) {
          trSalonBoxRef.current.scrollBy({
            left: 350, // Adjust the value as needed
            behavior: "smooth",
          });
        }
      };

  return (
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
        <div className={styles["trItem"]}>
          <img src={Picture} className={styles["trItemImg"]} />
          <div className={styles["trItemDetails"]}>
            <h4>She Hair & Beauty</h4>
            <div className={styles["rating"]}>
              4.8 <img src={star_line} /> (1361 ratings)
            </div>
            <small>Ejipura,Bengaluru</small>
          </div>
        </div>
        <div className={styles["trItem"]}>
          <img src={Picture1} className={styles["trItemImg"]} />
          <div className={styles["trItemDetails"]}>
            <h4>Geetanjali Beauty Salon</h4>
            <div className={styles["rating"]}>
              4.8 <img src={star_line} /> (1361 ratings)
            </div>
            <small>Koramangala, Bengaluru</small>
          </div>
        </div>
        <div className={styles["trItem"]}>
          <img src={Picture2} className={styles["trItemImg"]} />
          <div className={styles["trItemDetails"]}>
            <h4>Brush n Fye Hair Care Centre</h4>
            <div className={styles["rating"]}>
              4.8 <img src={star_line} /> (1361 ratings)
            </div>
            <small>Ejipura,Bengaluru</small>
          </div>
        </div>
        <div className={styles["trItem"]}>
          <img src={Picture} className={styles["trItemImg"]} />
          <div className={styles["trItemDetails"]}>
            <h4>She Hair & Beauty</h4>
            <div className={styles["rating"]}>
              4.8 <img src={star_line} /> (1361 ratings)
            </div>
            <small>Ejipura,Bengaluru</small>
          </div>
        </div>
        <div className={styles["trItem"]}>
          <img src={Picture1} className={styles["trItemImg"]} />
          <div className={styles["trItemDetails"]}>
            <h4>Geetanjali Beauty Salon</h4>
            <div className={styles["rating"]}>
              4.8 <img src={star_line} /> (1361 ratings)
            </div>
            <small>Koramangala, Bengaluru</small>
          </div>
        </div>
        <div className={styles["trItem"]}>
          <img src={Picture2} className={styles["trItemImg"]} />
          <div className={styles["trItemDetails"]}>
            <h4>Brush n Fye Hair Care Centre</h4>
            <div className={styles["rating"]}>
              4.8 <img src={star_line} /> (1361 ratings)
            </div>
            <small>Ejipura,Bengaluru</small>
          </div>
        </div>
      </div>
      <img
        src={scrollRightBW}
        className={styles["trScrollRight"]}
        onClick={handle_trScrollRight}
      />
    </div>
  );
};

export default RecommendedSalons;
