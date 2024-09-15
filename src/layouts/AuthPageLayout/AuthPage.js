import React from "react";
import styles from "./AuthPage.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { arrowleft } from "../../assets/images/icons";
import { useSelector } from "react-redux";
import { useGetALLAuthPageImages } from "../../services/static";
const AuthPage = ({ children }) => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };
  const location = useLocation();
  const userChoice = useSelector((state) => state.authChoice);
  const { data } = useGetALLAuthPageImages();

  return (
    <div className={styles.container}>
      {/* Left side common content */}

      {location.pathname === "/partner/authchoice" ||
      location.pathname === "/partner/login" ||
      userChoice.role.role === "partner" ? (
        <div
          className={styles.PartnerAuthImage}
          style={{
            backgroundImage: `url(${data?.data?.RegisterP?.public_url})`,
          }}
        ></div>
      ) : (
        <div
          className={styles.AuthImage}
          style={{
            backgroundImage: `url(${data?.data?.Login?.public_url})`,
          }}
        ></div>
      )}

      {/* Right side content */}
      <div className={styles.AuthContent}>
        <img
          src={arrowleft}
          className={styles.arrowLeft}
          onClick={handleBack}
          alt="auth page "
        />
        {children} {/* Dynamically rendered content */}
      </div>
    </div>
  );
};

export default AuthPage;
