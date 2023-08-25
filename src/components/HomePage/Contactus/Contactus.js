import React, { useState } from "react";
import styles from "./Contactus.module.css";
import contactUsBanner from "../../../assets/images/ContactusImages/contactusBanner.png";

const Contactus = () => {
 
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
    console.log(formData);
  };
  return (
    <section className={styles["container"]}>
      <h1 className={styles["heading"]}>Contact us</h1>
      <div className={styles["contactWrapper"]}>
        <div className={styles["Image"]}>
          <img src={contactUsBanner} />
        </div>
        <div className={styles["formContainer"]}>
          <div className={styles["formHeader"]}>
            <h1>We’d love to help!</h1>
            <p>Reach out and we’ll get in touch within 24 hours</p>
          </div>

          <form onSubmit={handleSubmit} className={styles["formFields"]}>
            <div className={styles["nameFields"]}>
              <label className={styles["firstname"]}>
                First Name:
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </label>
              <label className={styles["lastname"]}>
                Last Name:
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className={styles["emailField"]}>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className={styles["messageField"]}>
              <label>
                Message:
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                />
              </label>
              <div className={styles["checkboxField"]}>
                <label>
                  <input
                    type="checkbox"
                    name="agreeToPrivacyPolicy"
                    checked={formData.agreeToPrivacyPolicy}
                    onChange={handleChange}
                  />
                  <div className={styles["checkboxText"]}>                  
                  You agree to our friendly &nbsp;
                  <a className={styles["privacyPolicy"]}>privacy policy</a>
                  </div>
                </label>
              </div>
            </div>
            <button type="submitButton" className={styles["submitButton"]}>
              Get in touch
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contactus;
