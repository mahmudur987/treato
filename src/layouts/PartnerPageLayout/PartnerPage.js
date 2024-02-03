import React from "react";
import style from "./PartnerPage.module.css";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../../components/partner/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const PartnerPage = ({ children }) => {
  const location = useLocation();

  const isSpecialPage = location.pathname === "/partner/authchoice";
  return (
    <div className={style.container}>
      {!isSpecialPage && <Navbar />}

      <Outlet />

      {!isSpecialPage && <Footer />}
    </div>
  );
};

export default PartnerPage;
