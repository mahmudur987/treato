import React from 'react';
import AboutUsDetails from '../../pages/Aboutus/AboutUsDetails/AboutUsDetails';
import Footer from '../../components/Footer/Footer'
import style from './AboutUsPage.module.css';
import Navbar from '../../components/Navbar/Navbar'

function AboutUsPage() {
  return (
    <div className={style.container}>
    <Navbar/>
    <AboutUsDetails/>
      <Footer/>
    </div>
  )
}

export default AboutUsPage
