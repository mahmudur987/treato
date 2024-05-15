import React from "react";
import SalonInDashboardNavbar from "../../../components/AdminPage/Navbar/SalonInDashboard/Navbar";
import { IoMdArrowBack } from "react-icons/io";
import styles from "./SalonInDashboard.module.css";
import { Link } from "react-router-dom";
const SalonInDashBoard = ({ children }) => {
  return (
    <div>
      <SalonInDashboardNavbar />
      <div className={styles.wrapper}>
        <span>
          <Link to={"/admin"}>
            <IoMdArrowBack />
          </Link>
        </span>
        <h1 className={styles.heading}>Salons</h1>
      </div>
      {children}
    </div>
  );
};

export default SalonInDashBoard;
