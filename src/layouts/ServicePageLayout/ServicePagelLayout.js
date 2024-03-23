import React, { useEffect, useRef } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import style from "./ServicePage.module.css";
import LeftSideBar from "../../components/Services/LeftSideBar/LeftSideBar";
import ServicePageNavbar from "../../components/Services/Navbar/ServicePageNavbar";
import BottomNav from "../../components/Services/BottomNav/BottomNav";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getUserProfile } from "../../services/auth";

const ServicePage = () => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    let isTokenExist = localStorage.getItem("jwtToken");
    if (isTokenExist) {
      getUserProfile(isTokenExist).then((res) => {
        console.log(res?.res?.data?.data);
      });
    }
  }, []);
  if (user.role !== "partner") {
    toast.error("Please login as a partner", { id: 1 });
    return navigate("/partner");
  }

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
};

export default ServicePage;
