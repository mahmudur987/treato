import React, { useState } from "react";
import styles from "./LoginPage.module.css";
import AuthPage from "../../../layouts/AuthPageLayout/AuthPage";
import "react-phone-number-input/style.css";
import en from "react-phone-number-input/locale/en";
import {
  Facebook_Logo,
  Google_Logo,
  eyeline,
} from "../../../assets/images/icons";
import { Link, useNavigate } from "react-router-dom";
import {
  getUserProfile,
  login,
  facebook_Login,
  otpsignin,
  google_Login,
} from "../../../services/auth";
import {
  updateIsLoggedIn,
  updateOTP,
  updateTempLoginInfo,
  updateUserDetails,
} from "../../../redux/slices/user";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { LoginSocialFacebook } from "reactjs-social-login";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  useGoogleLogin,
} from "@react-oauth/google";
import axios from "axios";
import PrimaryButton from "../../../components/Buttons/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../../components/Buttons/SecondaryButton/SecondaryButton";
import CountrySelect from "../../../components/Countrycode/CountrySelect";
import { getCountryCallingCode } from "react-phone-number-input";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showEmailPassword, setShowEmailPassword] = useState(true);
  const [formErrors, setFormErrors] = useState({});
  const [country, setCountry] = useState("IN");
  const [responseError, setresponseError] = useState("");
  const facebookAppId = process.env.REACT_APP_FACEBOOK_APP_ID;
  const userChoice = useSelector((state) => state.authChoice);
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
      (phone.replace(/[^0-9]/g, "").length !== 10 && !showEmailPassword)
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
      phone: phone.length && Object.keys(errors).length === 0?`+${getCountryCallingCode(country)}${phone}`:"",
    };

    if (Object.keys(errors).length === 0 && showEmailPassword) {
      login(formData).then((res) => {
        if (res?.res?.status === 200 && res?.res?.data.token) {
          if (typeof localStorage !== "undefined") {
            // Use localStorage
            localStorage.setItem("jwtToken", res?.res.data.token);
          } else {
            console.error("localStorage is not available.");
          }
          (async () => {
            const profileResponse = await getUserProfile(res?.res.data.token);
            if (profileResponse?.res.status === 200) {
              const profileData = profileResponse?.res?.data?.data;
              delete Object.assign(profileData, {
                ["place"]: profileData["location"],
              })["location"];
              // localStorage.setItem("userData", JSON.stringify(profileData));
              dispatch(updateIsLoggedIn(true));
              dispatch(updateUserDetails(profileData));
              navigate("/");
              toast("Welcome to Treato! Start exploring now!");
            }
          })();
        } else if (
          res?.res?.status === 200 &&
          res?.res?.data.message === "Password is incorrect"
        ) {
          toast.error(`${res?.res?.data.message}`);
        } else {
          toast.error("Invalid Credential");
        }
      });
    }
    // handle phone Number login
    else if (Object.keys(errors).length === 0 && !showEmailPassword) {
      otpsignin({ phoneNumber: formData?.phone }).then((res) => {
        if (res?.res?.data.message === "User sign in successfully!") {
          dispatch(updateTempLoginInfo(res?.res?.data.data));
          dispatch(updateOTP(res?.res?.data.otp));
          localStorage.setItem("userPhoneNumber", phone);
          localStorage.setItem(
            "requiredLoginData",
            JSON.stringify(res?.res?.data.data)
          );
          localStorage.setItem(
            "requiredLoginToken",
            JSON.stringify(res?.res?.data.token)
          );

          navigate("/verify-otp");
        } else if (res?.err != null) {
          setresponseError(res?.err?.response?.data.error);
        }
      });
    }

  };

  const googleAuthLogin=useGoogleLogin({
    cookiePolicy: 'single_host_origin',
    onSuccess: async (response) => {
      try {
        const { access_token } = response;
        // Make a request to your backend API
       google_Login(access_token).then((res)=>{
        if (res?.res?.data && res?.res.status === 200) {
          dispatch(updateIsLoggedIn(true));
          dispatch(
            updateUserDetails(res?.res?.data?.newUser || res?.res?.data.user)
          );
          localStorage.setItem("jwtToken", res?.res?.data?.token);
          navigate("/");
          toast("Welcome to Treato! Start exploring now!");
        } else {
          toast.error(`An unexpected error occurred. Please try again.`);
        }
       });
      } catch (err) {
        console.log(err);
      }
    },
  });


  const facebookPassportLogin = () => {
    window.open("http://localhost:4000/api/v1/auth/facebook", "_self");
  };


  const facebookAuthLogin = (facebookResponse) => {
    const { email, first_name, last_name, picture } = facebookResponse;
    let data = {
      email,
      first_name,
      last_name,
      role: userChoice?.role?.role || "normal",
      picture: picture?.data?.url,
    };
    facebook_Login(data).then((res) => {
      if (res?.res?.data && res?.res.status === 200) {
        dispatch(updateIsLoggedIn(true));
        dispatch(
          updateUserDetails(res?.res?.data?.newUser || res?.res?.data.user)
        );
        localStorage.setItem("jwtToken", res?.res?.data?.token);
        navigate("/");
        toast("Welcome to Treato! Start exploring now!");
      } else {
        toast.error(`An unexpected error occurred. Please try again.`);
      }
    });
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
                  onClick={() => {
                    setPasswordVisible(!passwordVisible)
                    setPasswordError(false);
                  }}
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
                  Forgot Password?
                </Link>
              </div>
            </>
          )}
          {!showEmailPassword && (
            <div className={styles.inputGroup}>
              <label htmlFor="phone">Phone</label>
              <div className={`${styles.phoneNumberInput} ${styles.phoneInputWrapper} ${phone.length?styles.bglightGray:""}`}>
              <CountrySelect
                labels={en}
                value={country}
                onChange={setCountry}
                phone={phone}

              />
               <div className={`${styles.divider} ${phone.length?styles.bglightGray:""}`}></div>
              <input
                value={phone}
                type="text" 
                inputMode="numeric" 
                pattern="[0-9]*" 
                maxLength={10} 
                onChange={(e) => {
                  const sanitizedValue = e.target.value.replace(/\D/g, ""); 
                  setPhone(sanitizedValue);

                  formErrors.phone = "";

                }}
                placeholder="Enter your phone number"
              />
            </div>
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
              <PrimaryButton className={styles.action}>Get OTP</PrimaryButton>
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

          {/*//? google and facebook auth by library */}
          <div className={styles.socialButtons}>
            <SecondaryButton
              className={styles.google}
              onClick={googleAuthLogin}
            >
              <img src={Google_Logo} />
              Google
            </SecondaryButton>

            <SecondaryButton className={styles.facebook} onClick={facebookPassportLogin}>
                <img src={Facebook_Logo}/>
                Facebook
              </SecondaryButton>

              
              {/* //Todo: facebook login do uncommment if passort not work*/}
            {/* <LoginSocialFacebook
              appId={facebookAppId}
              onResolve={(response) => {
                facebookAuthLogin(response?.data);
              }}
              onReject={(error) => {
                console.log(error);
              }}
            >
              <SecondaryButton className={styles.facebook} onClick={facebookPassportLogin}>
                <img src={Facebook_Logo}/>
                Facebook
              </SecondaryButton>
            </LoginSocialFacebook> */}
          </div>
        </div>
      </div>
    </AuthPage>
  );
};

export default LoginPage;
