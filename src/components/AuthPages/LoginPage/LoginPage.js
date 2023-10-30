import React, { useState } from "react";
import PrimaryButton from "../../Buttons/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../Buttons/SecondaryButton/SecondaryButton";
import styles from "./LoginPage.module.css";
import AuthPage from "../../../layouts/AuthPageLayout/AuthPage";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import {
  Facebook_Logo,
  Google_Logo,
  eyeline,
  arrowleft,
} from "../../../assets/images/icons";
import { Link, useNavigate } from "react-router-dom";
import {
  getUserProfile,
  googlelogin,
  login,
  otpsignin,
  sendLoginOTP,
} from "../../../services/auth";
import {
  updateIsLoggedIn,
  updateOTP,
  updateTempLoginInfo,
  updateUserDetails,
} from "../../../redux/slices/user";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
const LoginPage = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showEmailPassword, setShowEmailPassword] = useState(true);
  const [receivedOTP, setreceivedOTP] = useState(0);
  const [formErrors, setFormErrors] = useState({});
  const [responseError, setresponseError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleOTPForm = () => {
    setShowEmailPassword(false);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const errors = {};

    if (!email && showEmailPassword) {
      errors.email = "Email address is required";
    }

    if (
      (!phone && !showEmailPassword) ||
      (phone.replace(/[^0-9]/g, "").length !== 12 && !showEmailPassword)
    ) {
      errors.phone = "Phone number must be exactly 10 digits";
    }
    // Password validation logic
    if (!password && showEmailPassword) {
      errors.password = "Password is required";
    } else {
      const regex =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%^&*])[A-Za-z\d@$!%^&*]{8,}$/;
      if (!regex.test(password)) {
        setPasswordError(true);
      } else {
        setPasswordError(false);
      }
      // errors.password = "";
    }

    setFormErrors(errors);
    const formData = {
      email,
      password,
      phone,
    };

    if (Object.keys(errors).length === 0 && showEmailPassword) {
      login(formData).then((res) => {
        console.log(res);
        if (res?.res?.status === 200 && res?.res?.data.token) {
          if (typeof localStorage !== "undefined") {
            // Use localStorage
            localStorage.setItem("jwtToken", res?.res.data.token);
          } else {
            console.error("localStorage is not available.");
          }
          (async () => {
            const profileResponse = await getUserProfile();
            if (profileResponse?.res.status === 200) {
              const profileData = profileResponse?.res?.data?.data
              delete Object.assign(profileData, {['place']: profileData['location'] })['location'];
              localStorage.setItem(
                "userData",
                JSON.stringify(profileData)
              );
              dispatch(updateIsLoggedIn(true));
              dispatch(updateUserDetails(profileData));
              navigate("/");
              toast("Welcome to Treato! Start exploring now!", {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            }
          })();
        } else if (
          res?.res?.status === 200 &&
          res?.res?.data.message === "Password is incorrect"
        ) {
          toast.error(`${res?.res?.data.message}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          toast.error("Invalid Credential", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      });
      // return;
    }
    // handle phone Number login
    else if (Object.keys(errors).length === 0 && !showEmailPassword) {
      otpsignin({ phoneNumber: formData?.phone }).then((res) => {
        console.log(res);
        if (res?.res?.data.message === "User sign in successfully!") {
          dispatch(updateTempLoginInfo(res?.res?.data.data));
          dispatch(updateOTP(res?.res?.data.otp))
          localStorage.setItem("userPhoneNumber", phone);
          localStorage.setItem("requiredLoginData", JSON.stringify(res?.res?.data.data));
          localStorage.setItem("requiredLoginToken", JSON.stringify(res?.res?.data.token));

          navigate("/verify-otp");
        } else if (res?.err != null) {
          setresponseError(res?.err.response.data.error);
        }
      });
      // });
    }

    // Handle form submission
    // Your logic here for submitting the form data
  };

  return (
    <AuthPage>
      <div className={styles.container}>
        <div className={styles.heading}>
          <h3 className={styles.letGetStarted}>Welcome back!</h3>
          <p className={styles.createText}>
            Sign in to your account to view & book salons
          </p>
        </div>
        <form className={styles.form} onSubmit={handleFormSubmit}>
          {showEmailPassword && (
            <>
              <div className={styles.inputGroup}>
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="e.g. person@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {formErrors.email && (
                  <p className={styles.error}>{formErrors.email}</p>
                )}
              </div>

              <div className={`${styles.inputGroup} ${styles.passInput}`}>
                <label htmlFor="password">Password</label>
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className=""
                />
                <img
                  src={eyeline}
                  className={styles.eyeline}
                  onClick={() => setPasswordVisible(!passwordVisible)}
                />
                {passwordError && (
                  <div className={styles.passwordError}>
                    <p>
                      Password must be at least 8 characters long, and must
                      contain
                    </p>
                    <ul>
                      <li>At least one letter (a-z)</li>
                      <li>At least one number (0-9)</li>
                      <li>At least one special character (!@#$%^&*)</li>
                    </ul>
                  </div>
                )}
                {formErrors.password && (
                  <p className={styles.error}>{formErrors.password}</p>
                )}
                <Link to="/forgot-password" className={styles.forgotPassword}>
                  forgot Pasword?
                </Link>
              </div>
            </>
          )}
          {!showEmailPassword && (
            <div className={styles.inputGroup}>
              <label htmlFor="phone">Phone</label>
              <PhoneInput
                defaultCountry="IN"
                value={phone}
                placeholder="Enter phone number"
                onChange={(value) => setPhone(value)}
              />
              {formErrors.phone && (
                <p className={styles.error}>{formErrors.phone}</p>
              )}
            </div>
          )}
          {responseError != "" && (
            <p className={styles.error}>{responseError}</p>
          )}
          <div className={styles.actions}>
            {!showEmailPassword ? (
              <PrimaryButton className={styles.action}>Sign in</PrimaryButton>
            ) : (
              <PrimaryButton className={styles.action}>Sign in</PrimaryButton>
            )}

            {showEmailPassword && (
              <div onClick={handleOTPForm}>
                <SecondaryButton className={styles.action}>
                  Sign in using OTP
                </SecondaryButton>
              </div>
            )}
            <p className={styles.alreadyHaveAccount}>
              Don’t have an account?{" "}
              <Link to="/create-account">Create account</Link>
            </p>
          </div>
        </form>
        <div className={styles.social}>
          <p className={styles.continueWith}>
            <span></span>Or simply continue with <span></span>
          </p>
          <div className={styles.socialButtons}>
            <SecondaryButton
              className={styles.google}
              onClick={() => {
                googlelogin().then((res) => {
                  console.log(res);
                });
              }}
            >
              <img src={Google_Logo} />
              Google
            </SecondaryButton>

            <SecondaryButton className={styles.facebook}>
              <img src={Facebook_Logo} />
              Facebook
            </SecondaryButton>
          </div>
        </div>
      </div>
    </AuthPage>
  );
};

export default LoginPage;
