import React from "react";
import styles from "./home.module.css";
import HeroSection, {
  MemoizedHeroSection,
} from "../../components/HomePage/Hero/heroSection";
import RecommendedSection, {
  MemoizedRecommendedSection,
} from "../../components/HomePage/RecommendedSection/RecommendedSection";
import AppDownloadInfo, {
  MemoizedAppDownloadInfo,
} from "../../components/HomePage/AppDownloadInfo/AppDownloadInfo";
import TopSalons, {
  MemoizedTopSalons,
} from "../../components/HomePage/TopSalons/TopSalons";
import PartnerBanner, {
  MemoizedPartnerBanner,
} from "../../components/HomePage/PartnerBanner/PartnerBanner";
import Testimonials from "../../components/HomePage/Testimonials/Testimonials";
import Contactus from "../../components/HomePage/Contactus/Contactus";
import LatestBlog from "../../components/HomePage/LatestBlog/LatestBlog";
import { HomePage } from "../../services/HomePage";
import { useState, useEffect } from "react";
import ContactUs from "../../components/HomePage/Contactus/Contactus";
import { toast } from "react-toastify";

export default function Home(props) {
  let [homeData, setHomeData] = useState([]);
  useEffect(() => {
    let getHomeData = async () => {
      const { res, err } = await HomePage();
      if (res) {
        setHomeData(res.data.homepageCMS[0]);
      }
      if (err) {
        toast.error("Error");
      }
    };
    getHomeData();
  }, []);

  return (
    <>
      <div className={styles["container"]}>
        <MemoizedHeroSection
          mainData={homeData.main_heading ? homeData.main_heading : ""}
        />
        <MemoizedRecommendedSection
          mainData={
            homeData.recommended_section ? homeData.recommended_section : ""
          }
        />
        <MemoizedTopSalons heading={"Top-rated Hair Salons"} />
        <LatestBlog />
        <MemoizedAppDownloadInfo
          mainData={
            homeData.downloadApp_section ? homeData.downloadApp_section : ""
          }
        />
        <MemoizedTopSalons heading={"Popular near you"} fromPopular={true} />
        <MemoizedPartnerBanner
          mainData={homeData.partner_section ? homeData.partner_section : ""}
        />

        <Testimonials />
      </div>
    </>
  );
}
