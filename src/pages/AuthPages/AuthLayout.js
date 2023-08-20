import React from "react";
import Hero_Signup from "../../assets/images/AuthImages/Hero_Signup.png";
import styles from "./AuthLayout.module.css"
const AuthLayout = ({ children }) => {
  return (
    <div className={styles.container}>
      {/* Left side common content */}
      <div className={styles.AuthImage}>
        <img src={Hero_Signup} alt="Hero_Signup" />
      </div>

      {/* Right side content */}
      <div className={styles.AuthContent}>
        {children} {/* Dynamically rendered content */}
      </div>
    </div>
  );
};

export default AuthLayout;
