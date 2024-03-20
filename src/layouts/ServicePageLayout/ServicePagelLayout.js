import React from "react";
import style from "./ServicePage.module.css";
import { Outlet, useNavigate } from "react-router-dom";
import LeftSideBar from "../../components/Services/LeftSideBar/LeftSideBar";
import ServicePageNavbar from "../../components/Services/Navbar/ServicePageNavbar";
import BottomNav from "../../components/Services/BottomNav/BottomNav";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ServicePage = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  if (user.role === "partner") {
    return (
      <main className={style.mainContainer}>
        <section className={style.container}>
          <div className={style.left}>
            <LeftSideBar />
          </div>

          <div className={style.downContainer}>
            <div className={style.navbar}>
              <ServicePageNavbar />
            </div>
            <Outlet />
          </div>
        </section>
        <BottomNav />
      </main>
    );
  } else {
    toast.error("please Login as partner", { toastId: 1 });
    return navigate("/partner");
  }
};

export default ServicePage;
