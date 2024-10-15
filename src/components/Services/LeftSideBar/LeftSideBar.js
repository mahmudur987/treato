import React, { useState } from "react";
import styles from "./LeftSideBar.module.css";
import treao from "../../../assets/logo.webp";
import { Link, useLocation } from "react-router-dom";
import { useSingleSalon } from "../../../services/salon";
import { useAppointmentsReport } from "../../../services/Report";
import { sidebarLink } from "../../../assets/Data/Data";

const LeftSideBar = () => {
  const [show, setShow] = useState(false);
  const { refetch } = useSingleSalon();
  const { refetch: refetch1 } = useAppointmentsReport();
  const { pathname } = useLocation();
  const handlePrefetch = () => {
    refetch();
    refetch1();
  };
  const links = sidebarLink;
  return (
    <section
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      className={styles.mainContainer}
    >
      <div className={`${show ? styles.containerHover : styles.container}`}>
        {/* logo */}
        <div className={styles.imageWrapper} onMouseEnter={handlePrefetch}>
          <Link to={"/partner/dashboard"}>
            <img loading="lazy" src={treao} alt="" />
          </Link>
        </div>
        {/* routes */}
        {links.map((link, index) => (
          <Link
            onMouseEnter={handlePrefetch}
            key={index}
            to={link.to}
            style={{ backgroundColor: `${pathname === link.to ? "blue" : ""}` }}
          >
            <span style={{ margin: `${show ? "" : "auto"}` }}>{link.svg}</span>

            {show && <span>{link.text}</span>}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default LeftSideBar;
