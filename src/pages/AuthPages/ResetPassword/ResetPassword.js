import React, { useState } from "react";
import AuthPage from "../../../layouts/AuthPageLayout/AuthPage";
import PrimaryButton from "../../../components/Buttons/PrimaryButton/PrimaryButton";
import styles from "./ResetPassword.module.css";
import { eyeline } from "../../../assets/images/icons";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { resetPassword } from "../../../services/auth";
import { toast } from "react-toastify";
import img from "../../../assets/icons/Success Circle.png";
import LoadSpinner from "../../../components/LoadSpinner/LoadSpinner";
const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [paramsInfo, setparamsInfo] = useState({});
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMEssage, seterrorMEssage] = useState("");
  const [complete, setComplete] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    // Parse the URL to extract the id and token
    const urlParams = new URLSearchParams(window.location.search);
    let data = {
      id: urlParams.get("id"),
      token: urlParams.get("token"),
    };
    setparamsInfo(data);
    if (!data.id || !data.token) {
      navigate("/forgot-password");
    }
  }, []);

  // Add the regex pattern for password validation
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%^&*])[A-Za-z\d@$!%^&*]{8,}$/;

  const handleSavePassword = () => {
    seterrorMEssage("");
    if (newPassword === confirmPassword) {
      // Passwords match, now validate against the regex pattern
      if (passwordRegex.test(newPassword)) {
        // Password is valid, proceed to save

        setLoading(true);

        resetPassword(paramsInfo.id, paramsInfo.token, confirmPassword).then(
          (res) => {
            console.log(res);
            if (res.success === true) {
              setComplete(true);
              toast.success("Password updated successfully");
              setLoading(false);
            } else if (res.success === false) {
              console.log(res.error.response.data.message);
              seterrorMEssage(res.error.response.data.message);
            }
          }
        );
      } else {
        seterrorMEssage(
          "Password must contain at least 8 characters, including at least one letter, one number, and one special character."
        );
      }
    } else {
      seterrorMEssage("Passwords do not match");
    }
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  if (loading) {
    return <LoadSpinner />;
  }

  return (
    <AuthPage>
      {!complete && (
        <div className={styles.ResetScreen}>
          <h1>Reset your password</h1>
          <h3>
            Set a new password for your registered account{" "}
            <span>{localStorage?.getItem("userEmail")}</span>
          </h3>
          <div className={styles.inputGroup}>
            <label htmlFor="newPassword">New Password</label>
            <div className={styles.inputWrap}>
              <input
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <img loading="lazy"
                src={eyeline}
                alt="eyeIcon"
                className={styles.eyeIcon}
                onClick={toggleNewPasswordVisibility}
              />
            </div>
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className={styles.inputWrap}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <img loading="lazy"
                src={eyeline}
                alt="eyeIcon"
                className={styles.eyeIcon}
                onClick={toggleConfirmPasswordVisibility}
              />
            </div>
          </div>
          <div className={styles.error}>{errorMEssage}</div>
          <PrimaryButton
            className={styles.submitBtn}
            onClick={handleSavePassword}
          >
            Save Password
          </PrimaryButton>
        </div>
      )}

      {complete && (
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <h2>Password reset successful</h2>
            <figure>
              <img loading="lazy" src={img} alt="im" />
            </figure>
            <p>
              {" "}
              You have successfully reset your Treato password. Click below to
              sign in with your new password.{" "}
            </p>
            <Link to={"/login"}>
              <button>Sign in</button>
            </Link>
          </div>
        </div>
      )}
    </AuthPage>
  );
};

export default ResetPassword;
