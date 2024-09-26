import React, { Suspense } from 'react';
// import AboutUsDetails from '../../pages/Aboutus/AboutUsDetails/AboutUsDetails';
import Footer from '../../components/Footer/Footer'
import style from './AboutUsPage.module.css';
import Navbar from '../../components/Navbar/Navbar'
import LoadSpinner from '../../components/LoadSpinner/LoadSpinner';
const AboutUsDetails = React.lazy(() => import('../../pages/Aboutus/AboutUsDetails/AboutUsDetails'));

function AboutUsPage() {
  return (
    <div className={style.container}>
    <Navbar/>
    <Suspense fallback={<LoadSpinner/>} >
    <AboutUsDetails/>
    </Suspense>
      <Footer/>
    </div>
  )
}

export default AboutUsPage
