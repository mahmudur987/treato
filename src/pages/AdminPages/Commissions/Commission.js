import React from "react";

import styles from "./Commissions.module.css";
import Header from "../../../components/AdminPage/AdminDashboard/Commisisons/Header/Header";
import CommissionHistory from "../../../components/AdminPage/AdminDashboard/Commisisons/CommissionHistory/CommissionHistory";

const Commission = () => {
  return (
    <main className={styles.mainContainer}>
      <Header />
      <CommissionHistory />
    </main>
  );
};

export default Commission;
