import React from "react";
import style from "./ServicePage.module.css";
import { Outlet } from "react-router-dom";
import LeftSideBar from "../../components/Services/LeftSideBar/LeftSideBar";
import ServicePageNavbar from "../../components/Services/Navbar/ServicePageNavbar";
import PartnerAccountSetting from "../../pages/partnerPages/SettingDropDown/PartnerAccountSetting";

const ServicePage = () => {
  return (
    <div className={style.container}>
      <div className={style.LeftSideBarHide}>

      <LeftSideBar />
      </div>
      <div className={style.downContainer}>
        <div className={style.ForSmallScreen}>

        <ServicePageNavbar />
        </div>
        {/* <PartnerAccountSetting/> */}
        <Outlet />
      </div>
    </div>
  );
};

export default ServicePage;
