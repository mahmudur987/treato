import React from "react";
import styles from "./PaymentPage.module.css";
import { IoArrowBack, IoSearchOutline } from "react-icons/io5";

import PaymentPageHeader from "../../../../components/AdminPage/AdminDashboard/payment/PaymentPageHeader/PaymentPageHeader";
import FilterSection from "../../../../components/AdminPage/AdminDashboard/payment/Payment/FilterSection/FilterSection";
import PaymentTable from "../../../../components/AdminPage/AdminDashboard/payment/Payment/PaymentTable/PaymentsTable";

const PaymentPage = () => {
  return (
    <main className={styles.mainContainer}>
      <div className={styles.top}>
        <span>
          <IoArrowBack />
        </span>
        <h3>Payment</h3>
        <p>
          <IoSearchOutline />
        </p>
      </div>

      <PaymentPageHeader />
      <section className={styles.appointments}>
        <FilterSection />
        <PaymentTable />
      </section>
    </main>
  );
};

export default PaymentPage;
