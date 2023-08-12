import React, { useRef } from "react";
import styles from "./styles.module.css";
import hair from "../../../assets/images/recommendImages/hair.png";
import hairRemoval from "../../../assets/images/recommendImages/hairRemoval.png";
import fingernail from "../../../assets/images/recommendImages/fingernail.png";
import skincare from "../../../assets/images/recommendImages/skincare.png";
import scrollRight from "../../../assets/images/recommendImages/scrollRight.png";
import RecommendedSalons from "./RecommendedSalons";

export default function RecommendedSection() {
  const rmdBoxRef = useRef(null);
  const trSalonBoxRef = useRef(null);

  const handle_rmdScrollRight = () => {
    if (rmdBoxRef.current) {
      rmdBoxRef.current.scrollBy({
        left: 250, // Adjust the value as needed
        behavior: "smooth",
      });
    }
  };
  const handle_trScrollRight = () => {
    if (trSalonBoxRef.current) {
      trSalonBoxRef.current.scrollBy({
        left: 350, // Adjust the value as needed
        behavior: "smooth",
      });
    }
  };
  return (
    <div className={styles["container"]}>
      {/* Recommended for you */}
      <div className={styles["recommended"]}>
        <h2 className={styles["rmdHeading"]}>Recommended for you</h2>
        <div className={styles["rmdWrapper"]}>
          <div className={styles["rmdBox"]} ref={rmdBoxRef}>
            <a className={styles["rmdItem"]}>
              <img src={hair} />
              <h4>Hair</h4>
            </a>
            <a className={styles["rmdItem"]}>
              <img src={hairRemoval} />
              <h4>Hair removal</h4>
            </a>
            <a className={styles["rmdItem"]}>
              <img src={fingernail} />
              <h4>Nail care</h4>
            </a>
            <a className={styles["rmdItem"]}>
              <img src={skincare} />
              <h4>facial & skincare</h4>
            </a>
            <a className={styles["rmdItem"]}>
              <img src={hair} />
              <h4>Hair</h4>
            </a>
            <a className={styles["rmdItem"]}>
              <img src={hairRemoval} />
              <h4>Hair removal</h4>
            </a>
            <a className={styles["rmdItem"]}>
              <img src={fingernail} />
              <h4>Nail care</h4>
            </a>
            <a className={styles["rmdItem"]}>
              <img src={skincare} />
              <h4>facial & skincare</h4>
            </a>
            <a className={styles["rmdItem"]}>
              <img src={hair} />
              <h4>Hair</h4>
            </a>
            <a className={styles["rmdItem"]}>
              <img src={hairRemoval} />
              <h4>Hair removal</h4>
            </a>
            <a className={styles["rmdItem"]}>
              <img src={fingernail} />
              <h4>Nail care</h4>
            </a>
            <a className={styles["rmdItem"]}>
              <img src={skincare} />
              <h4>facial & skincare</h4>
            </a>
            <a className={styles["rmdItem"]}>
              <img src={hair} />
              <h4>Hair</h4>
            </a>
            <a className={styles["rmdItem"]}>
              <img src={hairRemoval} />
              <h4>Hair removal</h4>
            </a>
            <a className={styles["rmdItem"]}>
              <img src={fingernail} />
              <h4>Nail care</h4>
            </a>
            <a className={styles["rmdItem"]}>
              <img src={skincare} />
              <h4>facial & skincare</h4>
            </a>
          </div>

          {/* scroll arrow */}

          <img
            src={scrollRight}
            className={styles["scrollRight"]}
            onClick={handle_rmdScrollRight}
          />
        </div>
      </div>

      {/* Top-rated Hair Salons */}
      <RecommendedSalons heading={"Top-rated Hair Salons"} />
      {/* Partner with us */}
      {/* <RecommendedSalons heading={"Partner with us"} /> */}
    </div>
  );
}
