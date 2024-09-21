import styles from "./UserDetails.module.css";
import editImg from "../../../assets/images/AccountSettings/edit.svg"
import { useState, useEffect } from "react";
import BasicInput from "../../Input/BasicInput/BasicInput";
import PhoneInput from "../../Input/PhoneInput/PhoneInput";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './ReactCalendar.css'

export default function UserDetails({ mobView, setOtpModal, setShowSave, updateInputState, inputState, updateInputVal, inputVal, updateGender, activeGender }) {
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
            data.dob = event.target.children[0].getAttribute("aria-label")
        } else {
            data.dob = event.target.getAttribute("aria-label")
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
                    <label htmlFor="first_name">
                        <div className={styles.usr_detail_label}>First Name</div>
                        <BasicInput Type={'text'} VALUE={inputVal?.first_name} DISABLED={inputState?.first_name} id={"first_name"} NAME={"first_name"} updateInputVal={updateInputVal} inputVal={inputVal} />
                    </label>

                    <img loading="lazy" src={editImg} alt="" className={styles.usr_detail_edit} onClick={() => updateInput(inputState?.first_name ? { first_name: false } : { first_name: true })} />

                </div>
                <div className={styles.usr_detail_box}>
                    <label htmlFor="last_name">
                        <div className={styles.usr_detail_label}>Last Name</div>
                        <BasicInput Type={'text'} VALUE={inputVal?.last_name} DISABLED={inputState?.last_name} id={"last_name"} NAME={"last_name"} updateInputVal={updateInputVal} inputVal={inputVal} />
                    </label>

                    <img loading="lazy" src={editImg} alt="" className={styles.usr_detail_edit} onClick={() => updateInput(inputState?.last_name ? { last_name: false } : { last_name: true })} />
                </div>
                <div className={styles.usr_detail_box}>
                    <label htmlFor="email">
                        <div className={styles.usr_detail_label}>Email (used to log into your account)</div>
                        <BasicInput Type={'email'} VALUE={inputVal?.email} DISABLED={inputState?.email} id={"email"} NAME={"email"} updateInputVal={updateInputVal} inputVal={inputVal} />
                    </label>

                    <img loading="lazy" src={editImg} alt="" className={styles.usr_detail_edit} onClick={() => updateInput(inputState?.email ? { email: false } : { email: true })} />
                </div>
                <div className={styles.usr_detail_box}>
                    <label htmlFor="phone">
                        <div className={styles.usr_detail_label}>Phone</div>
                        <PhoneInput Type={'tel'} VALUE={inputVal?.phone} DISABLED={inputState?.phone} id={"phone"} NAME={"phone"} updateInputVal={updateInputVal} inputVal={inputVal} />
                    </label>
                    <div>
                    </div>
                    <img loading="lazy" src={editImg} alt="" className={styles.usr_detail_edit} onClick={() => updateInput(inputState.phone ? { phone: false } : { phone: true })} />
                </div>
                <div className={styles.usr_detail_box}>
                    <label htmlFor="dob">
                        <div className={styles.usr_detail_label}>Date of Birth</div>
                        <BasicInput Type={'text'} VALUE={inputVal?.dob !== '' ? inputVal?.dob : 'Enter Your Date Of Birth'} DISABLED={true} id={"dob"} NAME={"dob"} updateInputVal={updateInputVal} inputVal={inputVal} />
                    </label>

                    <img loading="lazy" src={editImg} alt="" className={styles.usr_detail_edit} onClick={() => { updateInput(inputState.dob ? { dob: false } : { dob: true }); setShowCalendar(prev => !prev) }} />
                </div>
                <div className={styles.usr_detail_box}>
                    <label htmlFor="gender">
                        <div className={styles.usr_detail_label}>Gender</div>
                        <div className={styles.usr_genders} onClick={() => setShowSave(true)}>
                            <div className={activeGender === 'male' ? `${styles.usr_detail_gender} ${styles.active_gender}` : styles.usr_detail_gender} onClick={() => updateGender('male')}>Male</div>
                            <div className={activeGender === 'female' ? `${styles.usr_detail_gender} ${styles.active_gender}` : styles.usr_detail_gender} onClick={() => updateGender('female')}>Female</div>
                            <div className={activeGender === 'non-binary' ? `${styles.usr_detail_gender} ${styles.active_gender}` : styles.usr_detail_gender} onClick={() => updateGender('non-binary')}>Non-Binary</div>
                            <div className={activeGender === 'other' ? `${styles.usr_detail_gender} ${styles.active_gender}` : styles.usr_detail_gender} onClick={() => updateGender('other')}>Other</div>
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