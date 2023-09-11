import React from "react";
import styles from "./AuthPage.module.css";
import { useNavigate } from "react-router-dom";
import { arrowleft } from "../../assets/images/icons";
const AuthPage = ({ children }) => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };
  return (
    <div className={styles.container}>
      {/* Left side common content */}
      <div className={styles.AuthImage}>
      </div>

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
