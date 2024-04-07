import React from 'react'
import style from './AboutNav.module.css';
import Treatoicon from '../../../assets/icons/Aboutus/Treato.png'


function AboutusNavBar() {
  return (
    <>
    <div className={style.Navbar}>
        <div className={style.navmenu}>
            <img src={Treatoicon} height={24} width={94} alt="" srcset="" />
            <div className={style.menuBox} width={36}>Blog</div>
            <div className={style.menuBox} width={76}>Lookbook</div>
            <div className={style.menuBox} width={87} ><p>Contact</p></div>
        </div>
        <div className={style.profile}>Login</div>
    </div>
      
    </>
  )
}

export default AboutusNavBar
