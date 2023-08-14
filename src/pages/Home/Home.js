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

export default function Home(props) {
  return (
    <div className={styles["container"]}>
      <HeroSection />
      <RecommendedSection />
      <TopSalons heading={"Top-rated Hair Salons"} />
      <LatestBlog />
      <AppDownloadInfo />
      <TopSalons heading={"Popular near you"} />
      <PartnerBanner />
      <Testimonials />
      <Contactus />
    </div>
  );
}
