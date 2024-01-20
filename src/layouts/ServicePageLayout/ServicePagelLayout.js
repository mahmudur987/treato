import React from "react";
import style from "./ServicePage.module.css";
import { Outlet } from "react-router-dom";
import LeftSideBar from "../../components/Services/LeftSideBar/LeftSideBar";
import ServicePageNavbar from "../../components/Services/Navbar/ServicePageNavbar";

const ServicePage = () => {
  return (
    <div className={style.container}>
      <LeftSideBar />
      <div className={style.downContainer}>
        <ServicePageNavbar />
        <Outlet />
      </div>
    </div>
  );
};

export default ServicePage;
