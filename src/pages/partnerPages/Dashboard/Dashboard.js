import React from "react";
import Header from "../../../components/Services/Dashboard/Header/Header";
import styles from "./Dashboard.module.css";
import SalesTrand from "../../../components/Services/Dashboard/SalesTrend/SalesTrand";
import RecentActivity from "../../../components/Services/Dashboard/RecentActivity/RecentActivity";
import Upcoming from "../../../components/Services/Dashboard/Upcoming/Upcoming";
import TopService from "../../../components/Services/Dashboard/TopService/TopService";
import TeamSales from "../../../components/Services/Dashboard/TeamSales/TeamSales";
const Dashboard = () => {
  return (
    <main className={styles.mainContainer}>
      <div className={styles.top}>
        <p>You have outstanding commissions. Pay now?</p>
        <button>Pay</button>
      </div>

      <Header />

      <section className={styles.container}>
        <div className={styles.salesTrandContainer}>
          <SalesTrand />
        </div>
        <div className={styles.salesTrandContainer}>
          <RecentActivity />
        </div>
      </section>
      <section className={styles.container}>
        <Upcoming />
      </section>
      <section className={styles.container}>
        <div className={styles.salesTrandContainer}>
          <TopService />
        </div>
        <div className={styles.salesTrandContainer}>
          <TeamSales />
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
