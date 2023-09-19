import React, { useState } from "react";
import styles from "./hero.module.css";
import MainSearchBar from "../../Input/mainSearchBar/MainSearchBar";
import { AppStore_black, PlayStore_black } from "../../../assets/images/icons";

export default function HeroSection({mainData}) {
  let showData = ''
  if(mainData){
    showData = mainData.split(' ')
  }

  return (
    <div className={styles["container"]}>
      <h1 className={`${styles["heroHeading"]}`}>
        {showData[0]} <span className={styles["headingSpan"]}>{showData[1]}</span> {showData[2]}{' '}
        <span className={styles["headingSpan"]}>{showData[3]}</span> {showData[4]} {showData[5]} {showData[6]}
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
