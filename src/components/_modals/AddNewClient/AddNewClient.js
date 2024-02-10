// Modal.js
import React, { useState } from "react";
import styles from "./AddNewClient.module.css";
import CustomSelect from "../../Select/CustomeSelect";
import en from "react-phone-number-input/locale/en";
import { IoMdArrowBack } from "react-icons/io";
import CountrySelect from "../../Countrycode/CountrySelect";
import { getCountryCallingCode } from "react-phone-number-input";
const AddNewClient = ({ showModal, onClose }) => {
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("IN");
  const [password, setPassword] = useState("");
  const [selectedOption, setSelectedOption] = useState("Male");
  const options = ["Male", "Female", "Other"];

  const handleSelectChange = (value) => {
    setSelectedOption(value);
  };
  const handleSubmit = () => {
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  const handleformSubmit = () => {
    const data = {
      phone: phone.length ? `+${getCountryCallingCode(country)}${phone}` : "",
    };
  };

  return (
    <div className={`${styles.modal} ${showModal ? styles.show : ""}`}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={onClose}>
          &times;
        </span>
        <span className={styles.back} onClick={onClose}>
          <IoMdArrowBack />
        </span>
        <h2 className={styles.modalHeading}>Add a new client</h2>

        <form className={styles.form}>
          <div className={styles.formItemsWrapper}>
            <div className={styles.formItems}>
              <label htmlFor="servicetype">Frst Name</label>
              <input type="text" placeholder="Client first name" />
            </div>
            <div className={styles.formItems}>
              <label htmlFor="servicetype">Last Name</label>
              <input type="text" placeholder="Client last name" />
            </div>
          </div>
          <div className={styles.formItems}>
            <label htmlFor="servicetype">Email</label>
            <input type="text" placeholder="Enter clients email address" />
          </div>
          <div className={styles.formItemsWrapper}>
            <div className={styles.formItems}>
              <label htmlFor="servicetype">phone</label>
              <p className={styles.phone}>
                <CountrySelect
                  labels={en}
                  value={country}
                  onChange={setCountry}
                  phone={phone}
                />
                <input type="text" placeholder="phone number" />
              </p>
            </div>
            <div className={styles.formItems}>
              <label htmlFor="servicetype"> Gender</label>
              <div className={styles.selectWrapper}>
                <CustomSelect
                  options={options}
                  value={selectedOption}
                  onChange={handleSelectChange}
                />
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M6 9L12 15L18 9"
                      stroke="black"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
          <div className={styles.formItems}>
            <label htmlFor="servicetype">
              Addional comments{" "}
              <span className={styles.optional}>(optional)</span>
            </label>
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              placeholder="Add any spacific info or requirements on the booking"
            ></textarea>
          </div>

          <div className={styles.buttonContainer}>
            <button
              className={styles.cancel}
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className={styles.save}
              type="button"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewClient;
