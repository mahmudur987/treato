import React from "react";
import styles from "./NoSubscription.module.css";
import check from "../../../assets/images/partner/check.png";
const NoSubscription = () => {
  return (
    <main className={styles.mainContainer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <h2>
            No subscription fees - it’s <span>FREE!</span>
          </h2>
          <p>Unlimited usage with no subscription charges for your business.</p>
        </div>
        <div className={styles.bottom}>
          {" "}
          <div className={styles.left}>
            <ul>
              <li className={styles.listItem}>
                <img loading="lazy" src={check} />{" "}
                <p>
                  <strong>Track and grow your sales with ease</strong>
                  <span>Attract new customers with 24X7 online booking</span>
                </p>
              </li>
              <li className={styles.listItem}>
                <img loading="lazy" src={check} />{" "}
                <p>
                  <strong>Track and grow your sales with ease</strong>
                  <span>Attract new customers with 24X7 online booking</span>
                </p>
              </li>
              <li className={styles.listItem}>
                <img loading="lazy" src={check} />{" "}
                <p>
                  <strong>Track and grow your sales with ease</strong>
                  <span>Attract new customers with 24X7 online booking</span>
                </p>
              </li>
            </ul>
          </div>
          <div className={styles.right}>
            <ul>
              <li className={styles.listItem}>
                <img loading="lazy" src={check} />{" "}
                <p>
                  <strong>Track and grow your sales with ease</strong>
                  <span>Attract new customers with 24X7 online booking</span>
                </p>
              </li>
              <li className={styles.listItem}>
                <img loading="lazy" src={check} />{" "}
                <p>
                  <strong>Track and grow your sales with ease</strong>
                  <span>Attract new customers with 24X7 online booking</span>
                </p>
              </li>
              <li className={styles.listItem}>
                <img loading="lazy" src={check} />{" "}
                <p>
                  <strong>Track and grow your sales with ease</strong>
                  <span>Attract new customers with 24X7 online booking</span>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NoSubscription;
