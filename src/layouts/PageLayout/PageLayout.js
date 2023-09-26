import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import SalonFilterModalDesktop from "../../components/_modals/filterSalon/SalonFilterModalDesktop/SalonFilterModalDesktop.js";
import SalonFilterModalMobile from "../../components/_modals/filterSalon/SalonFilterModalMobile/SalonFilterModalMobile";
import Footer from "../../components/Footer/Footer";
import { useLocation } from "react-router-dom";
import ModalManager from "../../components/_modals/ModalManager";
export default function PageLayout({ children }) {
  const showModal = useSelector((state) => state?.salonModal.showModal);
  const isMobileView = useSelector((state) => state.salonModal.isMobileView);
  const location = useLocation();
  // remove Navbar and footer  if any of the below  routes 
  const isSpecialPage =
    location.pathname === "/auth-choice" ||
    location.pathname === "/create-account" ||
    location.pathname === "/login" ||
    location.pathname === "/verify-otp" ||
    location.pathname === "/forgot-password";
  // remove footer  if the current route is "/myappointments "
  const isMyAppointmentsRoute =
    location.pathname.startsWith("/my-appointments");
  return (
    <div>
      {!isSpecialPage && <Navbar />}
      {/* <ModalManager /> */}
      {showModal && !isMobileView && <SalonFilterModalDesktop />}
      {showModal && isMobileView && <SalonFilterModalMobile />}
      {children}
      {!isMyAppointmentsRoute && !isSpecialPage && <Footer />}
    </div>
  );
}
