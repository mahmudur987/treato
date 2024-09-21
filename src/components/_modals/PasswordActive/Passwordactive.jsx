import React, { useState } from "react";
import styles from "../ChangePass/ChangePass.module.css";
import Grey_Close from "../../../assets/images/icons/Grey_Close.svg";
import BasicInput from "../../Input/BasicInput/BasicInput";
import PrimaryButton from "../../Buttons/PrimaryButton/PrimaryButton";
import { toast } from "react-toastify";
import { setPass } from "../../../services/updatePass";
import styles2 from "./passwordactive.module.css";
const PasswordActive = ({ setPassActiveModal, updateMobileOpt }) => {
  let [error, showError] = useState(false);
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(true);

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };

  const validatePassword = (password) => {
    // Define the regular expressions for each validation rule
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isLengthValid = password.length >= 8;

    // Check if all validation rules are met
    const isValidPassword =
      hasLetter && hasNumber && hasSpecialCharacter && isLengthValid;

    setIsValid(isValidPassword);
  };

  let passUpdate = (e) => {
    e.preventDefault();

    if (e.target.newPass.value !== e.target.rePass.value) {
      return toast.error("password not match", { toastId: 5 });
    }

    const userJWt = localStorage.getItem("jwtToken");
    if (e.target.newPass.value !== "" && e.target.rePass.value !== "") {
      let formData = {
        password: e.target.newPass.value,
        confirmPassword: e.target.rePass.value,
      };

      console.log(userJWt, formData);
      setPass(userJWt, formData)
        .then((res) => {
          console.log(res);
          if (res.res) {
            setPassActiveModal(false);
            toast.success("successfully set your password", { toastId: 6 });
          } else {
            toast.error("Error");
          }
        })
        .catch((err) => {
          console.log(err);
        });
      showError(false);
    } else {
      showError(true);
    }
  };
  return (
    <div className={styles.passMain}>
      <div className={styles.passA}>
        <div className={styles.passB}>
          <div className={styles.passBA}>Set Password</div>
          <div className={styles.passBB}>
            <img 
            loading="lazy"
              src={Grey_Close}
              alt=""
              onClick={() => setPassActiveModal(false)}
            />
          </div>
        </div>
        <form id="passChange" onSubmit={passUpdate}>
          <div className={styles.passC}>
            <label htmlFor="newPass">
              <div className={styles.passCA}>New password</div>
              <div>
                <BasicInput
                  Type={"password"}
                  id={"newPass"}
                  PlaceHolder={"Enter the new password"}
                  NAME={"newPass"}
                  onChange={handlePasswordChange}
                />
                {!isValid && (
                  <p className={styles2.isvalid}>
                    Password should contain at least one letter, one number, one
                    special character, and be 8 characters long.
                  </p>
                )}
              </div>
            </label>
          </div>
          <div className={styles.passC}>
            <label htmlFor="rePass">
              <div className={styles.passCA}>Confirm new password</div>
              <div>
                <BasicInput
                  Type={"password"}
                  id={"rePass"}
                  PlaceHolder={"Re-enter your new password"}
                  NAME={"rePass"}
                />
              </div>
            </label>
            {error ? (
              <div className={styles.passError}>Please Fill All Fields</div>
            ) : null}
          </div>
          <PrimaryButton children={"Update"} form="passChange" />
        </form>
      </div>
    </div>
  );
};

export default PasswordActive;
