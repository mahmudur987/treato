import React from 'react';
import style from './Style.module.css'
import image1 from '../../../../src/assets/images/Careers/image1.png'

function CurrentOpenings() {
  return (
    <>
    <div className={style.careerBuildBox} >
        <div className={style.joinus} >
            <div className={style.subHeader} >
                <p>Career</p>
                <h3>Join us and build the future of Treato</h3>
            </div>
            <p className={style.para} >If you’re looking for a promising career in the beauty & wellness industry that allows you to work and make an impact in the offline as well as digital space, you’ve come to the right place.</p>
            <button>View open positions</button>
        </div>
        <img src={image1} className={style.careerimage} alt="" srcset="" />

    </div>
      
    </>
  )
}

export default CurrentOpenings;
