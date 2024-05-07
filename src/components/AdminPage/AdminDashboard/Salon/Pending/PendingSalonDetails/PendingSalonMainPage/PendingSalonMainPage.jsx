import { useState } from "react";
import styles from "./PendingSalonMainPage.module.css";
import SalonServiceMain from "../SalonService/SalonService";
import profileImg from "../../../../../../../assets/images/TeamDetails/ProfileImg.png";
export default function PendingSalonMainPage({
  SalonData,
  addServices,
  addedServices,
}) {
  let [activeSalon, updateActiveSalon] = useState(1);

  return (
    <div className={styles.salon_main}>
      <div className={styles.salon_options}>
        <ul>
          <a onClick={() => updateActiveSalon(1)}>
            <li className={activeSalon === 1 ? styles.active_salon_option : ""}>
              Services
            </li>
          </a>
          <a onClick={() => updateActiveSalon(2)}>
            <li className={activeSalon === 2 ? styles.active_salon_option : ""}>
              About
            </li>
          </a>

          <a onClick={() => updateActiveSalon(3)}>
            <li className={activeSalon === 3 ? styles.active_salon_option : ""}>
              Team
            </li>
          </a>
        </ul>
      </div>
      <SalonServiceMain
        SalonData={SalonData ? SalonData : null}
        addServices={addServices}
        addedServices={addedServices}
      />

      <div id="about" className={styles.about}>
        <h2 className={styles.salon_section_title_wrapper}>
          <span className={styles.salon_section_title}>About</span>
        </h2>
        <p>
          She Hair & Beauty is a luxurious hair spa nestled in the heart of
          Ejipura, Bengaluru. Step into a haven of relaxation and rejuvenation,
          where expert stylists and therapists pamper you with personalized
          treatments, from haircare to beauty services. Experience the perfect
          blend of modern techniques and traditional remedies at She Hair &
          Beauty. She Hair & Beauty is a luxurious hair spa nestled in the heart
          of Ejipura, Bengaluru. Step into a haven of relaxation and
          rejuvenation.
        </p>
      </div>

      <div className={styles.storeOpening}>
        <p>Monday - Saturday : 9:00AM - 9:00PM</p>
        <p>Sunday : 9:00AM - 5:30PM</p>
      </div>

      <div id="team" className={styles.about}>
        <h2 className={styles.salon_section_title_wrapper}>
          <span className={styles.salon_section_title}>Meet the team</span>
        </h2>
        <div className={styles.members}>
          <div className={styles.member}>
            <img src={profileImg} alt="" />
            <h4>Nayanica</h4>
            <p>Hair Styling Specialist</p>
          </div>
          <div className={styles.member}>
            <img src={profileImg} alt="" />
            <h4>Nayanica</h4>
            <p>Hair Styling Specialist</p>
          </div>
          <div className={styles.member}>
            <img src={profileImg} alt="" />
            <h4>Nayanica</h4>
            <p>Hair Styling Specialist</p>
          </div>
          <div className={styles.member}>
            <img src={profileImg} alt="" />
            <h4>Nayanica</h4>
            <p>Hair Styling Specialist</p>
          </div>
          <div className={styles.member}>
            <img src={profileImg} alt="" />
            <h4>Nayanica</h4>
            <p>Hair Styling Specialist</p>
          </div>
        </div>
      </div>
    </div>
  );
}
