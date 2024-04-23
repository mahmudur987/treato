import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import style from "./AdminPageLayout.module.css";
import ServicePageNavbar from "../../components/Services/Navbar/ServicePageNavbar";
import BottomNav from "../../components/Services/BottomNav/BottomNav";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getUserProfile } from "../../services/auth";
import LeftSideBar from "../../components/AdminPage/LeftSideBar/LeftSideBar";

const AdminPageLayout = () => {
  //   const navigate = useNavigate();

  //   const { user } = useSelector((state) => state.user);
  useEffect(() => {
    let isTokenExist = localStorage.getItem("jwtToken");
    if (isTokenExist) {
      getUserProfile(isTokenExist).then((res) => {
        console.log(res?.res?.data?.data);
      });
    }
  }, []);

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
      {/* <BottomNav /> */}
    </main>
  );
};

export default AdminPageLayout;
