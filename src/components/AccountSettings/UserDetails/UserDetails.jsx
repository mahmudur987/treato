import styles from "./UserDetails.module.css";
import editImg from "../../../assets/images/AccountSettings/edit.svg"
import { useState } from "react";
import BasicInput from "../../Input/BasicInput/BasicInput";
import PhoneInput from "../../Input/PhoneInput/PhoneInput";

export default function UserDetails({ mobView }) {
    let [activeGender, updateGender] = useState(0);
    let [inputState, updateInputState] = useState(
        {
            f_name: true,
            l_name: true,
            email: true,
            phone: true,
            dob: true
        }
    );
    let [inputVal, updateInputVal] = useState(
        {
            f_name: 'Sarah',
            l_name: 'Avasthi',
            user_email: 'shreya2716@gmail.com',
            user_tel: '9274611991',
            user_dob: '2013-01-08'
        }
    );

    let updateInput = (data) => {
        let newInputState = { ...inputState }
        newInputState[Object.keys(data)[0]] === true ? newInputState[Object.keys(data)[0]] = false : newInputState[Object.keys(data)[0]] = true;
        updateInputState(newInputState)
    }

    return (
        <div>
            <div className={styles.usr_detail_head}>
                {
                    mobView !== undefined ? mobView : 'Basic Details'
                }
            </div>
            <div className={styles.usr_detail_body}>
                <div className={styles.usr_detail_box}>
                    <label htmlFor="f_name" className={styles.usr_detail_label}>First Name</label>

                    <BasicInput Type={'text'} VALUE={inputVal.f_name} DISABLED={inputState.f_name} id={"f_name"} NAME={"f_name"} updateInputVal={updateInputVal} inputVal={inputVal} />

                    <img src={editImg} alt="" className={styles.usr_detail_edit} onClick={() => updateInput(inputState.f_name ? { f_name: false } : { f_name: true })} />

                </div>
                <div className={styles.usr_detail_box}>
                    <label htmlFor="l_name" className={styles.usr_detail_label}>Last Name</label>

                    <BasicInput Type={'text'} VALUE={inputVal.l_name} DISABLED={inputState.l_name} id={"l_name"} NAME={"l_name"} updateInputVal={updateInputVal} inputVal={inputVal} />

                    <img src={editImg} alt="" className={styles.usr_detail_edit} onClick={() => updateInput(inputState.l_name ? { l_name: false } : { l_name: true })} />
                </div>
                <div className={styles.usr_detail_box}>
                    <label htmlFor="email" className={styles.usr_detail_label}>Email (used to log into your account)</label>

                    <BasicInput Type={'email'} VALUE={inputVal.user_email} DISABLED={inputState.email} id={"email"} NAME={"email"} updateInputVal={updateInputVal} inputVal={inputVal} />

                    <img src={editImg} alt="" className={styles.usr_detail_edit} onClick={() => updateInput(inputState.email ? { email: false } : { email: true })} />
                </div>
                <div className={styles.usr_detail_box}>
                    <label htmlFor="user_tel" className={styles.usr_detail_label}>Phone</label>
                    <div>
                        <PhoneInput Type={'tel'} VALUE={inputVal.user_tel} DISABLED={inputState.phone} id={"user_tel"} NAME={"user_tel"} updateInputVal={updateInputVal} inputVal={inputVal} />
                    </div>
                    <img src={editImg} alt="" className={styles.usr_detail_edit} onClick={() => updateInput(inputState.phone ? { phone: false } : { phone: true })} />
                </div>
                <div className={styles.usr_detail_box}>
                    <label htmlFor="user_dob" className={styles.usr_detail_label}>Date of Birth</label>

                    <BasicInput Type={'date'} VALUE={inputVal.user_dob} DISABLED={inputState.dob} id={"user_dob"} NAME={"user_dob"} updateInputVal={updateInputVal} inputVal={inputVal} />

                    <img src={editImg} alt="" className={inputState.dob ? styles.usr_detail_edit : styles.d_none} onClick={() => updateInput(inputState.dob ? { dob: false } : { dob: true })} />
                </div>
                <div className={styles.usr_detail_box}>
                    <label htmlFor="user_gender" className={`${styles.usr_detail_label} ${styles.usr_detail_gender_label}`}>Gender</label>
                    <div className={styles.usr_genders}>
                        <div className={activeGender !== 1 ? styles.usr_detail_gender : `${styles.usr_detail_gender} ${styles.active_gender}`} onClick={() => updateGender(activeGender === 1 ? 0 : 1)}>Male</div>
                        <div className={activeGender !== 2 ? styles.usr_detail_gender : `${styles.usr_detail_gender} ${styles.active_gender}`} onClick={() => updateGender(activeGender === 2 ? 0 : 2)}>Female</div>
                        <div className={activeGender !== 3 ? styles.usr_detail_gender : `${styles.usr_detail_gender} ${styles.active_gender}`} onClick={() => updateGender(activeGender === 3 ? 0 : 3)}>Non-Binary</div>
                        <div className={activeGender !== 4 ? styles.usr_detail_gender : `${styles.usr_detail_gender} ${styles.active_gender}`} onClick={() => updateGender(activeGender === 4 ? 0 : 4)}>Other</div>
                    </div>
                </div>
            </div>
        </div>
    )
}