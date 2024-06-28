import React, { useState, useEffect } from "react";
import axios from "axios";
import useRazorpay from "react-razorpay";
import { redirect } from "react-router-dom";

const CartPayment = ({ selectedaddress, paymentotal, amountToPay }) => {
  const [paymentDetails, setPaymentDetails] = useState({
    razorpay_order_id: "",
    razorpay_merchant_key: "",
    razorpay_amount: 0,
    currency: "INR",
    callback_url: "",
    receipt: "",
  });
  const [model, setModel] = useState(false);
  const [Razorpay] = useRazorpay();
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const token = localStorage.getItem("token");
  console.log(paymentDetails);

  const initializePayment = async () => {
    try {
      const orderBody = {
        currency: "INR",
        amount: paymentotal,
        address_id: selectedaddress,
      };
      console.log("this is orderbody", orderBody);
      const headers = {
        token: localStorage.getItem("jwtToken"),
      };
      const orderResponse = await axios.post(
        `${BASE_URL}/create-order`,
        orderBody,
        { headers }
      );
      console.log("this is orderResponse", orderResponse);
      setPaymentDetails(orderResponse.data);
    } catch (error) {
      console.error("Error initializing payment:", error);
    }
  };
  useEffect(() => {
    initializePayment();
  }, []);
  const displayRazorpay = () => {
    console.log("this is payment data", paymentDetails.razorpay_merchant_key);
    if (!paymentDetails.razorpay_merchant_key) {
      console.error("Razorpay key not set");
      return;
    }
    const options = {
      key: paymentDetails.razorpay_merchant_key,
      amount: paymentDetails.razorpay_amount,
      currency: paymentDetails.currency,
      // callback_url:`${paymentDetails.callback_url}?order_receipt${paymentDetails?.receipt}`,
      // callback_url:"http://localhost:3000/account/cart",
      // redirect:true,
      // "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
      name: "Your Company Name",
      description: "Payment for Order",
      image: "https://your-logo-url.png",
      order_id: paymentDetails.razorpay_order_id,
      handler: (response) => {
        sendPaymentVerification(response);
      },
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
        name: "Gaurav Kumar", //your customer's name
        email: "gaurav.kumar@example.com",
        contact: "9000090000", //Provide the customer's phone number for better conversion rates
      },
      redirect: false,
      // modal: {
      //   confirm_close: true, // this is set to true, if we want confirmation when clicked on cross button.
      //   // This function is executed when checkout modal is closed
      //   // There can be 3 reasons when this modal is closed.
      //   ondismiss: async (reason) => {
      //     const {
      //       reason: paymentReason, field, step, code,
      //     } = reason && reason.error ? reason.error : {};
      //     // Reason 1 - when payment is cancelled. It can happend when we click cross icon or cancel any payment explicitly.
      //     if (reason === undefined) {
      //       console.log('cancelled');
      //       handlePayment('Cancelled');
      //     }
      //     // Reason 2 - When modal is auto closed because of time out
      //     else if (reason === 'timeout') {
      //       console.log('timedout');
      //       handlePayment('timedout');
      //     }
      //     // Reason 3 - When payment gets failed.
      //     else {
      //       console.log('failed');
      //       handlePayment('failed', {
      //         paymentReason, field, step, code,
      //       });
      //     }
      //   },
      // },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      theme: {
        color: "#F37254",
      },
    };
    const rzp1 = new Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    rzp1.open();
    rzp1.on("payment.success", async (response) => {
      alert("nice");
    });
  };
  const sendPaymentVerification = async (response) => {
    console.log(response);
    const token = await localStorage.getItem("token");
    try {
      const orderReceipt = paymentDetails?.receipt;
      const verificationResponse = await fetch(
        `${BASE_URL}/api/productsheet/payment-verification/?order_receipt=${orderReceipt}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            razorpay_payment_id: response?.razorpay_payment_id,
            razorpay_order_id: response?.razorpay_order_id,
            razorpay_signature: response?.razorpay_signature,
          }),
        }
      );
      const res = await verificationResponse.json();
      if (res?.message === "Payment successful") {
        setModel(true);
      } else {
        alert("Payment Failed");
      }
    } catch (error) {
      console.error("Error sending payment verification:", error);
    }
  };
  return (
    <>
      <button onClick={displayRazorpay}> Pay ₹ {amountToPay}</button>
    </>
  );
};
export default CartPayment;
