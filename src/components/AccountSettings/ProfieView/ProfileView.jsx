import styles from "./ProfileView.module.css";
import userImg from "../../../assets/images/AccountSettings/userImg.png"
import pencilIco from "../../../assets/images/AccountSettings/pencilIco.svg"

export default function ProfileView({setProfileModal,logOut}){
    return(
        <div className={styles.user_profile}>
            <div className={styles.user_img_main}>
                <div>
                    <img src={userImg} alt="" className={styles.user_img}/>
                </div>
                <div className={styles.user_img_edit} onClick={()=>setProfileModal(true)}>
                    <img src={pencilIco} alt=""/>
                </div>
            </div>
            <div className={styles.user_name}>
                Shreya Avasthi
            </div>
            <div>
                Member since July 2023
            </div>
            <div className={styles.user_borderLine}></div>
            <div>
                <button className={styles.user_sign_btn} onClick={logOut}>Sign Out</button>
            </div>
        </div>
    )
}