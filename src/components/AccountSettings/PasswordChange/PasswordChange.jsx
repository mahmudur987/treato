import { useSelector } from "react-redux";
import styles from "./PasswordChange.module.css";

export default function PasswordChange({ setPassModal }) {
  let data = useSelector((state) => state.user);

const openOtpModal=()=>{
  setPassModal(true)
}

  return (
    <div className={styles.passMain}>
      <div className={styles.passA}>Password</div>
      <div className={styles.passB}>You can login with {data?.user.email}.</div>
      <div className={styles.passC} onClick={openOtpModal}>
        Change Password
      </div>
    </div>
  );
}
