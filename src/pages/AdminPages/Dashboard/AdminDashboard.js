import React from "react";
import styles from "./AdminDashboard.module.css";
import Header from "../../../components/AdminPage/AdminDashboard/Dashboard/Header/Header";
import PendingSalon from "../../../components/AdminPage/AdminDashboard/Dashboard/PendingSalon/PendingSalon";
import BillingHistory from "../../../components/AdminPage/AdminDashboard/Dashboard/BillingHistory/BillingHistory";
export const formatDate = (dateString) => {
  const originalDate = new Date(dateString);

  // Array of month names
  const monthNames = [
    "jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Get day, month, and year
  const day = originalDate.getDate();
  const month = monthNames[originalDate.getMonth()];
  const year = originalDate.getFullYear();

  const formattedDate = `${day} ${month} ${year}`;

  return formattedDate;
};
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
