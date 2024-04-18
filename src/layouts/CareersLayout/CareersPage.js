import React from 'react';
import style from './careers.module.css'
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

function CareersPage() {
  return (
    <>
      <Navbar/>
      <Outlet/>
      <Footer/>
      
    </>
  )
}

export default CareersPage
