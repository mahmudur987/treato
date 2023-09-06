import React, { useState, useRef, useEffect } from "react";
import AuthPage from "../../../layouts/AuthPageLayout/AuthPage";
import PrimaryButton from "../../Buttons/PrimaryButton/PrimaryButton";
import styles from "./VerifyOTP.module.css";
import { Link } from "react-router-dom";
const VerifyOTP = () => {
  const [otp, setOTP] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleInputChange = (index, value) => {
    if (value.length > 1) {
      value = value.slice(0, 1); // Limit input to a single character
    }

    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleInputKeyDown = (event, index) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <AuthPage>
      <div className={styles.container}>
        <div className={styles.heading}>
        <h3 className={styles.VerifyOTP}>Verify OTP</h3>
        <h4 className={styles.enterOTPText}>
          Enter the OTP sent to to +91-9274611991.
        </h4>
        </div>
        <div className={styles.OTPWrapper}>
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={digit}
              onInput={(e) => {
                // Use a regular expression to remove non-numeric characters
                e.target.value = e.target.value.replace(/[^0-9]/g, '');
              }}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleInputKeyDown(e, index)}
              ref={(inputRef) => (inputRefs.current[index] = inputRef)}
              style={{ width: "30px", marginRight: "10px" }}
              className={styles.OTPinput}
              inputMode="numeric" // Specify numeric input mode
              pattern="[0-9]*" // Allow only numeric input
            />
          ))}
        </div>
        <div className={styles.submitWrapper}>
          <PrimaryButton className={styles.submitOTP}>Submit</PrimaryButton>
          <p className={styles.OTPtimer}>Didn’t receive OTP? <span className={styles.countdown}>Resend in 04:59</span> <Link className={styles.resendOTP}>Resend OTP</Link></p>
        </div>
      </div>
    </AuthPage>
  );
};

export default VerifyOTP;
