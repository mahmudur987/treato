import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import style from "./AdminPageLayout.module.css";
import ServicePageNavbar from "../../components/Services/Navbar/ServicePageNavbar";
import BottomNav from "../../components/Services/BottomNav/BottomNav";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getUserProfile } from "../../services/auth";
import LeftSideBar from "../../components/AdminPage/LeftSideBar/LeftSideBar";
import { updateIsLoggedIn, updateUserDetails } from "../../redux/slices/user";
import LoadSpinner from "../../components/LoadSpinner/LoadSpinner";

const AdminPageLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    let isTokenExist = localStorage.getItem("jwtToken");
    if (isTokenExist) {
      getUserProfile(isTokenExist).then((res) => {
        dispatch(updateIsLoggedIn(true));
        dispatch(updateUserDetails(res?.res?.data?.data));
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, []);
  const isSalonInAdmin = location.pathname.startsWith("/admin/salon");

  if (isLoading) {
    return <LoadSpinner />;
  }
  console.log(user);
  if (user.role === "super") {
    return (
      <main className={style.mainContainer}>
        <section className={style.container}>
          <div className={style.left}>
            <LeftSideBar />
          </div>

          <div className={style.downContainer}>
            <div className={style.navbar}>
              {!isSalonInAdmin && <ServicePageNavbar />}
            </div>
            <Outlet />
          </div>
        </section>
        {/* <BottomNav /> */}
      </main>
    );
  } else {
    navigate("/login");
  }
};

export default AdminPageLayout;
