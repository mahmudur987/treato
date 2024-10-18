import React, { useState } from "react";
import styles from "./BottomNav.module.css";
import { Link, useLocation } from "react-router-dom";
import { links } from "../../../assets/Data/Data";

const BottomNav = () => {
  const { pathname } = useLocation();

  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        {links.map((link, index) => (
          <Link
            key={index}
            to={link.to}
            style={{ backgroundColor: `${pathname === link.to ? "blue" : ""}` }}
          >
            {link.svg}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;
