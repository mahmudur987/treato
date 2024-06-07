import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import style from "./details.module.css";
import image2 from "../../../../src/assets/images/Careers/placeholder.png";
import { jobApplicationData } from "../../../services/careers";
import { toast } from "react-toastify";
import { countryCallingCodes } from "./CountryCodes";

function JobDetails() {
  const { id } = useParams();
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    numbercode: "+91",
    phone_number: "",
    resume: null,
    career_id: id,
    isReadRoleDescription: false,
    timestamps: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let val = value;

    if (name === "phone_number") {
      val = value.replace(/\D/g, "");
      val = val.slice(0, 10);

      if (val.length !== 10) {
        setPhoneNumberError("Phone number must be exactly 10 digits long.");
      } else {
        setPhoneNumberError("");
      }
    }

    if (type === "checkbox") {
      val = checked;
    }

    setFormData({ ...formData, [name]: val });
  };

  const handleFileChange = (e) => {
    const resume = e.target.files[0];
    setFormData({ ...formData, resume });
  };

  const handleRemoveFile = () => {
    setFormData({ ...formData, resume: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phoneNumberError) {
      const { res, err } = await jobApplicationData(formData);
      if (res) {
        toast.success("Job form application submitted successfully.");
      } else {
        console.log(err);
        toast.error(err.error);
      }
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        numbercode: "+91",
        phone_number: "",
        resume: null,
        career_id: id,
        isReadRoleDescription: false,
        timestamps: true,
      });
    } else {
      toast.warning("Please correct the phone number.");
    }
  };

  return (
    <>
      <div className={style.header}>
        <Link to="/careers/currentopenings">
          <svg
            width={44}
            height={44}
            class=" text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 12h14M5 12l4-4m-4 4 4 4"
            />
          </svg>
        </Link>
        <div className={style.subHeader}>
          <div className={style.jobHeading}>
            <h3>software engineer</h3>
            <div className={style.location}>
              <img src={image2} width={18} height={18} alt="" srcset="" />
              <p>noida, india</p>
              <div className={style.verticalLine}></div>
              <p>Full-Time / on-site</p>
            </div>
          </div>
        </div>
      </div>
      <div className={style.formContainer}>
        <form onSubmit={handleSubmit}>
          <h4>Details</h4>
          <div className={style.inputBox}>
            <div className={style.subBox}>
              <div>
                <label htmlFor="firstName">First Name:</label>
                <input
                  type="text"
                  id="firstName"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName">Last Name:</label>
                <input
                  type="text"
                  id="lastName"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className={style.subBox1}>
              <div>
                <label htmlFor="email">Email:</label>
                <input
                  className={style.subinput}
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="phoneNumber">Phone Number:</label>
                <div className={style.contactNumber}>
                  <select
                    className={style.countryCode}
                    id="countryCode"
                    name="numbercode"
                    value={formData.numbercode}
                    onChange={(e) =>
                      setFormData({ ...formData, numbercode: e.target.value })
                    }
                    required
                  >
                    {/* Add options for country codes */}
                    <option value="+91" selected>
                      +91
                    </option>
                    {countryCallingCodes &&
                      countryCallingCodes.map((num) => (
                        <option value={num} selected>
                          {num}
                        </option>
                      ))}
                    {/* Add more options as needed */}
                  </select>
                  <input
                    className={style.phoneno}
                    type="number"
                    id="phoneNumber"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={style.uploadBox}>
            <label htmlFor="file">Upload Resume</label>
            {formData.resume ? (
              <div className={style.fileBox}>
                <span>{formData.resume.name}</span>
                <button type="button" onClick={handleRemoveFile}>
                  Remove
                </button>
              </div>
            ) : (
              <div className={style.uploadbtnwrapper}>
                <button className={style.btn}>
                  <span className={style.uploadicon}>&#8679;</span> Browse File
                </button>
                <input
                  className={style.fileInput}
                  type="file"
                  id="fileInput"
                  name="resume"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                />
              </div>
            )}
          </div>
          <div className={style.checkBox}>
            <input
              width={24}
              height={24}
              type="checkbox"
              id="agreedToRequirements"
              name="isReadRoleDescription"
              checked={formData.isReadRoleDescription}
              onChange={handleChange}
              required
            />
            <label htmlFor="agreedToRequirements">
              You have read all the requirements for this position and you think
              you will be a proper fit for this role.
            </label>
          </div>
          <button className={style.submitButton} type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default JobDetails;
