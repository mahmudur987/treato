import styles from "./PasswordChange.module.css";
import moreVertical from "../../../assets/images/AccountSettings/more-vertical.svg"
import { useState } from "react";

export default function PasswordChange({setPassModal}){
    
    return(
        <div className={styles.passMain}>
            <div className={styles.passA}>
                Password
            </div>
            <div className={styles.passB}>
                You can login with shreya2716@gmail.com and your password.
            </div>
            <div className={styles.passC} onClick={()=>setPassModal(true)}>
                Change Password
            </div>
        </div>
    )
}