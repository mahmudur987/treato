import React, { useRef, useState } from "react";
import styles from "./PersonalDetails.module.css";
import { Link } from "react-router-dom";
import penIcon from "../../../assets/icons/penIcon.png";
import { toast } from "react-toastify";
function validatePhoneNumber(phoneNumber) {
  const isNumeric = /^\d+$/.test(phoneNumber);

  if (!isNumeric) {
    return false;
  }

  return true;
}
const PersonalDetails = () => {
  const dateInputRef = useRef(null);
  const [date, setDate] = useState("Oct 8 ,2022");
  const [activeGender, setActiveGender] = useState("male");
  const [firstName, setFirstName] = useState("First Name");
  const [LastName, setLastName] = useState("Last Name");
  const [Email, setEmail] = useState("Email");
  const [countryCode, setCountryCode] = useState("+91");
  const [Phone, setPhone] = useState("Mobile Number");
  const [active, setActive] = useState({
    firstName: true,
    lastName: true,
    email: true,
    phone: true,
    gender: true,
  });

  const updateGender = (value) => {
    setActiveGender(value);
  };
  const handleWrapperClick = () => {
    dateInputRef.current.showPicker();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let PhoneNumber = countryCode + Phone;
    const isValid = validatePhoneNumber(Phone);

    if (firstName === "First Name") {
      return toast.error("write your First name");
    }
    if (firstName === "Last Name") {
      return toast.error("write your Last name");
    }
    if (firstName === "Email") {
      return toast.error("write your Email");
    }
    if (
      firstName === "Mobile Number" ||
      PhoneNumber.length !== 13 ||
      !isValid
    ) {
      return toast.error("write your valid contact number");
    }

    console.log({
      firstName,
      LastName,
      PhoneNumber,
      Email,
      activeGender,
      date,
    });
  };

  return (
    <main className={styles.mainContainer}>
      <Link
        to={"/partner/dashboard/PartnerAccountSetting"}
        className={styles.backLink}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M19 12H5"
            stroke="#08090A"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12 19L5 12L12 5"
            stroke="#08090A"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </Link>

      <section className={styles.container}>
        <header className={styles.header}>
          <Link to={"/partner/dashboard/service"} className={styles.backLink}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M19 12H5"
                stroke="#08090A"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12 19L5 12L12 5"
                stroke="#08090A"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Link>
          <h1>Personal Details</h1>
        </header>

        <div className={styles.formHeader}>
          <h2>Basic Details</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.form}>
            <div className={styles.formItem}>
              <label htmlFor="First Name">First Name</label>

              <div className={styles.inputWrapper}>
                <input
                  value={firstName}
                  type="text"
                  id="First Name"
                  name="firstName"
                  disabled={active.firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />

                <img
                  src={penIcon}
                  alt=""
                  onClick={() =>
                    setActive((pre) => {
                      return {
                        ...pre,
                        firstName: !pre.firstName,
                      };
                    })
                  }
                />
              </div>
            </div>
            <div className={styles.formItem}>
              <label htmlFor="Last Name">Last Name</label>

              <div className={styles.inputWrapper}>
                <input
                  type="text"
                  id="Last Name"
                  name="lastName"
                  value={LastName}
                  disabled={active.lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />

                <img
                  src={penIcon}
                  alt=""
                  onClick={() =>
                    setActive((pre) => {
                      return {
                        ...pre,
                        lastName: !pre.lastName,
                      };
                    })
                  }
                />
              </div>
            </div>
            <div className={styles.formItem}>
              <label htmlFor="Email">
                Email
                <span>(used to log in to your account)</span>
              </label>

              <div className={styles.inputWrapper}>
                <input
                  type="email"
                  id="Email"
                  name="email"
                  disabled={active.email}
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <img
                  src={penIcon}
                  alt=""
                  onClick={() =>
                    setActive((pre) => {
                      return {
                        ...pre,
                        email: !pre.email,
                      };
                    })
                  }
                />
              </div>
            </div>
            <div className={styles.formItem}>
              <label htmlFor="phone">Phone</label>

              <div className={styles.inputWrapper}>
                <select
                  name=""
                  id=""
                  onChange={(e) => setCountryCode(e.target.value)}
                  className={styles.CountrySelect}
                >
                  <option value="+91">+91</option>
                  <option value="+88" disabled>
                    +88
                  </option>
                  <option value="+89" disabled>
                    +89
                  </option>
                </select>

                <input
                  type="tel"
                  onChange={(e) => {
                    return setPhone(e.target.value);
                  }}
                  value={Phone}
                  id="phone"
                  disabled={active.phone}
                  maxLength={10}
                  max={10}
                />
                <img
                  className={styles.icon}
                  src={penIcon}
                  alt=""
                  onClick={() =>
                    setActive((pre) => {
                      return {
                        ...pre,
                        phone: !pre.phone,
                      };
                    })
                  }
                />
              </div>
            </div>
            {/* date select */}
            <div className={styles.dateWrapper} onClick={handleWrapperClick}>
              <label htmlFor="date">Date</label>
              <p>
                <span>{date}</span>

                <input
                  ref={dateInputRef}
                  onChange={(e) => {
                    const selectedDate = new Date(e.target.value);
                    const options = {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    };
                    const formattedDate = selectedDate.toLocaleDateString(
                      "en-US",
                      options
                    );
                    setDate(formattedDate);
                  }}
                  type="date"
                  name="appointment date"
                />
              </p>
            </div>

            <div
              className={styles.usr_detail_box}
              onClick={() =>
                setActive((pre) => {
                  return {
                    ...pre,
                    gender: !pre.gender,
                  };
                })
              }
            >
              <label htmlFor="gender">
                <div className={styles.usr_detail_label}>Gender</div>
                <div className={styles.usr_genders}>
                  <div
                    className={
                      activeGender === "male"
                        ? `${styles.usr_detail_gender} ${styles.active_gender}`
                        : styles.usr_detail_gender
                    }
                    onClick={() => updateGender("male")}
                  >
                    Male
                  </div>
                  <div
                    className={
                      activeGender === "female"
                        ? `${styles.usr_detail_gender} ${styles.active_gender}`
                        : styles.usr_detail_gender
                    }
                    onClick={() => updateGender("female")}
                  >
                    Female
                  </div>
                  <div
                    className={
                      activeGender === "non-binary"
                        ? `${styles.usr_detail_gender} ${styles.active_gender}`
                        : styles.usr_detail_gender
                    }
                    onClick={() => updateGender("non-binary")}
                  >
                    Non-Binary
                  </div>
                  <div
                    className={
                      activeGender === "other"
                        ? `${styles.usr_detail_gender} ${styles.active_gender}`
                        : styles.usr_detail_gender
                    }
                    onClick={() => updateGender("other")}
                  >
                    Other
                  </div>
                </div>
              </label>
            </div>
          </div>

          <div className={styles.action}>
            <button
              type="submit"
              className={styles.save}
              style={{
                backgroundColor: `${
                  active.firstName &&
                  active.lastName &&
                  active.email &&
                  active.phone &&
                  active.gender
                    ? "gray"
                    : ""
                }`,
              }}
              disabled={
                active.lastName && active.email && active.phone && active.gender
                  ? true
                  : false
              }
            >
              Save
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default PersonalDetails;
