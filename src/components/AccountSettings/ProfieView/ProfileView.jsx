import styles from "./ProfileView.module.css";
import userImg from "../../../assets/images/AccountSettings/userImg.png"
import pencilIco from "../../../assets/images/AccountSettings/pencilIco.svg"

export default function ProfileView({setProfileModal}){
    return(
        <div className={styles.user_profile}>
            <div className={styles.user_img_main}>
                <div>
                    <img src={userImg} alt="" className={styles.user_img}/>
                </div>
                <div className={styles.user_img_edit}>
                    <img src={pencilIco} alt="" onClick={()=>setProfileModal(true)}/>
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
                <button className={styles.user_sign_btn}>Sign Out</button>
            </div>
        </div>
    )
}