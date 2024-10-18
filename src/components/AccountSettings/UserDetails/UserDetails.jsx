import styles from "./UserDetails.module.css";
import editImg from "../../../assets/images/AccountSettings/edit.svg";
import { useState, useEffect, memo } from "react";
import BasicInput from "../../Input/BasicInput/BasicInput";
import PhoneInput from "../../Input/PhoneInput/PhoneInput";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./ReactCalendar.css";

export default function UserDetails({
  mobView,
  setOtpModal,
  setShowSave,
  updateInputState,
  inputState,
  updateInputVal,
  inputVal,
  updateGender,
  activeGender,
}) {
  const [value, onChange] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const toggleEditState = (field) => {
    const newInputState = { ...inputState, [field]: !inputState[field] };
    updateInputState(newInputState);
    setShowSave(true);
  };

  const handleCalendarChange = (date, event) => {
    const dob =
      event.target.getAttribute("aria-label") ||
      event.target.children[0]?.getAttribute("aria-label");
    const newInputVal = { ...inputVal, dob };
    updateInputVal(newInputVal);
    setShowCalendar(!showCalendar);
  };

  return (
    <div>
      <div className={styles.usr_detail_head}>
        {mobView !== undefined ? mobView : "Basic Details"}
      </div>
      <div className={styles.usr_detail_body}>
        {/* First Name */}
        <div className={styles.usr_detail_box}>
          <label htmlFor="first_name">
            <div className={styles.usr_detail_label}>First Name</div>
            <BasicInput
              Type={"text"}
              VALUE={inputVal?.first_name}
              DISABLED={inputState?.first_name}
              id={"first_name"}
              NAME={"first_name"}
              updateInputVal={updateInputVal}
              inputVal={inputVal}
            />
          </label>
          <img
            loading="lazy"
            src={editImg}
            alt=""
            className={styles.usr_detail_edit}
            onClick={() => toggleEditState("first_name")}
          />
        </div>

        {/* Last Name */}
        <div className={styles.usr_detail_box}>
          <label htmlFor="last_name">
            <div className={styles.usr_detail_label}>Last Name</div>
            <BasicInput
              Type={"text"}
              VALUE={inputVal?.last_name}
              DISABLED={inputState?.last_name}
              id={"last_name"}
              NAME={"last_name"}
              updateInputVal={updateInputVal}
              inputVal={inputVal}
            />
          </label>
          <img
            loading="lazy"
            src={editImg}
            alt=""
            className={styles.usr_detail_edit}
            onClick={() => toggleEditState("last_name")}
          />
        </div>

        {/* Email */}
        <div className={styles.usr_detail_box}>
          <label htmlFor="email">
            <div className={styles.usr_detail_label}>
              Email (used to log into your account)
            </div>
            <BasicInput
              Type={"email"}
              VALUE={inputVal?.email}
              DISABLED={inputState?.email}
              id={"email"}
              NAME={"email"}
              updateInputVal={updateInputVal}
              inputVal={inputVal}
            />
          </label>
          <img
            loading="lazy"
            src={editImg}
            alt=""
            className={styles.usr_detail_edit}
            onClick={() => toggleEditState("email")}
          />
        </div>

        {/* Phone */}
        <div className={styles.usr_detail_box}>
          <label htmlFor="phone">
            <div className={styles.usr_detail_label}>Phone</div>
            <PhoneInput
              Type={"tel"}
              VALUE={inputVal?.phone}
              DISABLED={inputState?.phone}
              id={"phone"}
              NAME={"phone"}
              updateInputVal={updateInputVal}
              inputVal={inputVal}
            />
          </label>
          <img
            loading="lazy"
            src={editImg}
            alt=""
            className={styles.usr_detail_edit}
            onClick={() => toggleEditState("phone")}
          />
        </div>

        {/* Date of Birth */}
        <div className={styles.usr_detail_box}>
          <label htmlFor="dob">
            <div className={styles.usr_detail_label}>Date of Birth</div>
            <BasicInput
              Type={"text"}
              VALUE={inputVal?.dob || "Enter Your Date Of Birth"}
              DISABLED={true}
              id={"dob"}
              NAME={"dob"}
              updateInputVal={updateInputVal}
              inputVal={inputVal}
            />
          </label>
          <img
            loading="lazy"
            src={editImg}
            alt=""
            className={styles.usr_detail_edit}
            onClick={() => {
              toggleEditState("dob");
              setShowCalendar((prev) => !prev);
            }}
          />
        </div>

        {/* Gender */}
        <div className={styles.usr_detail_box}>
          <label htmlFor="gender">
            <div className={styles.usr_detail_label}>Gender</div>
            <div
              className={styles.usr_genders}
              onClick={() => setShowSave(true)}
            >
              {["male", "female", "non-binary", "other"].map((gender) => (
                <div
                  key={gender}
                  className={
                    activeGender === gender
                      ? `${styles.usr_detail_gender} ${styles.active_gender}`
                      : styles.usr_detail_gender
                  }
                  onClick={() => updateGender(gender)}
                >
                  {gender.charAt(0).toUpperCase() + gender.slice(1)}
                </div>
              ))}
            </div>
          </label>
        </div>
      </div>

      {/* Calendar */}
      {showCalendar && (
        <div className="acc_calendar acc_calendar_active">
          <Calendar
            onChange={onChange}
            value={value}
            onClickDay={handleCalendarChange}
          />
        </div>
      )}
    </div>
  );
}

export const MemoizedUserDetails = memo(UserDetails);
