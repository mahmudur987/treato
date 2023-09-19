import React from 'react'
import styles from "./AppDownloadInfo.module.css";
import { AppStore_black, AppleLogo, GoogleLogo, PlayStore_black } from '../../../assets/images/icons';
const AppDownloadInfo = () => {
  return (
    <section className={styles['container']}>
      <div className={styles["bannerWrapper"]}>
        <div className={styles["bannerDetails"]}>
          <div className={styles.textWrapper}>          
          <small>Available on <img src={AppleLogo} /><img src={GoogleLogo} /></small>
          <h1>Download the Treato app today</h1>
          <p className={styles.desc}>Get unforgettable beauty and wellness experiences at your fingertips with the Treato mobile app.</p>
          <div className={styles["socialLinks"]}>
            <a className={styles["Appstore"]}><img src={AppStore_black} alt="AppStore_black"/></a>
            <a className={styles["googlePlay"]}><img src={PlayStore_black} alt="PlayStore_black"/></a>
          </div >
          </div>
        </div>
        <div className={styles["bannerImage"]}>
        </div>
      </div>
    </section>
  )
}

export default AppDownloadInfo