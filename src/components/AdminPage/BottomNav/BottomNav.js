import React, { useState } from "react";
import styles from "./BottomNav.module.css";
import { Link, useLocation } from "react-router-dom";

const BottomNav = () => {
  const links = [
    {
      to: "/admin",
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M3 5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5ZM19 5H5V8H19V5ZM5 19V10H9V19H5ZM11 19H19V10H11V19Z"
            fill="white"
          />
        </svg>
      ),
      text: "Dashboard",
    },
    {
      to: "/admin/salon/active",
      svg: (
        <svg
          width="23"
          height="22"
          viewBox="0 0 23 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.4526 10.1361C17.2999 8.46088 16.791 6.83764 15.9599 5.37511C15.1288 3.91258 13.9948 2.64454 12.6338 1.65594L11.2964 0.6875L10.0432 1.66203C8.73752 2.67715 7.66066 3.95631 6.88299 5.41595C6.10532 6.87559 5.64433 8.48288 5.53014 10.1328C5.02564 10.0377 4.51338 9.98988 4 9.98989H0.25V13.0625C0.25 17.6116 3.95092 21.3125 8.5 21.3125H14.5C19.0491 21.3125 22.75 17.6116 22.75 13.0625V9.98989H19C18.4807 9.98986 17.9626 10.0388 17.4526 10.1361ZM10.9641 2.84609L11.3286 2.5625L11.7542 2.8707C12.9816 3.76233 13.9969 4.91409 14.7275 6.24366C15.4581 7.57322 15.886 9.04777 15.9806 10.5619C13.9972 11.3477 12.3926 12.8672 11.5 14.8049C10.6056 12.8636 8.99659 11.3423 7.00825 10.558C7.06063 9.0609 7.44226 7.59371 8.12598 6.26081C8.8097 4.9279 9.77872 3.76202 10.9641 2.84609ZM10.75 19.8125H8.5C4.77812 19.8125 1.75 16.7844 1.75 13.0625V11.4899H4C7.72188 11.4899 10.75 14.518 10.75 18.2399V19.8125ZM21.25 13.0625C21.25 16.7844 18.2219 19.8125 14.5 19.8125H12.25V18.2399C12.25 14.518 15.2781 11.4899 19 11.4899H21.25V13.0625Z"
            fill="white"
          />
        </svg>
      ),
      text: "Salon",
    },
    {
      to: "/admin/payment",
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M16 3C16.5128 3 16.9355 3.38604 16.9933 3.88338L17 4V5H19C20.0544 5 20.9182 5.81588 20.9945 6.85074L21 7V19C21 20.0544 20.1841 20.9182 19.1493 20.9945L19 21H5C3.94564 21 3.08183 20.1841 3.00549 19.1493L3 19V7C3 5.94564 3.81588 5.08183 4.85074 5.00549L5 5H7V4C7 3.44772 7.44772 3 8 3C8.51283 3 8.93551 3.38604 8.99327 3.88338L9 4V5H15V4C15 3.44772 15.4477 3 16 3ZM19 12H5V19H19V12ZM19 7H5V10H19V7Z"
            fill="white"
          />
        </svg>
      ),
      text: "Payment",
    },
  ];

  const { pathname } = useLocation();

  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        {links.map((link, index) => (
          <Link
            key={index}
            to={link.to}
            
          >
            <span className={styles.icon}> {link.svg}</span>
            <span className={styles.text}> {link.text}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;
