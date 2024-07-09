import React from "react";
import styles from "./partnerBanner.module.css";
import PartnerBannerImg from "../../../assets/images/PartnerBannerImg/partnerBannerImg.png";
import { Link } from "react-router-dom";

const PartnerBanner = ({ mainData }) => {
  let subHead = "";
  if (mainData) {
    subHead = mainData.partner_subheading.split(".");
  }

  return (
    <section className={styles["container"]} id="partnerSection">
      <div className={styles["bannerWrapper"]}>
        <div className={styles["bannerLeftSide"]}>
          <div className={styles["bannerDetails"]}>
            <h1>{mainData ? mainData.partner_heading : ""}</h1>
            <div>
              <p>{subHead[0]}.</p>
              <p>{subHead[1]}</p>
            </div>
            <Link to={"/partner"}>
              <button className={styles["learnMore"]}>Learn more</button>
            </Link>
          </div>
        </div>
        <div className={styles["bannerImage"]}>
          <img src={PartnerBannerImg} />
        </div>
      </div>
    </section>
  );
};

export default PartnerBanner;
