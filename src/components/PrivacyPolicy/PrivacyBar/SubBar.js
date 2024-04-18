import React, {useState} from 'react';
import style from './SubBar.module.css';
import {Outlet, Link} from "react-router-dom";

function SubBar() {
  const [selectOption, setOption] = useState(null);

  const handleOption = (option) => {
    setOption(option);
};
  return (
    <>
    <div className={style.subBar} >
        <div className={style.termPrivacy}>
        <div
        className={selectOption === 'TermOfUse' ? `${style.selected}` : ''}
        onClick={()=>handleOption('TermOfUse')} 
        width={130}
         height={39} ><Link to="/Privacy/Termofuse"><h5>Terms of Use</h5></Link></div>
        <div 
        className={selectOption === 'Policy' ? `${style.selected}` : ''}
        onClick={()=>handleOption('Policy')}
        width={142} 
        height={39} ><Link to="/Privacy/policy"><h5 height={142} >Privacy policy</h5></Link></div>
        </div>
        <hr />
      
    </div>
    <Outlet/>
    </>
  )
}

export default SubBar
