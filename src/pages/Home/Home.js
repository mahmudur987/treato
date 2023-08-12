import React from "react";
import styles from "./home.module.css";
import HeroSection from "../../components/HomePage/Hero/heroSection";
import RecommendedSection from "../../components/HomePage/RecommendedSection/RecommendedSection";
import AppDownloadInfo from "../../components/HomePage/AppDownloadInfo/AppDownloadInfo";
import TopSalons from "../../components/HomePage/TopSalons/TopSalons";
import PartnerBanner from "../../components/HomePage/PartnerBanner/PartnerBanner";
import Testimonials from "../../components/HomePage/Testimonials/Testimonials";

export default function Home(props) {
  return (
    <div className={styles["container"]}>
      <HeroSection />
      <RecommendedSection />
      <TopSalons heading={"Top-rated Hair Salons"} />

      <AppDownloadInfo />
      <TopSalons heading={"Popular near you"} />
      <PartnerBanner/>
      <Testimonials/>
    </div>
  );
}
