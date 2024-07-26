import React from "react";
import styles from "./PartnerHero.module.css";

import img1 from "../../../assets/images/partner/computer.png";
import { Link } from "react-router-dom";

const PartnerHero = () => {
  return (
    <div className={styles.heroSection}>
      <div className={styles.sectionWrapper}>
        <div className={styles.content}>
          <div className={styles.textWrapper}>
            <div className={styles.text}>
              <h1>Grow your business at scale. With Treato.</h1>
              <p>
                Treato is an end-to-end software designed for salons and spas.
                Manage everything in one place, from scheduling to operations,
                customers, billing and more. For free!
              </p>

              <Link to={"/partner/authchoice"}>
                <button>TRY IT FOR FREE</button>
              </Link>
            </div>
          </div>
          <div className={styles.imageContainer}>
            <figure className={styles.imageWrapper}>
              <img src={img1} alt="Hero Image" />
            </figure>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerHero;
