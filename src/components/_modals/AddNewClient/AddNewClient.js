// Modal.js
import React, { useContext, useState } from "react";
import styles from "./AddNewClient.module.css";
import CustomSelect from "../../Select/CustomeSelect";
import en from "react-phone-number-input/locale/en";
import { IoMdArrowBack } from "react-icons/io";
import CountrySelect from "../../Countrycode/CountrySelect";
import { getCountryCallingCode } from "react-phone-number-input";
import { AddAppoinmentContext } from "../../../pages/partnerPages/Services/AddAppoinment/AddAppoinment";

const AddNewClient = ({ showModal, onClose }) => {
  const { setCustomarDeails } = useContext(AddAppoinmentContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [comments, setComments] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("IN");
  const [selectedOption, setSelectedOption] = useState("Male");
  const options = ["Male", "Female", "Other"];

  const handleSelectChange = (value) => {
    setSelectedOption(value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      phone: phone.length ? `+${getCountryCallingCode(country)}${phone}` : "",
      name: firstName + " " + lastName,
      email: email,
    };

    setCustomarDeails(data);

    onClose();
  };

  const handleCancel = () => {
    onClose();
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

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formItemsWrapper}>
            <div className={styles.formItems}>
              <label htmlFor="servicetype">Frst Name</label>
              <input
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                type="text"
                placeholder="Client first name"
                required
              />
            </div>
            <div className={styles.formItems}>
              <label htmlFor="servicetype">Last Name</label>
              <input
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                type="text"
                placeholder="Client last name"
              />
            </div>
          </div>
          <div className={styles.formItems}>
            <label htmlFor="servicetype">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Enter clients email address"
            />
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
                <input
                  onChange={(e) => setPhone(e.target.value)}
                  type="number"
                  placeholder="phone number"
                  required
                />
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
            <button className={styles.save} type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewClient;
