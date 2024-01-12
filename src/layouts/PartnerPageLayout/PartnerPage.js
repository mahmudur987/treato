import React from "react";
import style from "./PartnerPage.module.css";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/partner/Navbar/Navbar";
const PartnerPage = ({ children }) => {
  return (
    <div className={style.container}>
      <Navbar />

      <Outlet />

      <p>Footer</p>
    </div>
  );
};

export default PartnerPage;
