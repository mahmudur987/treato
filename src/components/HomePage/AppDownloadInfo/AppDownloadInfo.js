import React from 'react'
import styles from "./AppDownloadInfo.module.css";
import AppleLogo from "../../../assets/images/appDownloadImages/AppleBlack.png"
import GoogleLogo from "../../../assets/images/appDownloadImages/logo-google.png"
// import AppDownload_mobobg from "../../../assets/images/appDownloadImages/AppDownload_mobobg.png"
import Appstore from "../../../assets/images/AppStore.png"
import Playstore from "../../../assets/images/PlayStore.png"



const AppDownloadInfo = () => {
  return (
    <section className={styles['container']}>
        <div className={styles["bannerWrapper"]}>
            <div className={styles["bannerDetails"]}>
                <small>Available on <img src={AppleLogo}/><img src={GoogleLogo}/></small>
                <h1>Download the Treato app today</h1>
                <p>Get unforgettable beauty and wellness experiences at your fingertips with the Treato mobile app.</p>
            <div className={styles["socialLinks"]}>
                <a className={styles["Appstore"]}><img src={Appstore}/></a>
                <a className={styles["googlePlay"]}><img src={Playstore}/></a>
            </div >
            </div>
            <div className={styles["bannerImage"]}>
            </div>
        </div>
    </section>
  )
}

export default AppDownloadInfo