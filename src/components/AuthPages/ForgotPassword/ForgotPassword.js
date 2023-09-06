import React from "react";
import AuthPage from "../../../layouts/AuthPageLayout/AuthPage";
import { SuccessCircle } from "../../../assets/images/icons";
import PrimaryButton from "../../Buttons/PrimaryButton/PrimaryButton";
import styles from "./ForgotPassword.module.css";
import { Link } from "react-router-dom";
const ForgotPassword = () => {
  return (
    <AuthPage>
      <div className={styles.container}>
        <h3 className={styles.heading}>Forgot your password?</h3>
        <h4 className={styles.desc}>
          Don’t worry! We have sent a link to reset password on your registered
          email address shreya2716@gmail.com
        </h4>
        <img src={SuccessCircle} className={styles.SuccessCircle} />
        <h4 className={styles.desc}>
          Once reset, click below to sign in with the new password.
        </h4>
        <Link to="/login">
          <PrimaryButton className={styles.Signin}>Sign in</PrimaryButton>
        </Link>
      </div>
    </AuthPage>
  );
};

export default ForgotPassword;
