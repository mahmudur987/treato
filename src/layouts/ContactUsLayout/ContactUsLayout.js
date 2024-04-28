import React from 'react';
import ContactUs from '../../pages/ContactUs/ContactUs';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';

function ContactUsLayout() {
  return (
    <>
      <Navbar/>
      <ContactUs/>
      <Footer/>
    </>
  )
}

export default ContactUsLayout;
