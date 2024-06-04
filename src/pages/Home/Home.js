import React from "react";
import styles from "./home.module.css";
import HeroSection from "../../components/HomePage/Hero/heroSection";
import RecommendedSection from "../../components/HomePage/RecommendedSection/RecommendedSection";
import AppDownloadInfo from "../../components/HomePage/AppDownloadInfo/AppDownloadInfo";
import TopSalons from "../../components/HomePage/TopSalons/TopSalons";
import PartnerBanner from "../../components/HomePage/PartnerBanner/PartnerBanner";
import Testimonials from "../../components/HomePage/Testimonials/Testimonials";
import Contactus from "../../components/HomePage/Contactus/Contactus";
import LatestBlog from "../../components/HomePage/LatestBlog/LatestBlog";
import { HomePage } from "../../services/HomePage";
import { useState,useEffect } from "react";


export default function Home(props) {
  let [homeData,setHomeData] = useState([])
  useEffect(() => {
    let getHomeData = async () => {
      const { res, err } = await HomePage()
      if(res){
      setHomeData(res.data.homepageCMS[0])
      }
    }
    getHomeData();
  }, [])

  return (<>
    <div className={styles["container"]}>
      <HeroSection mainData={homeData.main_heading?homeData.main_heading:''}/>
      <RecommendedSection mainData={homeData.recommended_section?homeData.recommended_section:''}/>
      <TopSalons heading={"Top-rated Hair Salons"} />
      <LatestBlog />
      <AppDownloadInfo mainData={homeData.downloadApp_section?homeData.downloadApp_section:''}/>
      <TopSalons heading={"Popular near you"} fromPopular={true}/>
      <PartnerBanner mainData={homeData.partner_section?homeData.partner_section:''}/>
      <Testimonials />
    </div>
  </>
  );
}
