import React, { useState } from "react";
import PrimaryButton from "../../Buttons/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../Buttons/SecondaryButton/SecondaryButton";
import styles from "./CreateAccountPage.module.css";
import AuthPage from "../../../layouts/AuthPageLayout/AuthPage";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import {
  Facebook_Logo,
  Google_Logo,
  eyeline,
  arrowleft,
} from "../../../assets/images/icons";
import { Link } from "react-router-dom";

const CreateAccountPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formErrors, setFormErrors] = useState({});

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
      firstName,
      lastName,
      email,
      phone,
      password,
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
                placeholder="Firstname"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
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
                placeholder="Lastname"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
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
              Create Account
            </PrimaryButton>
            <p className={styles.alreadyHaveAccount}>
              Already have an account? <Link to="/login">Log in</Link>
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
