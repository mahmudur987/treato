import { useSelector } from "react-redux";
import styles from "./PasswordChange.module.css";

export default function PasswordChange({ setPassModal }) {
  let data = useSelector((state) => state.user);

  console.log(data);
  return (
    <div className={styles.passMain}>
      <div className={styles.passA}>Password</div>
      <div className={styles.passB}>You can login with {data?.user.email}.</div>
      <div className={styles.passC} onClick={() => setPassModal(true)}>
        Change Password
      </div>
    </div>
  );
}
