import styles from "./ProfileView.module.css";
import userImg from "../../../assets/images/AccountSettings/userImg.png";
import pencilIco from "../../../assets/images/AccountSettings/pencilIco.svg";

export default function ProfileView({ setProfileModal, logOut, user }) {
  return (
    <div className={styles.user_profile}>
      <div className={styles.user_img_main}>
        <div>
          <img
            src={user?.avatar?.public_url ?? userImg}
            alt=""
            className={styles.user_img}
          />
        </div>
        <div
          className={styles.user_img_edit}
          onClick={() => setProfileModal(true)}
        >
          <img src={pencilIco} alt="" />
        </div>
      </div>
      <div className={styles.user_name}>
        {user?.first_name} {user?.last_name}{" "}
      </div>
      <div>
        Member since{" "}
        {new Date(user?.created).toLocaleString("en-US", {
          month: "long",
          year: "numeric",
        })}
      </div>
      <div className={styles.user_borderLine}></div>
      <div>
        <button className={styles.user_sign_btn} onClick={logOut}>
          Sign Out
        </button>
      </div>
    </div>
  );
}
