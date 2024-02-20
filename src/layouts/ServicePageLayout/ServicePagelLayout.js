import React from "react";
import style from "./ServicePage.module.css";
import { Outlet } from "react-router-dom";
import LeftSideBar from "../../components/Services/LeftSideBar/LeftSideBar";
import ServicePageNavbar from "../../components/Services/Navbar/ServicePageNavbar";
import BottomNav from "../../components/Services/BottomNav/BottomNav";

const ServicePage = () => {
  return (
    <main className={style.mainContainer}>
      <section className={style.container}>
        <div className={style.left}>
          <LeftSideBar />
        </div>
        <div className={style.downContainer}>
          <div className={style.Navbar}>
            <ServicePageNavbar />
          </div>
          <Outlet />
        </div>
      </section>
      <section className={style.bottomNav}>
        <BottomNav />
      </section>
    </main>
  );
};

export default ServicePage;
