import React, { useState } from "react";
import styles from "./hero.module.css";
import AppStoreImg from "../../../assets/images/HeroSectionImages/AppStore.png";
import PlayStoreImg from "../../../assets/images/HeroSectionImages/PlayStore.png";
import searchImg from "../../../assets/images/HeroSectionImages/search.png";
import mapPinImg from "../../../assets/images/HeroSectionImages/mapPin.png";
import closeButton from "../../../assets/images/HeroSectionImages/x-circle.png";
import LocationModal_Mobo from "./Search_MoboModal/Search_MoboModal";
import Locations from "./SearchContent/Locations";
import Treatments from "./SearchContent/Treatments";
import Venues from "./SearchContent/Venues";
import MainSearchBar from "../../Input/mainSearchBar/MainSearchBar";

export default function HeroSection(props) {
 
  return (
    <div className={styles["container"]}>
      <h1 className={`${styles["heroHeading"]}`}>
        Book <span className={styles["headingSpan"]}>beauty</span> and{" "}
        <span className={styles["headingSpan"]}>wellness</span> services near
        you
      </h1>
      <MainSearchBar place={"heroPage"}/>

      <div className={styles["storeLinks"]}>
        <a>
          <img src={AppStoreImg} alt="AppStoreImg" />
        </a>
        <a>
          <img src={PlayStoreImg} alt="PlayStoreImg" />
        </a>
      </div>
    </div>
  );
}
