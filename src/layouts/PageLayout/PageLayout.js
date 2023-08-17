import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import SalonFilterModalDesktop from "../../components/_modals/filterSalon/SalonFilterModalDesktop/SalonFilterModalDesktop.js";
import SalonFilterModalMobile from "../../components/_modals/filterSalon/SalonFilterModalMobile/SalonFilterModalMobile";
import Footer from "../../components/Footer/Footer";
export default function PageLayout({ children }) {
  const showModal = useSelector((state) => state.modal.showModal);
  const isMobileView = useSelector((state) => state.modal.isMobileView);

  return (
    <div>
      <Navbar />
      {showModal && !isMobileView && <SalonFilterModalDesktop />}
      {showModal && isMobileView && <SalonFilterModalMobile />}
      {children}
      {/* Desktop Modal */}
      <Footer/>
    </div>
  );
}
