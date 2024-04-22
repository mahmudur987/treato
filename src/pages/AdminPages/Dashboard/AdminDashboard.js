import React from "react";
import styles from "./AdminDashboard.module.css";
import Header from "../../../components/AdminPage/AdminDashboard/Dashboard/Header/Header";
import PendingSalon from "../../../components/AdminPage/AdminDashboard/Dashboard/PendingSalon/PendingSalon";
const AdminDashboard = () => {
  return (
    <main className={styles.mainContainer}>
      <Header />
      <PendingSalon />
    </main>
  );
};

export default AdminDashboard;
