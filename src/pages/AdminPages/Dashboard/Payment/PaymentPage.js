import React, { useState } from "react";
import styles from "./PaymentPage.module.css";
import { IoArrowBack, IoSearchOutline } from "react-icons/io5";

import PaymentPageHeader from "../../../../components/AdminPage/AdminDashboard/payment/PaymentPageHeader/PaymentPageHeader";
import FilterSection from "../../../../components/AdminPage/AdminDashboard/payment/Payment/FilterSection/FilterSection";
import PaymentTable from "../../../../components/AdminPage/AdminDashboard/payment/Payment/PaymentTable/PaymentsTable";
import { Link } from "react-router-dom";
const PaymentStatus = ["Upcoming", "Pending", "Complete"];
const PaymentMode = ["On-site", "Online"];

const PaymentPage = () => {
  const [selectedPaymentStatus, setSelectedPaymentStatus] =
    useState("Payment Status");
  const [selectedPaymentMode, setSelectedPaymentMode] =
    useState("Payment Mode");

  const value = {
    selectedPaymentMode,
    setSelectedPaymentMode,
    selectedPaymentStatus,
    setSelectedPaymentStatus,
    PaymentMode,
    PaymentStatus,
  };
  return (
    <main className={styles.mainContainer}>
      <div className={styles.top}>
        <span>
          <Link to={"/admin"}>
            <IoArrowBack />
          </Link>
        </span>
        <h3>Payment</h3>
        <p>
          <IoSearchOutline />
        </p>
      </div>

      <PaymentPageHeader />
      <section className={styles.appointments}>
        <FilterSection value={value} />
        <PaymentTable />
      </section>
    </main>
  );
};

export default PaymentPage;
