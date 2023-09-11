import React from "react";
import styles from "./partnerBanner.module.css";
import PartnerBannerImg from "../../../assets/images/PartnerBannerImg/partnerBannerImg.png";

const PartnerBanner = () => {
  return (
      <section className={styles["container"]} id="partnerSection">
        <div className={styles["bannerWrapper"]}>
            <div className={styles["bannerLeftSide"]}>
          <div className={styles["bannerDetails"]}>
            <h1>Partner with us</h1>
            <p>
              Grow your business for free with India’s fastest-growing beauty &
              wellness platform. <br />
              We promise to deliver more than you expect.
            </p>
            <button className={styles["learnMore"]}>Learn more</button>
          </div>
            </div>
          <div className={styles["bannerImage"]}>
            <img src={PartnerBannerImg}/>
          </div>
      
        </div>
      </section>
  );
};

export default PartnerBanner;
