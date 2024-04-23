import React from "react";
import styles from "./AdminDashboard.module.css";
import Header from "../../../components/AdminPage/AdminDashboard/Dashboard/Header/Header";
import PendingSalon from "../../../components/AdminPage/AdminDashboard/Dashboard/PendingSalon/PendingSalon";
import BillingHistory from "../../../components/AdminPage/AdminDashboard/Dashboard/BillingHistory/BillingHistory";
const AdminDashboard = () => {
  return (
    <main className={styles.mainContainer}>
      <Header />
      <PendingSalon />
      <BillingHistory />
    </main>
  );
};

export default AdminDashboard;
