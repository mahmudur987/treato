import styles from "./ProfileView.module.css";
import userImg from "../../../assets/images/AccountSettings/userImg.png"
import pencilIco from "../../../assets/images/AccountSettings/pencilIco.svg"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { convertToMonthYear } from "../../../utils/utils";

export default function ProfileView({ setProfileModal, logOut, inputVal }) {
    const [selectedImage, setSelectedImage] = useState(null);
    const userDetails = useSelector((state) => state?.user?.user);

    useEffect(() => {
        setSelectedImage(userDetails?.avatar?.public_url)
    }, [userDetails])



    return (
        <div className={styles.user_profile}>
            <div className={styles.user_img_main}>
                <div>
                    <img loading="lazy" src={inputVal?.avatar?.public_url ? inputVal?.avatar?.public_url : selectedImage || userImg} alt="" className={styles.user_img} />
                </div>
                <div className={styles.user_img_edit} onClick={() => setProfileModal(true)}>
                    <img loading="lazy" src={pencilIco} alt="editIcon" />
                </div>
            </div>
            <div className={styles.user_name}>
                {userDetails?.first_name ? userDetails?.first_name : "N/A"}
            </div>
            <div>
                Member since {convertToMonthYear(userDetails?.created)}
            </div>
            <div className={styles.user_borderLine}></div>
            <div>
                <button className={styles.user_sign_btn} onClick={logOut}>Sign Out</button>
            </div>
        </div>
    )
}