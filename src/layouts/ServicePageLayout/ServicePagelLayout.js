import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import style from "./ServicePage.module.css";
import LeftSideBar from "../../components/Services/LeftSideBar/LeftSideBar";
import ServicePageNavbar from "../../components/Services/Navbar/ServicePageNavbar";
import BottomNav from "../../components/Services/BottomNav/BottomNav";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getUserProfile } from "../../services/auth";
import LoadSpinner from "../../components/LoadSpinner/LoadSpinner";
import { updateIsLoggedIn, updateUserDetails } from "../../redux/slices/user";

const ServicePage = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true); // Start with loading state
  const dispatch = useDispatch();
  useEffect(() => {
    let isTokenExist = localStorage.getItem("jwtToken");
    if (isTokenExist) {
      getUserProfile(isTokenExist).then((res) => {
        dispatch(updateIsLoggedIn(true));
        dispatch(updateUserDetails(res?.res?.data?.data));
        setIsLoading(false); // Set loading to false once user data is fetched
      });
    } else {
      setIsLoading(false); // Set loading to false if no token is found
    }
  }, []);

  if (isLoading) {
    return <LoadSpinner />;
  }

  if (user.role !== "partner") {
    toast.error("Please login as a partner", { id: 12 });
    navigate("/partner"); // Redirect only after user data is loaded
    return null; // Return null to prevent rendering the main content
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
