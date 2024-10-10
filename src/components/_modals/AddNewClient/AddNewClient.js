// Modal.js
import React, { useContext, useState } from "react";
import styles from "./AddNewClient.module.css";
import CustomSelect from "../../Select/CustomeSelect";
import en from "react-phone-number-input/locale/en";
import { IoMdArrowBack } from "@react-icons/all-files/io/IoMdArrowBack";
import CountrySelect from "../../Countrycode/CountrySelect";
import { getCountryCallingCode } from "react-phone-number-input";
import { AddAppointmentContext } from "../../../pages/partnerPages/Services/AddAppoinment/AddAppoinment";
import { toast } from "react-toastify";
const AddNewClient = ({
  showModal,
  onClose,
  setSelectedClient,
  clients,
  setClients,
}) => {
  const { setCustomerDetails } = useContext(AddAppointmentContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("IN");
  const [selectedOption, setSelectedOption] = useState("Male");
  const options = ["Male", "Female", "Other"];

  const handleSelectChange = (value) => {
    setSelectedOption(value);
  };


  const handleFirstNameChange = (e) => {
    const value = e.target.value;
    const regex = /^[A-Za-z\s]*$/;
    if (regex.test(value)) {
      setFirstName(value);
    }
  };

  const handleLastNameChange = (e) => {
    const value = e.target.value;
    const regex = /^[A-Za-z\s]*$/;
    if (regex.test(value)) {
      setLastName(value);
    }
  };
  const handlePhoneChange = (e) => {
    const value = e.target.value;
    const regex = /^[0-9\b]*$/; 
    if (regex.test(value) && value.length <= 10) {
      setPhone(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!firstName) {
      return toast.error("Please enter your first name.");
    }
    if (!phone) {
      return toast.error("Please enter your phone number.");
    }
    if (!email) {
      return toast.error("Please enter your email address.");
    }

    const data = {
      phone: phone.length ? `+${getCountryCallingCode(country)}${phone}` : "",
      name: firstName + " " + lastName,
      email: email,
    };
    console.log(data);
    setCustomerDetails(data);
    setSelectedClient(data);
    setClients([...clients, data]);
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
        <h2 className={styles.modalHeading}>Add A New Client</h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formItemsWrapper}>
            <div className={styles.formItems}>
              <label htmlFor="serviceType">First Name</label>
              <input
                onChange={handleFirstNameChange}
                value={firstName}
                type="text"
                placeholder="Client first name"
                required
              />
            </div>
            <div className={styles.formItems}>
              <label htmlFor="serviceType">Last Name</label>
              <input
                onChange={handleLastNameChange}
                value={lastName}
                type="text"
                placeholder="Client last name"
                required
              />
            </div>
          </div>
          <div className={styles.formItems}>
            <label htmlFor="serviceType">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Enter clients email address"
              required
            />
          </div>
          <div className={styles.formItemsWrapper}>
            <div className={styles.formItems}>
              <label htmlFor="serviceType">phone</label>
              <p className={styles.phone}>
                <CountrySelect
                  labels={en}
                  value={country}
                  onChange={setCountry}
                  phone={phone}
                />
                <input
                  onChange={handlePhoneChange}
                  value={phone}
                  type="number"
                  placeholder="phone number"
                  maxLength={10}
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
              Additional comments{" "}
              <span className={styles.optional}>(optional)</span>
            </label>
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              placeholder="Add any specific info or requirements on the booking"
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
