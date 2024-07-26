import React from "react";
import SalonInDashboardNavbar from "../../../components/AdminPage/Navbar/SalonInDashboard/Navbar";
import { IoMdArrowBack } from "@react-icons/all-files/io/IoMdArrowBack";
import styles from "./SalonInDashboard.module.css";
import { Link, useLocation } from "react-router-dom";
const SalonInDashBoard = ({ children }) => {
  const { pathname } = useLocation();

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

      <div className={styles.List}>
        <Link
          to={"/admin/salon/active"}
          style={{
            borderBottom:
              pathname === "/admin/salon/active" ? "3px solid  #0D69D7 " : "",
          }}
        >
          Active
        </Link>
        <Link
          style={{
            borderBottom:
              pathname === "/admin/salon/pending" ? "3px solid  #0D69D7 " : "",
          }}
          to={"/admin/salon/pending"}
        >
          Pending
        </Link>
        <Link
          style={{
            borderBottom:
              pathname === "/admin/salon/deactivated"
                ? "3px solid  #0D69D7 "
                : "",
          }}
          to={"/admin/salon/deactivated"}
        >
          Deactivated
        </Link>
      </div>

      {children}
    </div>
  );
};

export default SalonInDashBoard;
