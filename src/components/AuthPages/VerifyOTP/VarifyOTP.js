import React, { useState, useRef, useEffect } from "react";
import AuthPage from "../../../layouts/AuthPageLayout/AuthPage";
import PrimaryButton from "../../Buttons/PrimaryButton/PrimaryButton";
import styles from "./VerifyOTP.module.css";
import { Link, useNavigate } from "react-router-dom";
import { otpsignin } from "../../../services/auth";
import { useDispatch } from "react-redux";
import { updateIsLoggedIn, updateUserDetails } from "../../../redux/slices/user";
import { toast } from "react-toastify";
const VerifyOTP = (props) => {
  const [otp, setOTP] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);
  const [receivedOTP, setreceivedOTP] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    inputRefs.current[0]?.focus();
    setreceivedOTP(props?.receivedOTP);
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

  const handleSubmit = () => {
    const enteredOTP = parseInt(otp.join("")); // Convert the OTP array to a string

    if (enteredOTP === receivedOTP.otp) {
      otpsignin({phoneNumber:receivedOTP.phoneNumber}).then((res)=>{
        if (res?.res?.status === 200 && res?.res?.data.token) {
          if (typeof localStorage !== "undefined") {
            // Use localStorage
            localStorage.setItem("jwtToken", res?.res.data.token);
            localStorage.setItem("userData",JSON.stringify(res?.res?.data.data))
            dispatch(updateIsLoggedIn(true));
            dispatch(updateUserDetails(res?.res?.data?.data));
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
          } else {
            console.error("localStorage is not available.");
          }
        }
      })
      // Perform the action you want if the OTP is matched (e.g., navigate to a different page)
    } else {
      console.log(enteredOTP,receivedOTP,false);
      // Handle the case where the OTP doesn't match
    }
  };

  return (
    <AuthPage>
      <div className={styles.container}>
        <div className={styles.heading}>
          <h3 className={styles.VerifyOTP}>Verify OTP</h3>
          <h4 className={styles.enterOTPText}>
            Enter the OTP sent to  {receivedOTP.phoneNumber?receivedOTP.phoneNumber:"your number"}.
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
                e.target.value = e.target.value.replace(/[^0-9]/g, "");
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
          <PrimaryButton className={styles.submitOTP} onClick={handleSubmit}>Submit</PrimaryButton>
          <p className={styles.OTPtimer}>
            Didn’t receive OTP?{" "}
            <span className={styles.countdown}>Resend in 04:59</span>{" "}
            <Link className={styles.resendOTP}>Resend OTP</Link>
          </p>
        </div>
      </div>
    </AuthPage>
  );
};

export default VerifyOTP;
