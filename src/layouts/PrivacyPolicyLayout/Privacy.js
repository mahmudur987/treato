import React from 'react';
import AboutusNavBar from '../../components/Aboutus/AboutUsNavBar/AboutusNavBar';
import {Outlet} from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer';


function Privacy() {
  return (
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
      
    </>
  )
}

export default Privacy;
