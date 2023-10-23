import React, { useState } from "react";
import AuthPage from "../../../layouts/AuthPageLayout/AuthPage";
import { SuccessCircle } from "../../../assets/images/icons";
import PrimaryButton from "../../Buttons/PrimaryButton/PrimaryButton";
import styles from "./ForgotPassword.module.css";
import { Link, useNavigate } from "react-router-dom";
import { forgotpasswordLink } from "../../../services/auth";
import LoadSpinner from "../../LoadSpinner/LoadSpinner";
const ForgotPassword = () => {
  const [email, setemail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isloading, setisloading] = useState(false);
  const [isSubmit, setisSubmit] = useState(false);
  const navigate = useNavigate();
  const handleEmailSubmit = () => {
    setEmailError("");
    if (email != "") {
      setisloading(true);
      forgotpasswordLink({ email }).then((res) => {
        if (res?.res?.status === 200 && res?.res.data.link) {
          setisSubmit(true);
          localStorage.setItem("userEmail", email);
        } else {
          setEmailError("Email is not exist");
        }
        console.log(res);
        setisloading(false);
      });
    } else {
      if (email === "") {
        setEmailError("Email required");
      } else {
        setEmailError("Valid email required");
      }
    }
  };
  return (
    <AuthPage>
      {!isloading ? (
        <>
          {!isSubmit ? (
            <div className={styles.container}>
              <h2 className={styles.heading}>Provide Your Registered Email</h2>
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                className={styles.input}
              />
              {emailError != "" && (
                <span className={styles.error}>{emailError}</span>
              )}
              <PrimaryButton
                className={styles.submitBtn}
                onClick={handleEmailSubmit}
              >
                Submit
              </PrimaryButton>
            </div>
          ) : (
            <div className={styles.container}>
              <h3 className={styles.heading}>Forgot your password?</h3>
              <h4 className={styles.desc}>
                Don’t worry! We have sent a link to reset password on your
                registered email address {email}
              </h4>
              <img src={SuccessCircle} className={styles.SuccessCircle} />
              <h4 className={styles.desc}>
                Once reset, click below to sign in with the new password.
              </h4>
              <Link to="/login">
                <PrimaryButton
                  className={styles.Signin}
                  onClick={() => navigate("/login")}
                >
                  Sign in
                </PrimaryButton>
              </Link>
            </div>
          )}
        </>
      ) : (
        <LoadSpinner />
      )}
    </AuthPage>
  );
};

export default ForgotPassword;
