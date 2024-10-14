import React, { useState } from "react";
import styles from "./BottomNav.module.css";
import { Link, useLocation } from "react-router-dom";
import icon1 from "../../../assets/svgs/icon (5).svg";
import icon2 from "../../../assets/svgs/icon (6).svg";
import icon3 from "../../../assets/svgs/icon (7).svg";
const BottomNav = () => {
  const links = [
    {
      to: "/admin",
      svg: icon1,
      text: "Dashboard",
    },
    {
      to: "/admin/salon/active",
      svg: icon2,
      text: "Salon",
    },
    {
      to: "/admin/payment",
      svg: icon3,
      text: "Payment",
    },
  ];

  const { pathname } = useLocation();

  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        {links.map((link, index) => (
          <Link key={index} to={link.to}>
            <span className={styles.icon}>
              <img src={link.svg} alt="" />
            </span>
            <span className={styles.text}> {link.text}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;
