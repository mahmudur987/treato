import React from 'react';
import AboutusNavBar from '../../components/Aboutus/AboutUsNavBar/AboutusNavBar';
import {Outlet} from 'react-router-dom';


function Privacy() {
  return (
    <>
    <AboutusNavBar/>
    <Outlet/>
      
    </>
  )
}

export default Privacy;
