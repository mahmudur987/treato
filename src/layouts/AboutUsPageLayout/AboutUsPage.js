import React from 'react';
import AboutusNavBar from '../../components/Aboutus/AboutUsNavBar/AboutusNavBar';
import AboutUsDetails from '../../components/Aboutus/AboutUsDetails/AboutUsDetails';
import Footer from '../../components/Footer/Footer';
import style from './AboutUsPage.module.css';

function AboutUsPage() {
  return (
    <div className={style.container}>
    <AboutusNavBar/>
    <AboutUsDetails/>
      {/* <Footer/> */}
    </div>
  )
}

export default AboutUsPage
