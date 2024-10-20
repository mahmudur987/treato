import React, { useEffect, useRef, useState } from "react";
import styles from "./PersonalDetails.module.css";
import { Link } from "react-router-dom";
import penIcon from "../../../assets/icons/penIcon.webp";
import { toast } from "react-toastify";
import { useGetUser } from "../../../services/user";
import axiosInstance from "../../../services/axios";
import LoadSpinner from "../../../components/LoadSpinner/LoadSpinner";
import VerifyOtp from "../../../components/_modals/VerifyOtp/VerifyOtp";
import { sendNumberChangeOTP } from "../../../services/auth";
import VerifyOtpOfPartner from "../../../components/_modals/Partner/VerifyOtp/VerifyOtp";
import i from "../../../assets/svgs/icon (32).svg";

export const backTick = i;

function validatePhoneNumber(phoneNumber) {
  const isNumeric = /^\d+$/.test(phoneNumber);

  if (!isNumeric) {
    return false;
  }

  return true;
}
const formatDate = (date) => {
  const month = date.getMonth() + 1; // Months are zero-based
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month}-${day}-${year}`;
};
const PersonalDetails = () => {
  const { data, isLoading, refetch } = useGetUser();
  const user = data?.data;
  const dateInputRef = useRef(null);
  const [date, setDate] = useState("Oct 8, 2022");
  const [prevDate, setPrevDate] = useState(null);
  const [firstName, setFirstName] = useState("First Name");
  const [LastName, setLastName] = useState("Last Name");
  const [Email, setEmail] = useState("Email");
  const [countryCode, setCountryCode] = useState("+91");
  const [Phone, setPhone] = useState("Mobile Number");
  const [birthDate, setBirthDate] = useState(null);
  const [activeGender, setActiveGender] = useState("male");
  const [active, setActive] = useState({
    firstName: true,
    lastName: true,
    email: true,
    phone: true,
    gender: true,
    DOB: true,
  });
  const [otpModal, setOtpModal] = useState(false);
  const [showSave, setShowSave] = useState(false);
  const [otpVerify, setVerifyOtp] = useState(0);
  const [otpSuccess, setOtpSuccess] = useState(false);
  useEffect(() => {
    if (user) {
      setFirstName(user?.first_name || "First Name");
      setLastName(user?.last_name || "Last Name");
      setEmail(user?.email || "Email");
      setPhone(user?.phone?.replace("+91", "") || "Mobile Number");
      setActiveGender(user?.gender || "male");

      if (user?.dob) {
        const userBirthDate = new Date(user?.dob);
        const formattedDate = userBirthDate?.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        });
        setDate(formattedDate);
        setBirthDate(user?.dob);
      }
    }
  }, [user]);

  const updateGender = (value) => {
    setActiveGender(value);
  };

  const handleWrapperClick = () => {
    dateInputRef.current.showPicker();
  };

  const verifyOtp = async () => {
    let PhoneNumber = countryCode + Phone;
    const phonedata = {
      phoneNumber: PhoneNumber,
    };
    console.log(phonedata);
    const res = await sendNumberChangeOTP(phonedata);

    if (res.res) {
      console.log(res?.res?.data?.otp);
      setOtpModal(true);
      setVerifyOtp(res?.res?.data.otp);
    } else if (res.err) {
      console.log(res.err);
      toast.error("The Phone number is Not Valid");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let PhoneNumber = countryCode + Phone;
    const isValid = validatePhoneNumber(Phone);

    if (firstName === "First Name") {
      return toast.error("Please enter your First name");
    }
    if (LastName === "Last Name") {
      return toast.error("Please enter your Last name");
    }
    if (Email === "Email") {
      return toast.error("Please enter your Email");
    }
    if (!birthDate) {
      return toast.error("Select your Date of Birth");
    }
    if (Phone === "Mobile Number" || PhoneNumber.length !== 13 || !isValid) {
      return toast.error("Please enter a valid contact number");
    }

    if (PhoneNumber !== user?.phone) {
      await verifyOtp();
    } else {
      const formData = new FormData();
      formData.append("first_name", firstName);
      formData.append("last_name", LastName);
      formData.append("phone", PhoneNumber);
      formData.append("email", Email);
      formData.append("gender", activeGender);
      formData.append("dob", birthDate);

      try {
        const token = localStorage.getItem("jwtToken");
        const headers = { token };

        const res = await axiosInstance.patch("profile/update", formData, {
          headers,
        });
        console.log(res);

        if (res?.data.status) {
          toast.success(res?.data?.message);
          refetch();
          setActive({
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            gender: true,
            DOB: true,
          });
        }
      } catch (error) {
        toast.error("Error updating profile");
      }
    }
  };
  const handleDateChange = (e) => {
    const newDate = new Date(e.target.value);

    // Check if previous date exists and compare days
    if (prevDate && prevDate.getDate() === newDate.getDate()) {
      return; // Only trigger if the day is changed
    }

    setBirthDate(e.target.value);

    // Formatting the date
    const options = {
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    const formattedDate = newDate.toLocaleDateString("en-US", options);
    setDate(formattedDate);

    // Update active state and previous date
    setActive((pre) => ({
      ...pre,
      DOB: false,
    }));
    setPrevDate(newDate);
  };

  if (isLoading) {
    return (
      <>
        <LoadSpinner />
      </>
    );
  }

  return (
    <main className={styles.mainContainer}>
      <Link
        to={"/partner/dashboard/PartnerAccountSetting"}
        className={styles.backLink}
      >
        <img src={backTick} alt="" />
      </Link>

      <section className={styles.container}>
        <header className={styles.header}>
          <Link to={"/partner/dashboard/service"} className={styles.backLink}>
            <img src={backTick} alt="" />
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
                  loading="lazy"
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
                  loading="lazy"
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
                  loading="lazy"
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
                  loading="lazy"
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
              <label htmlFor="date">Birth Date</label>
              <p>
                <span>{date}</span>

                <input
                  ref={dateInputRef}
                  onChange={handleDateChange}
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
                cursor: `${
                  active.firstName &&
                  active.lastName &&
                  active.email &&
                  active.phone &&
                  active.gender &&
                  active.DOB
                    ? ""
                    : "pointer"
                }`,
                backgroundColor: `${
                  active.firstName &&
                  active.lastName &&
                  active.email &&
                  active.phone &&
                  active.gender &&
                  active.DOB
                    ? "gray"
                    : ""
                }`,
              }}
              disabled={
                active.firstName &&
                active.lastName &&
                active.email &&
                active.phone &&
                active.gender &&
                active.DOB
                  ? true
                  : false
              }
            >
              Save
            </button>
          </div>
        </form>
      </section>

      {otpModal && (
        <VerifyOtpOfPartner
          setOtpModal={setOtpModal}
          setOtpSuccess={setOtpSuccess}
          otpSuccess={otpSuccess}
          setShowSave={setShowSave}
          inputVal={countryCode + Phone}
          userOTP={otpVerify}
        />
      )}
    </main>
  );
};

export default PersonalDetails;
