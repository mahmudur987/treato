import React, { useEffect, useState } from "react";
import styles from "./PartnerHome.module.css";
import PartnerHero from "../../../components/partner/Banner/PartnerHero";
import FeaturesDetails from "../../../components/partner/Features_Details/FeaturesDetails";
import WhyTreato from "../../../components/partner/WhyTreato/WhyTreato";
import NoSubscription from "../../../components/partner/NoSubscription/NoSubscription";
import AppDownloadInfo, {
  MemoizedAppDownloadInfo,
} from "../../../components/HomePage/AppDownloadInfo/AppDownloadInfo";
import { HomePage } from "../../../services/HomePage";
import { Link } from "react-router-dom";
const PartnerHome = () => {
  let [homeData, setHomeData] = useState([]);
  useEffect(() => {
    let getHomeData = async () => {
      const { res, err } = await HomePage();
      if (res) {
        setHomeData(res.data.homepageCMS[0]);
      }
      if (err) {
        console.error(err);
      }
    };
    getHomeData();
  }, []);

  return (
    <main className={styles.container}>
      <PartnerHero />
      <FeaturesDetails />
      <section className={styles.action}>
        <div>
          <p>Interested in trying Treato for your business?</p>
          <Link to={"/partner/authchoice"}>
            <button>Try for free</button>
          </Link>
        </div>
      </section>
      <WhyTreato />
      <MemoizedAppDownloadInfo
        mainData={
          homeData.downloadApp_section ? homeData.downloadApp_section : ""
        }
      />

      <NoSubscription />
    </main>
  );
};

export default PartnerHome;
