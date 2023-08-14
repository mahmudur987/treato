import React, { useRef } from "react";
import styles from "./styles.module.css";
import hair from "../../../assets/images/recommendImages/hair.png";
import hairRemoval from "../../../assets/images/recommendImages/hairRemoval.png";
import fingernail from "../../../assets/images/recommendImages/fingernail.png";
import skincare from "../../../assets/images/recommendImages/skincare.png";
import scrollRight from "../../../assets/images/recommendImages/scrollRight.png";

export default function RecommendedSection() {
  const rmdBoxRef = useRef(null);
  const trSalonBoxRef = useRef(null);

  //  service objects 
  const services = [
    { icon: hair, title: 'Hair' },
    { icon: hairRemoval, title: 'Hair removal' },
    { icon: fingernail, title: 'Nail care' },
    { icon: skincare, title: 'Facial & skincare' },
    { icon: hair, title: 'Hair' },
    { icon: hairRemoval, title: 'Hair removal' },
    { icon: fingernail, title: 'Nail care' },
    { icon: skincare, title: 'Facial & skincare' },
    { icon: hair, title: 'Hair' },
    { icon: hairRemoval, title: 'Hair removal' },
    { icon: fingernail, title: 'Nail care' },
    { icon: skincare, title: 'Facial & skincare' },
  ];

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
    <section id="#recommended" className={styles["container"]}>
      {/* Recommended for you */}
      <div className={styles["recommended"]}>
        <h2 className={styles["rmdHeading"]}>Recommended for you</h2>
        <div className={styles["rmdWrapper"]}>
          <div className={styles["rmdBox"]} ref={rmdBoxRef}>
            {services.map((service, index) => (
              <a key={index} className={styles["rmdItem"]}>
                <img src={service.icon} alt={service.title} />
                <h4>{service.title}</h4>
              </a>
            ))}
          </div>
          {/* scroll arrow */}

          <img
            src={scrollRight}
            className={styles["scrollRight"]}
            onClick={handle_rmdScrollRight}
          />
        </div>
      </div>

    </section>
  );
}
