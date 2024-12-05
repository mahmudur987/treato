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
  const dispatch = useDispatch();
  const { newPartner } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    const userRole = localStorage.getItem("userRole");
    console.log(token);
    console.log(userRole);
    // Redirect to login if no token
    if (!token) {
      toast.error("Please log in to continue.");
      navigate("/partner");
      return;
    }

    // Redirect to dashboard if role is partner
    if (userRole && userRole === "partner") {
      if (!newPartner.isProfileComplete) {
        navigate("/partner/dashboard/newSalonSetting");
      } else if (location.pathname === "/partner") {
        navigate("/partner/dashboard"); // Redirect to dashboard if accessing /partner
      }
    } else if (userRole && userRole !== "partner") {
      toast.error("Please login as a partner.");
      navigate("/partner");
    }
  }, [navigate, newPartner.isProfileComplete, location.pathname]);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");

    if (token) {
      getUserProfile(token)
        .then((res) => {
          const userDetails = res?.res?.data?.data;
          console.log(userDetails);
          dispatch(updateIsLoggedIn(true));
          dispatch(updateUserDetails(userDetails));
          localStorage.setItem("userRole", userDetails.role);

          // Redirect to dashboard if role is partner
          if (userDetails.role === "partner") {
            if (!newPartner.isProfileComplete) {
              navigate("/partner/dashboard/newSalonSetting");
            } else if (location.pathname === "/partner") {
              navigate("/partner/dashboard"); // Redirect to dashboard if accessing /partner
            }
          } else if (userDetails.role !== "partner") {
            toast.error("Please login as a partner.");
            navigate("/partner");
          }
        })
        .catch((err) => {
          console.error(err);
          localStorage.removeItem("jwtToken");
          localStorage.removeItem("userRole");
          toast.error("Session expired, please log in again.");
          navigate("/partner");
        })
        .finally(() => {
          // setIsLoading(false);
        });
    }
  }, [dispatch, navigate]);

  if (isLoading) {
    return <LoadSpinner />;
  }

  return (
    <main className={style.mainContainer}>
      {location.pathname === "/partner/dashboard/newSalonSetting" ? (
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
