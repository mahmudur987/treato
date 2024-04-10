import React from 'react';
import AboutusNavBar from '../../components/Aboutus/AboutUsNavBar/AboutusNavBar';
import {Outlet} from 'react-router-dom';
import Footer from '../../components/Footer/Footer';


function Privacy() {
  return (
    <>
    <AboutusNavBar/>
    <Outlet/>
    <Footer/>
      
    </>
  )
}

export default Privacy;
