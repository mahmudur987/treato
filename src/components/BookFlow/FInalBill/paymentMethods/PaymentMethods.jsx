import React from "react";
import styles from "./PaymentMethods.module.css";
import visa from "../../../../assets/images/SalonDetail/visa.png";
import phonepe from "../../../../assets/images/SalonDetail/phonepe.png";
import paytm from "../../../../assets/images/SalonDetail/paytm.png";
import plus from "../../../../assets/images/SalonDetail/plus.svg";
import rightBlue from "../../../../assets/images/SalonDetail/rightBlue.svg";
import bank from "../../../../assets/images/SalonDetail/bank.svg";
import simpl from "../../../../assets/images/SalonDetail/simpl.png";
const PaymentMethods = () => {
  return (
    <div className={styles.mainContainer}>
      <h2 className={styles.heading}>Payment methods</h2>
      <div className={styles.contentWrapper}>
        <h3>Previously used</h3>

        <div className={styles.content}>
          <h4>Debit or Credit Card</h4>

          <div className={styles.card}>
            <img src={visa} alt="" />
            <div className={styles.cardMiddle}>
              <h5>HDFC dinner club credit card</h5>

              <p>xxx-xxxx-xxxx-2546</p>
            </div>

            <input type="radio" name="" id="" />
          </div>

          <div className={styles.addNew}>
            <img src={plus} alt="" />
            <button>Add New Card</button>
          </div>
        </div>
        <div className={styles.content}>
          <h4>UPI</h4>

          <div className={styles.card}>
            <img src={paytm} alt="" />
            <div className={styles.cardMiddle}>
              <h5>HDFC dinner club credit card</h5>

              <p>xxx-xxxx-xxxx-2546</p>
            </div>

            <input type="radio" name="" id="" />
          </div>

          <div className={styles.addNew}>
            <img src={plus} alt="" />
            <button>Add New UPI ID</button>
          </div>
        </div>
      </div>
      <div className={styles.contentWrapper}>
        <h3>Other payment methods</h3>

        <div className={styles.downContent}>
          <h4>Wallets</h4>

          <div className={styles.downCard}>
            <img src={phonepe} alt="" />
            <p className={styles.downCardMiddle}>
              payTm,phonePay,Amazon Pay and more
            </p>

            <button>
              {" "}
              <img src={rightBlue} alt="" />{" "}
            </button>
          </div>
        </div>
        <div className={styles.downContent}>
          <h4>Net Banking</h4>

          <div className={styles.downCard}>
            <img src={bank} alt="" />
            <p className={styles.downCardMiddle}>select from list of Bank</p>

            <button>
              {" "}
              <img src={rightBlue} alt="" />{" "}
            </button>
          </div>
        </div>
        <div className={styles.downContent}>
          <h4>Simpl</h4>

          <div className={styles.downCard}>
            <img src={simpl} alt="" />
            <p className={styles.downCardMiddle}>
              Book Now,pay Letter using Simpl,No additional cost
            </p>

            <button>
              {" "}
              <img src={rightBlue} alt="" />{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;