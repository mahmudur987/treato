import React from "react";
import styles from "./WhyTreato.module.css";
import phone from "./../../../assets/images/partner/iPhone 15 Pro Portrait Mockup (1) 1.png";
import check from "./../../../assets/images/partner/check.png";
const WhyTreato = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <figure className={styles.imageWrapper}>
          {" "}
          <img src={phone} alt="Left Image" />
        </figure>
      </div>
      <div className={styles.right}>
        <div className={styles.content}>
          <div className={styles.contentRow1}>
            <h1>Why Treato?</h1>
            <p>
              Treato super-charges your business by helping you grow at scale.
              Our features help you with the backend and administrative tasks of
              running a business - such as scheduling, operations and billing,
              so you can focus on serving your customers.
            </p>
          </div>
          <ul>
            <li>
              {" "}
              <img src={check} />{" "}
              <span>Attract new customers with 24X7 online booking</span>
            </li>
            <li>
              {" "}
              <img src={check} />{" "}
              <span>
                Use sales reporting & analytics to boost your business
              </span>
            </li>
            <li>
              {" "}
              <img src={check} />{" "}
              <span>
                AImprove customer retention with relevant insights. Integrate
                data from walk-in appointments
              </span>
            </li>
            <li>
              {" "}
              <img src={check} />{" "}
              <span>Manage appointments with our all-in-one calendar</span>
            </li>
            <li>
              {" "}
              <img src={check} />{" "}
              <span>Review all employee data in one place</span>
            </li>
            <li>
              {" "}
              <img src={check} />{" "}
              <span>
                Track revenues with our integrated billing & payments system.
                On-site payments available!
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WhyTreato;
