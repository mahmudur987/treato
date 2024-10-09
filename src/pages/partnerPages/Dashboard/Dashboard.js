import React from "react";
import Header from "../../../components/Services/Dashboard/Header/Header";
import styles from "./Dashboard.module.css";
import SalesTrand from "../../../components/Services/Dashboard/SalesTrend/SalesTrand";
import RecentActivity from "../../../components/Services/Dashboard/RecentActivity/RecentActivity";
import Upcoming from "../../../components/Services/Dashboard/Upcoming/Upcoming";
import TopService from "../../../components/Services/Dashboard/TopService/TopService";
import TeamSales from "../../../components/Services/Dashboard/TeamSales/TeamSales";
import { useGetOutStandingPaymentStatus } from "../../../services/PartnerDashboard";
import { toast } from "react-toastify";
import axiosInstance from "../../../services/axios";
const Dashboard = () => {
  const { data: status, isLoading, isError } = useGetOutStandingPaymentStatus();

  const initPayment = (order, id) => {
    const options = {
      key: id,
      amount: `amountToPay`,
      currency: "INR",
      name: "Treato",
      description: "test ",
      image: "TreatoLogo",
      order_id: order?.id,
      handler: async (response) => {
        try {
          const headers = {
            token: localStorage.getItem("jwtToken"),
          };
          let data = { ...response, order };
          console.log("verify pending data", data);

          const res = await axiosInstance.post(
            "salon/verifyorderpending",
            data,
            { headers }
          );

          console.log(res);
        } catch (error) {
          console.log(error);
          toast.error(`Payment failed`, {
            duration: 6000,
          });
        }
      },
      theme: {
        color: "#000000",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };
  const handlePayment = async () => {
    console.log("Payment process started");

    const headers = {
      token: localStorage.getItem("jwtToken"),
    };

    try {
      const { data } = await axiosInstance.post(
        "salon/createorderpending",
        {},
        { headers }
      );

      // Check if the necessary data is available before proceeding
      if (data && data.order && data.razorpaykey) {
        initPayment(data.order, data.razorpaykey);
        toast.success("Payment initiated successfully");
      } else {
        toast.error(
          "Failed to initiate payment. Missing order or payment key."
        );
      }
    } catch (error) {
      console.error("Payment Error: ", error.message || error);
      toast.error(
        "An error occurred while processing your payment. Please try again."
      );
    }
  };

  return (
    <main className={styles.mainContainer}>
      {status && !isError && !isLoading && (
        <div className={styles.top}>
          <p>You have outstanding commissions of ₹ {status?.data}. Pay now?</p>
          <button onClick={handlePayment}>Pay</button>
        </div>
      )}

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
