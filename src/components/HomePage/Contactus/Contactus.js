// Contactus.js
import React, { useState } from "react";
import styles from "./Contactus.module.css";
import PrimaryButton from "../../Buttons/PrimaryButton/PrimaryButton.js";
import contactUsBanner from "../../../assets/images/ContactusImages/contactusBanner.png";
import InputField from "../../Input/Input";

const Contactus = ({mainData}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
    agreeToPrivacyPolicy: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // submission logic here
  };

  return (
    <section className={styles["container"]} id="contactUs">
      <h1 className={styles["heading"]}>Contact us</h1>
      <div className={styles["contactWrapper"]}>
        <div className={styles["Image"]}>
          <img src={mainData?mainData.public_url:contactUsBanner} alt="Contact Us Banner" />
        </div>
        <div className={styles["formContainer"]}>
          <div className={styles["formHeader"]}>
            <h1>We’d love to help!</h1>
            <p>Reach out and we’ll get in touch within 24 hours</p>
          </div>

          <form onSubmit={handleSubmit} className={styles["formFields"]}>
            <div className={styles["nameFields"]}>
              <InputField
                label="First Name"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First name"
                styles={`${styles.firstnameInput}`}
              />
              <InputField
                label="Last Name"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last name"
                styles={` ${styles.lastnameInput}`}
              />
            </div>
            <div className={styles["emailField"]}>
              <InputField
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. person@gmail.com"
                // styles={styles.input}
              />
            </div>
            <div className={styles["messageField"]}>
              <InputField
                label="Message"
                type="textarea"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Leave us a message..."
                styles={`${styles.input} ${styles.textarea}`}
              />
              <div className={styles["checkboxField"]}>
                <InputField
                  label={""}
                  type="checkbox"
                  name="agreeToPrivacyPolicy"
                  checked={formData.agreeToPrivacyPolicy}
                  onChange={handleChange}
                />
                <div className={styles["checkboxText"]}>
                  You agree to our friendly &nbsp;
                  <a className={styles["privacyPolicy"]}>privacy policy</a>
                </div>
              </div>
            </div>
            <PrimaryButton
              type="submitButton"
              children={"Get in touch"}
              className={styles.apply}
            />
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contactus;
