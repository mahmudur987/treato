import React from "react";
import styles from "./AuthPage.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { arrowleft } from "../../assets/images/icons";
import { useSelector } from "react-redux";
const AuthPage = ({ children }) => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  const location = useLocation();

  const userChoice = useSelector((state) => state.authChoice);
  console.log(userChoice.role.role);
  return (
    <div className={styles.container}>
      {/* Left side common content */}

      {location.pathname === "/partner/authchoice" ||
      userChoice.role.role === "partner" ? (
        <div className={styles.PartnerAuthImage}></div>
      ) : (
        <div className={styles.AuthImage}></div>
      )}

      {/* Right side content */}
      <div className={styles.AuthContent}>
        <img
          src={arrowleft}
          className={styles.arrowLeft}
          onClick={handleBack}
        />
        {children} {/* Dynamically rendered content */}
      </div>
    </div>
  );
};

export default AuthPage;
