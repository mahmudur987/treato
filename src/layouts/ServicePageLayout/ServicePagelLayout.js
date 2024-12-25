import React, { useCallback, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import style from "./ServicePage.module.css";
import LeftSideBar from "../../components/Services/LeftSideBar/LeftSideBar";
import ServicePageNavbar from "../../components/Services/Navbar/ServicePageNavbar";
import BottomNav from "../../components/Services/BottomNav/BottomNav";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getUserProfile } from "../../services/auth";

import { updateIsLoggedIn, updateUserDetails } from "../../redux/slices/user";

const PartnerPageLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { newPartner } = useSelector((state) => state.user);
  const handleNavigation = useCallback(
    ({ role, isProfileComplete }) => {
      console.log(role);
      console.log(isProfileComplete);

      if (JSON.parse(role) === "partner") {
        if (!isProfileComplete) {
          navigate("/partner/newSalonSetting");
        }
      } else {
        toast.error("Please login as a partner.");
        navigate("/partner");
      }
    },
    [navigate]
  );
  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");
    const userRole = localStorage.getItem("userRole");

    if (!jwtToken) {
      toast.error("Please log in to continue.");
      navigate("/partner");
      return;
    }

    if (!userRole) {
      getUserProfile(jwtToken)
        .then((response) => {
          const userDetails = response?.res?.data;

          if (!userDetails) {
            console.error("Error fetching user profile:", response);
            localStorage.removeItem("jwtToken");
            return;
          }
          dispatch(updateIsLoggedIn(true));
          dispatch(updateUserDetails(userDetails));
          localStorage.setItem(
            "userRole",
            JSON.stringify(userDetails?.data?.role)
          );
          console.log(userDetails);
          handleNavigation({
            role: userDetails?.data?.role,
            isProfileComplete: userDetails?.isProfileComplete,
          });
        })
        .catch((error) => {
          console.error("Error fetching user profile:", error);
          localStorage.removeItem("jwtToken");
          toast.error("Session expired, please log in again.");
          navigate("/partner");
        });
    } else {
      console.log({
        role: userRole,
        isProfileComplete: newPartner?.isProfileComplete,
      });

      handleNavigation({
        role: userRole,
        isProfileComplete: true,
      });
    }
  }, [dispatch, navigate, handleNavigation, newPartner?.isProfileComplete]);

  return (
    <main className={style.mainContainer}>
      {!localStorage.getItem("userRole") ? (
        <div className={style.container}>
          <Outlet />
        </div>
      ) : (
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
          <BottomNav />
        </section>
      )}
    </main>
  );
};

export default PartnerPageLayout;
