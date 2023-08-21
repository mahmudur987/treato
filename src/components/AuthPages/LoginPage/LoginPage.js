import React, { useState } from "react";
import PrimaryButton from "../../Buttons/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../Buttons/SecondaryButton/SecondaryButton";
import styles from "./LoginPage.module.css";
import AuthPage from "../../../pages/AuthPages/AuthPage";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import {
  Facebook_Logo,
  Google_Logo,
  eyeline,
  arrowleft,
} from "../../../assets/images/icons";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showEmailPassword, setShowEmailPassword] = useState(true);
  const [formErrors, setFormErrors] = useState({});

  const handleOTPForm = () => {
    setShowEmailPassword(false);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const errors = {};

    if (!email) {
      errors.email = "Email address is required";
    }
    if (!phone) {
      errors.phone = "Phone number is required";
    }
    // Password validation logic
    if (!password) {
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
    if (Object.keys(errors).length === 0) {
      console.log(formData);
      // return;
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
              </div>
            </>
          )}
          {!showEmailPassword && (
            <div className={styles.inputGroup}>
              <label htmlFor="phone">Phone</label>
              <PhoneInput
                defaultCountry="IN"
                placeholder="Enter phone number"
                onChange={(value) => setPhone(value)}
                international
                countryCallingCodeEditable={false}
              />
              {formErrors.phone && (
                <p className={styles.error}>{formErrors.phone}</p>
              )}
            </div>
          )}
          <div className={styles.actions}>
            <PrimaryButton className={styles.action}>Sign in</PrimaryButton>

            {showEmailPassword && (
              <div onClick={handleOTPForm}>
                <SecondaryButton className={styles.action}>
                  Sign in using OTP
                </SecondaryButton>
              </div>
            )}
            <p className={styles.alreadyHaveAccount}>
              Don’t have an account?{" "}
              <a href="/create-account">Create account</a>
            </p>
          </div>
        </form>
        <div className={styles.social}>
          <p className={styles.continueWith}>
            <span></span>Or simply continue with <span></span>
          </p>
          <div className={styles.socialButtons}>
            <SecondaryButton className={styles.google}>
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
