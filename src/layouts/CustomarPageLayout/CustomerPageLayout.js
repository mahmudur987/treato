import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar.js";
import { useDispatch, useSelector } from "react-redux";
import SalonFilterModalDesktop from "../../components/_modals/filterSalon/SalonFilterModalDesktop/SalonFilterModalDesktop.js";
import SalonFilterModalMobile from "../../components/_modals/filterSalon/SalonFilterModalMobile/SalonFilterModalMobile.js";
import Footer from "../../components/Footer/Footer.js";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Chatbot from "../../components/ChatBot/Chatbot.jsx";
import { getUserProfile } from "../../services/auth.js";
import {
  updateIsLoggedIn,
  updateUserDetails,
} from "../../redux/slices/user.js";
import LoadSpinner from "../../components/LoadSpinner/LoadSpinner.js";

export default function CustomerPageLayout() {
  const showModal = useSelector((state) => state?.salonModal.showModal);
  const isMobileView = useSelector((state) => state.salonModal.isMobileView);
  const location = useLocation();
  // remove Navbar and footer  if any of the below  routes
  const isSpecialPage =
    location.pathname === "/auth-choice" ||
    location.pathname === "/create-account" ||
    location.pathname === "/login" ||
    location.pathname === "/verify-otp" ||
    location.pathname === "/reset-password" ||
    location.pathname === "/forgot-password" ||
    location.pathname === "/partner" ||
    location.pathname === "/partner/authchoice" ||
    location.pathname === "/partner/login";

  // remove footer  if the current route is "/myappointments "

  const isMyAppointmentsRoute =
    location.pathname.startsWith("/my-appointments");

  const isServicePage = location.pathname.startsWith("/partner/dashboard");
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true); // Start with loading state
  const dispatch = useDispatch();

  useEffect(() => {
    let isTokenExist = localStorage.getItem("jwtToken");
    if (isTokenExist) {
      getUserProfile(isTokenExist)
        .then((res) => {
          dispatch(updateIsLoggedIn(true));
          dispatch(updateUserDetails(res?.res?.data));
          setIsLoading(false); // Set loading to false once user data is fetched
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem("jwtToken");
        });
    } else {
      setIsLoading(false); // Set loading to false if no token is found
    }
  }, []);
  if (isLoading) {
    return <LoadSpinner />;
  }
  if (user.role === "partner") {
    return navigate("/partner/dashboard");
  } else if (user.role === "super") {
    navigate("/admin");
  } else {
    return (
      <div>
        {!isSpecialPage && !isServicePage && <Navbar />}
        {/* <ModalManager /> */}
        {showModal && !isMobileView && <SalonFilterModalDesktop />}
        {showModal && isMobileView && <SalonFilterModalMobile />}
        <Chatbot />
        <Outlet />
        {!isMyAppointmentsRoute && !isServicePage && !isSpecialPage && (
          <Footer />
        )}
      </div>
    );
  }
}
