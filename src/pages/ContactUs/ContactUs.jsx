import React, { useState, useEffect } from 'react';
import style from './contactUs.module.css';
import { Link } from 'react-router-dom';
import contactimage from '../../../src/assets/images/ContactUs/contactimage.png';
import { contactDetails } from '../../services/careers';
import { toast } from 'react-toastify';
import ContactUsModal from '../../components/_modals/ContactUs/ContactUsModal';

function ContactUs() {
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    message: '',
    phonenumber: '',
    isAcceptPrivacy: false
  });

  // Retrieve form data from localStorage when the component mounts
  useEffect(() => {
    const savedFormData = localStorage.getItem('contactFormData');
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
  }, []);

  const validatePhoneNumber = (phone) => {
    const phonePattern = /^\d{10}$/; // Adjust the regex pattern as needed
    return phonePattern.test(phone);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    if (name === 'phonenumber') {
      if (!validatePhoneNumber(newValue)) {
        setPhoneNumberError('Invalid phone number. Please enter a 10-digit number.');
      } else {
        setPhoneNumberError('');
      }
    }

    const updatedFormData = {
      ...formData,
      [name]: newValue,
    };

    setFormData(updatedFormData);

    // Store form data in localStorage whenever it changes
    localStorage.setItem('contactFormData', JSON.stringify(updatedFormData));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (phoneNumberError) {
      toast.error('Please fix the errors before submitting.');
      return;
    }

    const { res, err } = await contactDetails(formData);
    if (res) {
      if (window.innerWidth < 500) {
        setIsModalOpen(true)
      }
      else {
        toast.success("Form received");
      }

    } else {
      toast.error("Something went wrong");
    }

    // Clear form data after submission
    const clearedFormData = {
      first_name: '',
      last_name: '',
      email: '',
      message: '',
      phonenumber: '',
      isAcceptPrivacy: false
    };
    setFormData(clearedFormData);
    localStorage.setItem('contactFormData', JSON.stringify(clearedFormData));
  };

  return (
    <>
      <div className={style.container}>
        <img src={contactimage} alt="Contact" />
        <div className={style.formContainer}>
          <div className={style.formHeader}>
            <h2>Contact us</h2>
            <p>Need help? Have feedback for us? Get in touch now!</p>
            <h6>Reach out and we’ll get in touch within 24 hours</h6>
          </div>
          <form onSubmit={handleSubmit}>
            <div className={style.namefield}>
              <div className={style.firstname}>
                <p width={100}>First Name:</p>
                <input
                  type="text"
                  name="first_name"
                  placeholder='First name'
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={style.lastname}>
                <p width={100}>Last Name:</p>
                <input
                  type="text"
                  name="last_name"
                  placeholder='Last name'
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className={style.emailContainer}>
              <div className={style.emailBox}>
                <p width={39}>Email</p>
                <input
                  type="email"
                  name="email"
                  placeholder='e.g. Person@gmail.com'
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={style.emailBox}>
                <p width={150}>Phone Number</p>
                <input
                  type="tel"
                  name="phonenumber"
                  placeholder='Phone Number'
                  value={formData.phonenumber}
                  onChange={handleChange}
                  required
                />
                {phoneNumberError && <p className={style.error}>{phoneNumberError}</p>}
              </div>
            </div>
            <div className={style.msBox}>
              <div className={style.messageBox}>
                <p width={63}>Message</p>
                <textarea
                  name="message"
                  placeholder='Leave us a message'
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={style.privacyPolicy}>
                <input
                  width={16}
                  height={16}
                  type="checkbox"
                  name="isAcceptPrivacy"
                  checked={formData.isAcceptPrivacy}
                  onChange={handleChange}
                  required
                />
                <p width={242}>You agree to our friendly <Link to="/Privacy/policy"><span className={style.linker}>privacy policy</span></Link></p>
              </div>
              <button className={style.submitButton} type="submit"><b>Submit</b></button>
            </div>
          </form>
        </div>
      </div>
      <ContactUsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} ></ContactUsModal>
    </>
  );
}

export default ContactUs;
