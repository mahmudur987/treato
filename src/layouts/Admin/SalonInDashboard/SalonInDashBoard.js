import React from "react";
import SalonInDashboardNavbar from "../../../components/AdminPage/Navbar/SalonInDashboard/Navbar";

const SalonInDashBoard = ({ children }) => {
  return (
    <div>
      <SalonInDashboardNavbar />
      {children}
    </div>
  );
};

export default SalonInDashBoard;
