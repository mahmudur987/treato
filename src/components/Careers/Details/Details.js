import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import style from './details.module.css'
import image2 from '../../../../src/assets/images/Careers/placeholder.png';

function JobDetails() {

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    countryCode: '',
    file: null,
    agreedToRequirements: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setFormData({ ...formData, [name]: val });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, file });
  };

  const handleRemoveFile = () => {
    setFormData({ ...formData, file: null });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };


  return (
    <>
      <div className={style.header} >
        <Link to="/careers/currentopenings"><svg width={44} height={44} class=" text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12l4-4m-4 4 4 4" />
        </svg></Link>
        <div className={style.subHeader} >
          <div className={style.jobHeading} >

            <h3>software engineer</h3>
            <div className={style.location} >
              <img src={image2} width={18} height={18} alt="" srcset="" />
              <p>noida, india</p>
              <div className={style.verticalLine} ></div>
              <p>Full-Time / on-site</p>
            </div>
          </div>
        </div>

      </div>
      <div className={style.formContainer} >
        <form onSubmit={handleSubmit}>
          <h4>Details</h4>
          <div className={style.inputBox} >
            <div className={style.subBox} >
              <div>
                <label htmlFor="firstName">First Name:</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName">Last Name:</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className={style.subBox} >
              <div>
                <label htmlFor="email">Email:</label>
                <input
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
                <div className={style.contactNumber} >
                  <select
                    className={style.countryCode}
                    id="countryCode"
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleChange}
                    required
                  >
                    
                    {/* Add options for country codes */}
                    <option value="+1">+1 (USA)</option>
                    <option value="+91" Selected>+91 (India)</option>
                    {/* Add more options as needed */}
                  </select>
                  <input
                    width={374}
                    className={style.phoneno}
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={style.uploadBox} >
            <label htmlFor="file">Upload Resume</label>
            {formData.file ? (
              <div className={style.fileBox} >
                <span>{formData.file.name}</span>
                <button type="button" onClick={handleRemoveFile}>Remove</button>
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
                  name="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  required
                />
              </div>
            )}
          </div>
          <div className={style.checkBox} >
            <input
            width={24}
            height={24}
              type="checkbox"
              id="agreedToRequirements"
              name="agreedToRequirements"
              checked={formData.agreedToRequirements}
              onChange={handleChange}
              required
            />
            <label htmlFor="agreedToRequirements">You have read all the requirements for this position and you think you will be a proper fit for this role.</label>
          </div>
          <button className={style.submitButton} type="submit">Submit</button>
        </form>

      </div>
    </>
  )
}

export default JobDetails;
