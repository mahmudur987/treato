import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import SalonFilterModalDesktop from "../../components/_modals/filterSalon/SalonFilterModalDesktop/SalonFilterModalDesktop.js";
import SalonFilterModalMobile from "../../components/_modals/filterSalon/SalonFilterModalMobile/SalonFilterModalMobile";
import Footer from "../../components/Footer/Footer";
import ModalManager from "../../components/_modals/ModalManager";
export default function PageLayout({ children }) {
  const showModal = useSelector((state) => state.modal.showModal);
  const isMobileView = useSelector((state) => state.modal.isMobileView);

  return (
    <div>
      <Navbar />
      <ModalManager />
      {showModal && !isMobileView && <SalonFilterModalDesktop />}
      {showModal && isMobileView && <SalonFilterModalMobile />}
      {children}
      {/* Desktop Modal */}
      <Footer/>
    </div>
  );
}
