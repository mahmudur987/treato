import React from "react";
import Header from "../../../components/Services/Dashboard/Header/Header";
import styles from "./Dashboard.module.css";
import SalesTrand from "../../../components/Services/Dashboard/SalesTrend/SalesTrand";
const Dashboard = () => {
  return (
    <main className={styles.mainContainer}>
      <Header />

      <section className={styles.container}>
        <div className={styles.salesTrandContainer}>
          <SalesTrand />
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
