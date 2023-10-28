import styles from "./UserDetails.module.css";
import editImg from "../../../assets/images/AccountSettings/edit.svg"
import { useState, useEffect } from "react";
import BasicInput from "../../Input/BasicInput/BasicInput";
import PhoneInput from "../../Input/PhoneInput/PhoneInput";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './ReactCalendar.css'

export default function UserDetails({ mobView, setOtpModal,setShowSave,updateInputState,inputState,updateInputVal,inputVal,updateGender,activeGender }) {
    const [value, onChange] = useState(new Date());
    let [showCalendar, setShowCalendar] = useState(false)

    let updateInput = (data) => {
        let newInputState = { ...inputState }
        newInputState[Object.keys(data)[0]] === true ? newInputState[Object.keys(data)[0]] = false : newInputState[Object.keys(data)[0]] = true;
        updateInputState(newInputState)
        setShowSave(true)
    }

    let updateCalendar = (value, event) => {
        let data = { ...inputVal };
        if (event.target.type === 'button') {
            data.user_dob = event.target.children[0].getAttribute("aria-label")
        } else {
            data.user_dob = event.target.getAttribute("aria-label")
        }
        updateInputVal(data)
        setShowCalendar(prev => !prev)
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
                        <label htmlFor="f_name">
                            <div className={styles.usr_detail_label}>First Name</div>
                            <BasicInput Type={'text'} VALUE={inputVal.f_name} DISABLED={inputState.f_name} id={"f_name"} NAME={"f_name"} updateInputVal={updateInputVal} inputVal={inputVal} />
                        </label>

                        <img src={editImg} alt="" className={styles.usr_detail_edit} onClick={() => updateInput(inputState.f_name ? { f_name: false } : { f_name: true })} />

                    </div>
                    <div className={styles.usr_detail_box}>
                        <label htmlFor="l_name">
                            <div className={styles.usr_detail_label}>Last Name</div>
                            <BasicInput Type={'text'} VALUE={inputVal.l_name} DISABLED={inputState.l_name} id={"l_name"} NAME={"l_name"} updateInputVal={updateInputVal} inputVal={inputVal} />
                        </label>

                        <img src={editImg} alt="" className={styles.usr_detail_edit} onClick={() => updateInput(inputState.l_name ? { l_name: false } : { l_name: true })} />
                    </div>
                    <div className={styles.usr_detail_box}>
                        <label htmlFor="email">
                            <div className={styles.usr_detail_label}>Email (used to log into your account)</div>
                            <BasicInput Type={'email'} VALUE={inputVal.user_email} DISABLED={inputState.user_email} id={"email"} NAME={"user_email"} updateInputVal={updateInputVal} inputVal={inputVal} />
                        </label>

                        <img src={editImg} alt="" className={styles.usr_detail_edit} onClick={() => updateInput(inputState.email ? { user_email: false } : { user_email: true })} />
                    </div>
                    <div className={styles.usr_detail_box}>
                        <label htmlFor="user_tel">
                            <div className={styles.usr_detail_label}>Phone</div>
                            <PhoneInput Type={'tel'} VALUE={inputVal.user_tel} DISABLED={inputState.user_tel} id={"user_tel"} NAME={"user_tel"} updateInputVal={updateInputVal} inputVal={inputVal} />
                        </label>
                        <div>
                        </div>
                        <img src={editImg} alt="" className={styles.usr_detail_edit} onClick={() => setOtpModal(true)} />
                    </div>
                    <div className={styles.usr_detail_box}>
                        <label htmlFor="user_dob">
                            <div className={styles.usr_detail_label}>Date of Birth</div>
                            <BasicInput Type={'text'} VALUE={inputVal.user_dob!==''?inputVal.user_dob:'Enter Your Date Of Birth'} DISABLED={true} id={"user_dob"} NAME={"user_dob"} updateInputVal={updateInputVal} inputVal={inputVal} />
                        </label>

                        <img src={editImg} alt="" className={styles.usr_detail_edit} onClick={() => { updateInput(inputState.user_dob ? { user_dob: false } : { user_dob: true }); setShowCalendar(prev => !prev) }} />
                    </div>
                    <div className={styles.usr_detail_box}>
                        <label htmlFor="user_gender">
                            <div className={styles.usr_detail_label}>Gender</div>
                            <div className={styles.usr_genders} >
                                <div className={activeGender.index !== 1||inputVal.gender==='male' ? styles.usr_detail_gender : `${styles.usr_detail_gender} ${styles.active_gender}`} onClick={() => updateGender({ index: 1, value: 'male' })}>Male</div>
                                <div className={activeGender.index !== 2||inputVal.gender==='female' ? styles.usr_detail_gender : `${styles.usr_detail_gender} ${styles.active_gender}`} onClick={() => updateGender({ index: 2, value: 'female' })}>Female</div>
                                <div className={activeGender.index !== 3||inputVal.gender==='non-binary' ? styles.usr_detail_gender : `${styles.usr_detail_gender} ${styles.active_gender}`} onClick={() => updateGender({ index: 3, value: 'non-binary' })}>Non-Binary</div>
                                <div className={activeGender.index !== 4||inputVal.gender==='other' ? styles.usr_detail_gender : `${styles.usr_detail_gender} ${styles.active_gender}`} onClick={() => updateGender({ index: 4, value: 'other' })}>Other</div>
                            </div>
                        </label>
                    </div>
                </div>
            <div className={showCalendar ? "acc_calendar acc_calendar_active" : "acc_calendar"}>
                <Calendar onChange={onChange} value={value} onClickDay={updateCalendar} />
            </div>
        </div>
    )
}