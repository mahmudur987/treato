import React from "react";
import style from "./ServicePage.module.css";
import { Outlet } from "react-router-dom";
import LeftSideBar from "../../components/Services/LeftSideBar/LeftSideBar";
import ServicePageNavbar from "../../components/Services/Navbar/ServicePageNavbar";

const ServicePage = () => {
  return (
    <div className={style.container}>
      <div className={style.left}>
        <LeftSideBar />
      </div>
      <div className={style.downContainer}>
        <div className={style.Navbar}>
          <ServicePageNavbar />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default ServicePage;
