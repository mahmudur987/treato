import React, { useState } from 'react';
import style from './contactUs.module.css';
import { Link } from 'react-router-dom';
import contactimage from '../../../src/assets/images/ContactUs/contactimage.png'
import { contactDetails } from '../../services/careers';
import { toast } from 'react-toastify';

function ContactUs() {

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    message: '',
    phonenumber: '',
    isAcceptPrivacy:false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    // If the input is the phoneNumber field and the type is 'number', parse it into an integer
    const newValue = name === 'phonenumber' && type === 'number' ? parseInt(value, 10) : type === 'checkbox' ? checked : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
   const {res, err}= await contactDetails(formData);
   if(res){
    toast.success("form received")

   }
   else{
    toast.error("Something went wrong");
   }
    setFormData({
    first_name: '',
    last_name: '',
    email: '',
    message: '',
    phonenumber: '',
    isAcceptPrivacy:false
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
                  name="first_name"
                  placeholder='First name'
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                />


              </div>
              <div className={style.lastname} >

                <p width={100} >Last Name:</p>
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
                  type="number"
                  name="phonenumber"
                  placeholder='Phone Number'
                  value={formData.phonenumber}
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
                  name="isAcceptPrivacy"
                  checked={formData.isAcceptPrivacy}
                  onChange={handleChange}
                  required
                />
                <p width={242}>You agree to our friendly <Link to="/Privacy/policy" ><span className={style.linker} >privacy policy</span></Link></p>
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




// const ContactUs = () => {
//   const [formData, setFormData] = useState({
//     first_name: '',
//     last_name: '',
//     email: '',
//     message: '',
//     phonenumber: '',
//     isAcceptPrivacy:true
//   });
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('https://backend.treato.in/api/v1/reports/contactUs', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           // Add any additional headers if needed
//         },
//         body: JSON.stringify(formData),
//       });
//       if (!response.ok) {
//         throw new Error('Failed to submit form');
//       }
//       const res = await response.json()
//       console.log("this is form data ",formData)
//       console.log("this is backend url","https://backend.treato.in/api/v1/reports/contactUs")
//       console.log("this is response form backend ",res)
//       // Handle success, e.g., show success message
//       console.log('Form submitted successfully');
//     } catch (error) {
//       console.error('Error submitting form:', error.message);
//       // Handle error, e.g., show error message
//     }
//   };
//   return (
//     <div className={style.container}>
//       <h2>Testing Form</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="first_name">First Name:</label>
//           <input
//             type="text"
//             id="first_name"
//             name="first_name"
//             value={formData.first_name}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label htmlFor="last_name">Last Name:</label>
//           <input
//             type="text"
//             id="last_name"
//             name="last_name"
//             value={formData.last_name}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label htmlFor="email">Email:</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label htmlFor="message">Message:</label>
//           <textarea
//             id="message"
//             name="message"
//             value={formData.message}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label htmlFor="phonenumber">Phone Number:</label>
//           <input
//             type="tel"
//             id="phonenumber"
//             name="phonenumber"
//             value={formData.phonenumber}
//             onChange={handleChange}
//           />
//         </div>
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };
// export default ContactUs;