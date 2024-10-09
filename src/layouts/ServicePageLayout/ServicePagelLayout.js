import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import style from "./ServicePage.module.css";
import LeftSideBar from "../../components/Services/LeftSideBar/LeftSideBar";
import ServicePageNavbar from "../../components/Services/Navbar/ServicePageNavbar";
import BottomNav from "../../components/Services/BottomNav/BottomNav";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getUserProfile } from "../../services/auth";
import LoadSpinner from "../../components/LoadSpinner/LoadSpinner";
import { updateIsLoggedIn, updateUserDetails } from "../../redux/slices/user";

const PartnerPageLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, newPartner } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const isNewSalonSettingPage =
    location.pathname === "/partner/dashboard/newSalonSetting";

  useEffect(() => {
    let isTokenExist = localStorage.getItem("jwtToken");
    if (isTokenExist) {
      getUserProfile(isTokenExist)
        .then((res) => {
          dispatch(updateIsLoggedIn(true));
          dispatch(updateUserDetails(res?.res?.data));
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem("jwtToken");
        });
    } else {
      setIsLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    if (!isLoading) {
      if (user.role !== "partner") {
        toast.error("Please login as a partner", { id: 12 });
        navigate("/partner");
      } else if (!newPartner.isProfileComplete) {
        navigate("/partner/dashboard/newSalonSetting");
      }
    }
  }, [isLoading, user.role, newPartner.isProfileComplete, navigate]);

  if (isLoading) {
    return <LoadSpinner />;
  }

  return (
    <>
      {isNewSalonSettingPage ? (
        <div className={style.container}>
          <Outlet />
        </div>
      ) : (
        <>
          <main className={style.mainContainer}>
            <section className={style.container}>
              <div className={style.left}>
                <LeftSideBar />
              </div>
              <div className={style.downContainer}>
                <div className={style.navbar}>
                  <ServicePageNavbar />
                </div>
                <div className={style.Outlet}>
                  <Outlet />
                </div>
              </div>
            </section>
            <BottomNav />
          </main>
        </>
      )}
    </>
  );
};

export default PartnerPageLayout;
