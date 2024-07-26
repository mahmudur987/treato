import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import style from './details.module.css'
import image2 from '../../../../src/assets/images/Careers/placeholder.png';
import { jobApplicationData } from '../../../services/careers';
import { toast } from 'react-toastify';
import { countryCallingCodes } from './CountryCodes';
import { FaArrowLeftLong } from "react-icons/fa6";
function JobDetails() {
  const { id } = useParams();
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    numbercode: '+91',
    phone_number: '',
    resume: null,
    career_id: id,
    isReadRoleDescription: false,
    timestamps: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let val = value;

    if (name === 'phone_number') {
      val = value.replace(/\D/g, '');
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
        toast.success("Job form application submitted successfully.")
      }
      else {
        console.log(err)
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
      <div className={style.header} >
        <Link to="/careers/currentopenings"><FaArrowLeftLong className={style.arrows} /></Link>
        <div className={style.subHeader} >
          <div className={style.jobHeading} >

            <h3>software engineer</h3>
            <div className={style.location} >
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
                <label htmlFor="firstName">First name</label>
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
                <label htmlFor="lastName">Last name</label>
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
                <label htmlFor="email">Email</label>
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
                <label htmlFor="phoneNumber">Phone </label>
                <section className={style.contactNumber}>
                  <select
                    className={style.countryCode}
                    id="countryCode"
                    name="numbercode"
                    value={formData.numbercode}
                    onChange={(e) => setFormData({ ...formData, numbercode: e.target.value })}
                    required
                  >

                    <option value='+91' selected>+91</option>
                    {countryCallingCodes &&
                      countryCallingCodes.map((num) => <option value={num} selected>{num}</option>)}
                    {/* Add more options as needed */}
                  </select>
                  <hr className={style.phoneinputBorder} />
                  <input
                    className={style.phoneno}
                    type="number"
                    id="phoneNumber"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    required
                  />
                </section>
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
                  
                  <svg className={style.svgStyle} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M10.7379 16.6272C9.96427 16.6272 9.31895 16.0359 9.2514 15.2653C9.11015 13.654 9.07441 12.0355 9.14427 10.4202C9.05994 10.4146 8.97563 10.4087 8.89133 10.4025L7.40178 10.294C6.44973 10.2246 5.91752 9.163 6.43151 8.35862C7.5277 6.6431 9.53693 4.72305 11.1904 3.53532C11.6742 3.18777 12.3258 3.18777 12.8097 3.53532C14.4631 4.72305 16.4723 6.6431 17.5685 8.35861C18.0825 9.163 17.5503 10.2246 16.5983 10.294L15.1087 10.4025C15.0244 10.4087 14.9401 10.4146 14.8558 10.4202C14.9256 12.0355 14.8899 13.654 14.7486 15.2653C14.6811 16.0359 14.0358 16.6272 13.2622 16.6272H10.7379ZM10.6815 9.76244C10.5678 11.5497 10.589 13.343 10.745 15.1272H13.255C13.411 13.343 13.4323 11.5497 13.3186 9.76244C13.3058 9.56207 13.3739 9.36496 13.5077 9.21522C13.6414 9.06547 13.8296 8.9756 14.0301 8.96573C14.3535 8.9498 14.6767 8.93006 14.9997 8.90652L16.0815 8.82766C15.1219 7.41436 13.9204 6.18011 12.5313 5.18226L12 4.80062L11.4687 5.18226C10.0796 6.18011 8.87813 7.41436 7.91858 8.82766L9.00038 8.90652C9.32337 8.93006 9.64656 8.9498 9.9699 8.96573C10.1704 8.97561 10.3586 9.06547 10.4924 9.21522C10.6261 9.36496 10.6942 9.56207 10.6815 9.76244Z" fill="#0D69D7"></path> <path d="M5.75 16.9999C5.75 16.5857 5.41421 16.2499 5 16.2499C4.58579 16.2499 4.25 16.5857 4.25 16.9999V18.9999C4.25 19.9664 5.0335 20.7499 6 20.7499H18C18.9665 20.7499 19.75 19.9664 19.75 18.9999V16.9999C19.75 16.5857 19.4142 16.2499 19 16.2499C18.5858 16.2499 18.25 16.5857 18.25 16.9999V18.9999C18.25 19.138 18.1381 19.2499 18 19.2499H6C5.86193 19.2499 5.75 19.138 5.75 18.9999V16.9999Z" fill="#0D69D7"></path> </g></svg>
                   <p>Browse File</p>
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
          <button className={style.submitButton} type="submit"><p>Submit</p></button>
        </form>
      </div>
    </>
  );
}

export default JobDetails;
