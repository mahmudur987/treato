import React, { memo } from "react";
import styles from "./AppDownloadInfo.module.css";
import {
  AppStore_black,
  AppleLogo,
  GoogleLogo,
  PlayStore_black,
} from "../../../assets/images/icons";
const AppDownloadInfo = ({ mainData }) => {
  return (
    <section className={styles["container"]} id="AppDownload">
      <div className={styles["bannerWrapper"]}>
        <div className={styles["bannerDetails"]}>
          <div className={styles.textWrapper}>
            <small>
              Available on <img loading="lazy" src={AppleLogo} />
              <img loading="lazy" src={GoogleLogo} />
            </small>
            <h1>{mainData ? mainData.downloadApp_heading : ""}</h1>
            <p className={styles.desc}>
              {mainData ? mainData.downloadApp_subheading : ""}
            </p>
            <div className={styles["socialLinks"]}>
              <a className={styles["Appstore"]}>
                <img loading="lazy" src={AppStore_black} alt="AppStore_black" />
              </a>
              <a className={styles["googlePlay"]}>
                <img
                  loading="lazy"
                  src={PlayStore_black}
                  alt="PlayStore_black"
                />
              </a>
            </div>
          </div>
        </div>
        <div className={styles["bannerImage"]}></div>
      </div>
    </section>
  );
};

export default AppDownloadInfo;
export const MemoizedAppDownloadInfo = memo(AppDownloadInfo);
