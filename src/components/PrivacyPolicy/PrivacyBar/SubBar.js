import React from 'react';
import style from './SubBar.module.css';

function SubBar() {
  return (
    <div className={style.subBar} >
        <div className={style.termPrivacy}>
        <div width={130} height={39} ><h5>Terms of Use</h5></div>
        <div width={142} height={39} ><h5 height={142} >Privacy policy</h5></div>
        </div>
        <hr />
      
    </div>
  )
}

export default SubBar
