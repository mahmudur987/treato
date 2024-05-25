import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar.js";
import { useSelector } from "react-redux";
import SalonFilterModalDesktop from "../../components/_modals/filterSalon/SalonFilterModalDesktop/SalonFilterModalDesktop.js";
import SalonFilterModalMobile from "../../components/_modals/filterSalon/SalonFilterModalMobile/SalonFilterModalMobile.js";
import Footer from "../../components/Footer/Footer.js";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Chatbot from "../../components/ChatBot/Chatbot.jsx";

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

  useEffect(() => {
    if (user.role === "partner") {
      navigate("/partner/dashboard");
    }
  }, [user]);
  useEffect(() => {
    if (user.role === "super") {
      navigate("/admin");
    }
  }, [user]);

  if (user.role === "partner") {
    return navigate("/partner/dashboard");
  } else {
    return (
      <div>
        {!isSpecialPage && !isServicePage && <Navbar />}
        {/* <ModalManager /> */}
        {showModal && !isMobileView && <SalonFilterModalDesktop />}
        {showModal && isMobileView && <SalonFilterModalMobile />}
        <Chatbot/>
        <Outlet />
        {!isMyAppointmentsRoute && !isServicePage && !isSpecialPage && (
          <Footer />
        )}
      </div>
    );
  }
}
