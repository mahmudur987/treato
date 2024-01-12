import React from "react";
import styles from "./PartnerHome.module.css";
import PartnerHero from "../../../components/partner/Banner/PartnerHero";
import FeaturesDetails from "../../../components/partner/Features_Details/FeaturesDetails";
import WhyTreato from "../../../components/partner/WhyTreato/WhyTreato";
import NoSubscription from "../../../components/partner/NoSubscription/NoSubscription";
const PartnerHome = () => {
  return (
    <main className={styles.container}>
      <PartnerHero />
      <FeaturesDetails />
      <WhyTreato />
      <NoSubscription />
    </main>
  );
};

export default PartnerHome;
