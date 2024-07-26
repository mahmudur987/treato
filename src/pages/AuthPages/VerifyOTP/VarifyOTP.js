import React, { useState, useRef, useEffect } from "react";
import AuthPage from "../../../layouts/AuthPageLayout/AuthPage";
import styles from "./VerifyOTP.module.css";
import { useNavigate } from "react-router-dom";
import { getUserProfile, register, sendLoginOTP } from "../../../services/auth";
import { useDispatch, useSelector } from "react-redux";
import {
  resetTempLoginInfo,
  updateIsLoggedIn,
  updateOTP,
  updateUserDetails,
} from "../../../redux/slices/user";
import { toast } from "react-toastify";
import PrimaryButton from "../../../components/Buttons/PrimaryButton/PrimaryButton";
import { createSalon } from "../../../services/salon";
const VerifyOTP = (props) => {
  const [otp, setOTP] = useState(["", "", "", ""]);
  const [OTPerror, setOTPerror] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");
  const [countdown, setCountdown] = useState(299);
  const [requiredRegisterData, setRequiredRegisterData] = useState("");
  const [isRegister, setisRegister] = useState(false);

  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.user);
  useEffect(() => {
    inputRefs.current[0]?.focus();
    if (
      localStorage.getItem("requiredRegisterData") !== undefined ||
      localStorage.getItem("requiredRegisterData") !== null
    ) {
      setRequiredRegisterData(
        JSON.parse(localStorage.getItem("requiredRegisterData"))
      );
      setisRegister(true);
      console.log(userDetails.OTP);
    } else {
      setisRegister(false);
    }
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

  const resendLoginOTP = () => {
    let data = {
      phoneNumber:
        userDetails?.tempLoginInfo.phone ||
        localStorage.getItem("userPhoneNumber"),
    };
    console.log(data);
    sendLoginOTP(data).then((res) => {
      console.log(res);
      if (res?.res?.data.otp) {
        dispatch(updateOTP(res?.res?.data.otp));
        toast.success("OTP resend successfully!");
        setCountdown(299);
      }
    });
  };
  const handleSubmit = () => {
    const enteredOTP = parseInt(otp.join("")); // Convert the OTP array to a string
    setOTPerror(false);
    if (!isRegister) {
      //handle verifyOTP  while [login]
      console.log("login");
      let phoneNumber = localStorage.getItem("userPhoneNumber");
      console.log(phoneNumber, userDetails.OTP);
      if (enteredOTP === userDetails.OTP) {
        let requiredLoginData = localStorage.getItem("requiredLoginData");
        let requiredLoginToken = localStorage.getItem("requiredLoginToken");

        let jwtToken = requiredLoginToken;
        let userData =
          userDetails?.tempLoginInfo || JSON.parse(requiredLoginData);
        if (typeof localStorage !== "undefined") {
          // Use localStorage
          localStorage.setItem("jwtToken", jwtToken);
          dispatch(updateIsLoggedIn(true));
          dispatch(updateUserDetails(userData));
          dispatch(resetTempLoginInfo({}));
          dispatch(updateOTP(0));
          localStorage.removeItem("requiredLoginData");
          localStorage.removeItem("requiredLoginToken");
          localStorage.removeItem("userPhoneNumber");

          navigate("/");
          toast("Welcome to Treato! Start exploring now!");
        } else {
          console.error("localStorage is not available.");
        }
      } else if (otp.join("") === "") {
        setOTPerror(true);
        seterrorMessage("Please fill the OTP");
      } else {
        setOTPerror(true);
        seterrorMessage("Invalid OTP");
      }
    } else {
      console.log("registration", enteredOTP, userDetails.OTP);
      if (enteredOTP === userDetails.OTP) {
        register(requiredRegisterData).then((res) => {
          if (
            res?.res?.data.message === "User Information Saved Successfully"
          ) {
            localStorage.setItem("jwtToken", res?.res?.data.token);
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
            //TODO:need to add user data in localStorage
          } else {
            setOTPerror(true);
            seterrorMessage(res?.err.response.data.message);
          }
          console.log(res);
        });
      } else if (otp.join("") === "") {
        setOTPerror(true);
        seterrorMessage("Please fill the OTP");
      } else {
        // Handle the case where the OTP doesn't match
        setOTPerror(true);
        seterrorMessage("Invalid OTP");
      }
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1);
      }
    }, 1000);

    // Clear the timer when the component unmounts
    return () => clearInterval(timer);
  }, [countdown]);

  return (
    <AuthPage>
      <div className={styles.container}>
        <div className={styles.heading}>
          <h3 className={styles.VerifyOTP}>Verify OTP</h3>
          <h4 className={styles.enterOTPText}>
            Enter the OTP sent to{" "}
            {localStorage.getItem("userPhoneNumber") || "your number"}.
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
        {OTPerror && <div className={styles.error}>{errorMessage}</div>}
        <div className={styles.submitWrapper}>
          <PrimaryButton className={styles.submitOTP} onClick={handleSubmit}>
            Submit
          </PrimaryButton>
          <p className={styles.OTPtimer}>
            Didn’t receive OTP?{" "}
            {countdown === 0 ? (
              <p className={styles.resendOTP} onClick={resendLoginOTP}>
                Resend OTP
              </p>
            ) : (
              <p className={styles.OTPtimer}>
                <span className={styles.countdown}>
                  Resend in {`${Math.floor(countdown / 60)}`.padStart(2, "0")}:
                  {`${countdown % 60}`.padStart(2, "0")}
                </span>
              </p>
            )}
          </p>
        </div>
      </div>
    </AuthPage>
  );
};

export default VerifyOTP;
