import React, { useState } from 'react'
import styles from "./PaymentProfile.module.css"
// import styles from "../../../components/HomePage/Contactus/Contactus.module.css"
import InputField from '../../../components/Input/Input'
import arrowLeft from "../../../assets/images/AccountSettings/arrow-left.svg"
import { Link } from 'react-router-dom'


const PaymentProfile = ({ mainData }) => {
  const [formData, setFormData] = useState({

    bankName: "",
    accountNumber: "",
    accountName: "",
    ifscCode: "",
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
  return (<>
    <section className={styles["container"]} >
      <div className={styles["contactWrapper"]}>

        <div className={styles["formContainer"]}>

          <div className={styles["heading"]}>
            <Link to={"/service/PartnerAccountSetting"}>

              <span>
                <img src={arrowLeft} alt="arrowLeft" className={styles["arrowLeft"]} />
              </span>
            </Link>

            Payments
          </div>


          <form onSubmit={handleSubmit} className={styles["formFields"]}>

            <div className={styles["inputField"]}>

              <select name="" id="">
                <option value="">SBI</option>
                <option value="">HDFC</option>
                <option value="">B OF M</option>
              </select>

            </div>
            <div className={styles["inputField"]}>
              <InputField
                label="Account Number"
                type="text"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
                placeholder="Enter 11-digit bank account number"
              // styles={styles.input}
              />
            </div>
            <div className={styles["inputField"]}>
              <InputField
                label="Name of the Account Holder"
                type="text"
                name="accountName"
                value={formData.accountName}
                onChange={handleChange}
                placeholder="ABC Ventures Pvt. Ltd."
              // styles={styles.input}
              />
            </div>
            <div className={styles["inputField"]}>
              <InputField
                label="IFSC Code"
                type="text"
                name="ifscCode"
                value={formData.ifscCode}
                onChange={handleChange}
                placeholder="SBIN0001234"
              // styles={styles.input}
              />
            </div>


            <button className={styles["paymentSubmit"]}>Submit</button>
          </form>
        </div>
      </div>
    </section>
  </>
  )
}

export default PaymentProfile