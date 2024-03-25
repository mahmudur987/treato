import React, { useEffect, useRef, useState } from "react";
import PrimaryButton from "../../../components/Buttons/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../../components/Buttons/SecondaryButton/SecondaryButton";
import styles from "./CreateAccountPage.module.css";
import AuthPage from "../../../layouts/AuthPageLayout/AuthPage";
import "react-phone-number-input/style.css";
import "react-phone-input-2/lib/style.css";
import {
  Facebook_Logo,
  Google_Logo,
  eyeline,
} from "../../../assets/images/icons";
import { Link, useNavigate } from "react-router-dom";
import {
  google_Login,
  facebook_Login,
  getUserProfile,
} from "../../../services/auth";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { sendLoginOTP } from "../../../services/auth";
import {
  updateIsLoggedIn,
  updateOTP,
  updateUserDetails,
} from "../../../redux/slices/user";
import { LoginSocialFacebook } from "reactjs-social-login";
import { useGoogleLogin } from "@react-oauth/google";
import { getCountryCallingCode } from "react-phone-number-input/input";
import en from "react-phone-number-input/locale/en";
import CountrySelect from "../../../components/Countrycode/CountrySelect";
import { handleInputChange } from "../../../utils/utils";
import { createSalon } from "../../../services/salon";

const CreateAccountPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [country, setCountry] = useState("IN");
  const userChoice = useSelector((state) => state.authChoice);
  const facebookAppId = process.env.REACT_APP_FACEBOOK_APP_ID;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleFormSubmit = (event) => {
    event.preventDefault();

    const errors = {};

    if (!firstName) {
      errors.firstName = "First name is required";
    }

    if (!lastName) {
      errors.lastName = "Last name is required";
    }

    if (!email) {
      errors.email = "Email address is required";
    }

    if (!phone || phone.replace(/[^0-9]/g, "").length !== 10) {
      errors.phone = "Phone number must be exactly 10 digits";
    }

    // Password validation logic
    if (!password) {
      errors.password = "Password is required";
    } else {
      const regex =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%^&*])[A-Za-z\d@$!%^&*]{8,}$/;
      if (!regex.test(password)) {
        setPasswordError(true);
        errors.notvalid = "true";
      } else {
        setPasswordError(false);
      }
    }

    setFormErrors(errors);
    const formData = {
      first_name: firstName,
      last_name: lastName,
      email,
      phone: phone.length ? `+${getCountryCallingCode(country)}${phone}` : "",
      password,
      role: userChoice?.role?.role,
      type: "register",
    };
    console.log(formData);
    if (Object.keys(errors).length === 0) {
      localStorage.setItem("requiredRegisterData", JSON.stringify(formData));
      localStorage.setItem("userPhoneNumber", JSON.stringify(formData.phone));

      sendLoginOTP({ phoneNumber: phone }).then((res) => {
        if (res && res?.res?.data.status === true) {
          dispatch(updateOTP(res?.res.data.otp));
          navigate("/verify-otp");
        } else {
          toast.error(
            `${
              res?.err?.response?.data.message || res?.err?.response?.data.error
            }`
          );
        }
      });
    }
  };

  const googleAuthLogin = useGoogleLogin({
    cookiePolicy: "single_host_origin",
    onSuccess: async (response) => {
      try {
        const { access_token } = response;
        const role = userChoice.role.role;
        // Make a request to your backend API
        google_Login(access_token, role).then((res) => {
          if (res?.res?.data && res?.res.status === 200) {
            localStorage.setItem("jwtToken", res?.res?.data?.token);
            getUserProfile(res?.res?.data.token).then((res) => {
              const user = res?.res?.data?.data;
              if (user?.role === "partner") {
                createSalon()
                  .then((res) => console.log(res.res))
                  .catch((err) => console.error(err));
                navigate("/partner/dashboard/PartnerAccountSetting");
              }
              dispatch(updateIsLoggedIn(true));
              dispatch(updateUserDetails(res?.res?.data?.data));
              dispatch(updateOTP(0));

              toast("Welcome to Treato! Start exploring now!");
              localStorage.removeItem("requiredRegisterData");
              if (user?.role !== "partner") {
                navigate("/");
              }
            });
          } else {
            toast.error(`An unexpected error occurred. Please try again.`);
          }
        });
      } catch (err) {
        console.log(err);
      }
    },
  });

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
        const user = res?.res?.data?.data;
        dispatch(updateIsLoggedIn(true));
        dispatch(
          updateUserDetails(res?.res?.data?.newUser || res?.res?.data.user)
        );
        localStorage.setItem("jwtToken", res?.res?.data?.token);
        if (user?.role === "partner") {
          createSalon()
            .then((res) => console.log(res.res))
            .catch((err) => console.error(err));
          navigate("/partner/dashboard/PartnerAccountSetting");
        }

        if (user?.role !== "partner") {
          navigate("/");
          toast("Welcome to Treato! Start exploring now!");
        }
      } else {
        toast.error(`An unexpected error occurred. Please try again.`);
      }
    });
  };
  useEffect(() => {
    if (!userChoice.role) {
      navigate("/auth-choice");
    }
  }, [userChoice]);
  return (
    <AuthPage>
      <div className={styles.container}>
        <div className={styles.heading}>
          <h3 className={styles.letGetStarted}>Let’s get started!</h3>
          <p className={styles.createText}>
            Create your account in minutes to start booking
          </p>
        </div>
        <form className={styles.form} onSubmit={handleFormSubmit}>
          <div className={styles.NameWrapper}>
            <div className={styles.inputGroup}>
              <label htmlFor="firstName">First name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First name"
                value={firstName}
                onChange={(e) => handleInputChange(e, setFirstName)}
                pattern="[A-Za-z]*"
              />
              {formErrors.firstName && (
                <p className={styles.error}>{formErrors.firstName}</p>
              )}
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="lastName">Last name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => handleInputChange(e, setLastName)}
                pattern="[A-Za-z]*"
              />
              {formErrors.lastName && (
                <p className={styles.error}>{formErrors.lastName}</p>
              )}
            </div>
          </div>
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
          <div className={`${styles.inputGroup}`}>
            <label htmlFor="phone">Phone</label>
            <div
              className={`${styles.phoneNumberInput} ${
                styles.phoneInputWrapper
              }  ${phone.length ? styles.bglightGray : ""}`}
            >
              <CountrySelect
                labels={en}
                value={country}
                onChange={setCountry}
                phone={phone}
              />
              <div
                className={`${styles.divider} ${
                  phone.length ? styles.bglightGray : ""
                }`}
              ></div>
              <input
                value={phone}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={10}
                onChange={(e) => {
                  const sanitizedValue = e.target.value.replace(/\D/g, "");
                  setPhone(sanitizedValue);
                }}
                placeholder="Enter your phone number"
              />
            </div>
            {formErrors.phone && (
              <p className={styles.error}>{formErrors.phone}</p>
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
              onChange={(e) => {
                setPasswordError(false);
                setPassword(e.target.value);
              }}
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
                  Password must be at least 8 characters long, and must contain
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
          </div>
          <div className={styles.actions}>
            <PrimaryButton className={styles.action}>
              Create account
            </PrimaryButton>
            <p className={styles.alreadyHaveAccount}>
              Already have an account?{" "}
              <Link
                to={`${
                  userChoice.role.role === "partner"
                    ? "/partner/login"
                    : "/login"
                }`}
              >
                Log in
              </Link>
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
              onClick={googleAuthLogin}
            >
              <img src={Google_Logo} />
              Google
            </SecondaryButton>
            <LoginSocialFacebook
              appId={facebookAppId}
              onResolve={(response) => {
                facebookAuthLogin(response?.data);
              }}
              onReject={(error) => {
                console.log(error);
              }}
            >
              <SecondaryButton className={styles.facebook}>
                <img src={Facebook_Logo} />
                Facebook
              </SecondaryButton>
            </LoginSocialFacebook>
          </div>
        </div>
        <div className={styles.termsWrapper}>
          <p className={styles.terms}>
            By creating an account, you agree to our{" "}
            <a href="#">Terms of use</a> and <a href="#">Privacy policy</a>
          </p>
        </div>
      </div>
    </AuthPage>
  );
};

export default CreateAccountPage;
