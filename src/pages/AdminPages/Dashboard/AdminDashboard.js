import React from "react";
import styles from "./AdminDashboard.module.css";
import Header from "../../../components/AdminPage/AdminDashboard/Dashboard/Header/Header";
const AdminDashboard = () => {
  return (
    <main className={styles.mainContainer}>
      <Header />
    </main>
  );
};

export default AdminDashboard;
