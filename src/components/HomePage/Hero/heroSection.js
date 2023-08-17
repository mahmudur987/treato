import React, { useState } from "react";
import styles from "./hero.module.css";
import MainSearchBar from "../../Input/mainSearchBar/MainSearchBar";
import { AppStore_black, PlayStore_black } from "../../../assets/images/icons";

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
          <img src={AppStore_black} alt="AppStoreImg" />
        </a>
        <a>
          <img src={PlayStore_black} alt="PlayStoreImg" />
        </a>
      </div>
    </div>
  );
}
