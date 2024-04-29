import React, { useState } from 'react';
import style from './contactUs.module.css';
import contactimage from '../../../src/assets/images/ContactUs/contactimage.png'
import { contactDetails } from '../../services/careers';

function ContactUs() {

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    message: '',
    acceptPolicy: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you can do something with the form data, like submitting it to a server
    console.log(formData);
    const {res, err}  = await contactDetails(formData);
    if(res){
      console.log(res)
    }
    else{
      console.log(err)
    }
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      message: '',
      acceptPolicy: false,
    });
  };



  return (
    <>
      <div className={style.container} >
        <img src={contactimage} alt="" srcset="" />
        <div className={style.formContainer} >
          <div className={style.formHeader} >
            <h2>Contact us</h2>
            <p>Need help? Have feedback for us? Get in touch now!</p>
            <h6>Reach out and we’ll get in touch within 24 hours</h6>
          </div>
          <form onSubmit={handleSubmit}>
            <div className={style.namefield} >
              <div className={style.firstname} >

                <p width={100} >First Name:</p>
                <input
                  type="text"
                  name="firstName"
                  placeholder='First name'
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />


              </div>
              <div className={style.lastname} >

                <p width={100} >Last Name:</p>
                <input
                  type="text"
                  name="lastName"
                  placeholder='Last name'
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />

              </div>


            </div>


            <div className={style.emailContainer} >
              <div className={style.emailBox} >
                <p width={39} >Email</p>
                <input
                  type="email"
                  name="email"
                  placeholder='e.g. Person@gmail.com'
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={style.emailBox} >
                <p width={150} >Phone Number</p>
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder='Phone Number'
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className={style.msBox} >
              <div className={style.messageBox} >
                <p width={63} >Message</p>
                <textarea
                  name="message"
                  placeholder='Leave us a message'
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={style.privacyPolicy} >
                <input
                  width={16}
                  height={16}
                  type="checkbox"
                  name="acceptPolicy"
                  checked={formData.acceptPolicy}
                  onChange={handleChange}
                  required
                />
                <p width={242}>You agree to our friendly <span>privacy policy</span></p>
              </div>


              <button className={style.submitButton} type="submit"><b>Submit</b></button>

            </div>
          </form>

        </div>
      </div>
    </>
  )
}

export default ContactUs;
