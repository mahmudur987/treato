import React from "react";
import styles from "./PasswordChange.module.css";

const SetPassword = ({ setPassActiveModal }) => {
  const openActiveModal =()=>{
    setPassActiveModal(true)
  }
  return (
    <div className={styles.passMain}>
      <div className={styles.passA}>Password</div>

      <div className={styles.passC} onClick={openActiveModal}>
        Set Password
      </div>
    </div>
  );
};

export default SetPassword;
