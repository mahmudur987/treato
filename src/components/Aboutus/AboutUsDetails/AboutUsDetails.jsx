import React from 'react';
import style from './AboutUsDetails.module.css';
import aboutusImage from '../../../assets/images/AboutUs/aboutus.png'
import image1 from '../../../assets/icons/Aboutus/image1.png';
import image2 from '../../../assets/icons/Aboutus/image2.png';
import Footer from '../../Footer/Footer';
function AboutUsDetails() {
    return (
        <>
            <div className={style.aboutcontainer}>
                <h3 className={style.title}>About us</h3>
                <div className={style.aboutcontent}>
                    <p>Immerse yourself in the calming ambience as we curate an oasis for your mind, body, and soul. We believe in the power of simplicity, and our spa reflects this philosophy. Every detail, from the soothing decor to the user-friendly online experience, is designed to enhance your wellness journey.Immerse yourself in the calming ambience as we curate an oasis for your mind, body, and soul. We believe in the power of simplicity, and our spa reflects this philosophy. Every detail, from the soothing decor to the user-friendly online experience, is designed to enhance your wellness journey.</p>
                </div>
                <div className={style.info}>
                    <div width={63} height={57}>
                        <h4 width={63} >500+</h4>
                        <p width={41} >Salons</p>
                    </div>
                    <div width={88} height={57} >
                        <h4 width={72}>1000+</h4>
                        <p width={88}>Happy Clients</p>
                    </div>
                    <div width={138} height={57} >
                        <h4 width={46} >20+</h4>
                        <p width={138}>Cities Services Offered</p>
                    </div>
                </div>

            </div>
            <div className={style.backeffect} ></div>
            <img src={aboutusImage} className={style.aboutimage} alt="" srcset="" />
            <div className={style.OurTeamBox}>
                <div className={style.ourTeamHeader}>
                    <h3>Our Team</h3>
                    <div className={style.btns}>
                        <div className={style.Arrowbtn}>-</div>
                        <div className={style.Arrowbtn}>-</div>
                    </div>
                </div>
                <div className={style.outTeamContent}>
                    <div className={style.contentBox} >
                        <img src={image1} width={203} height={202} alt="" srcset="" />
                        <div className={style.ourTeamInfo} >
                            <h3>Krishna</h3>
                            <p className={style.subHeading} >CEO, Wipro</p>
                            <p className={style.contentPara} >Immerse yourself in the calming ambience as we curate an oasis for your mind, body, and soul. We believe in the power of simplicity, and our spa reflects this philosophy. Every detail, from the soothing decor to the user-friendly online experience, is designed to enhance your wellness journey.</p>
                        </div>
                    </div>
                    <div className={style.contentBox} >
                        <img src={image1} width={203} height={202} alt="" srcset="" />
                        <div className={style.ourTeamInfo} >
                            <h3>Krishna</h3>
                            <p className={style.subHeading}>CEO, Wipro</p>
                            <p className={style.contentPara} >Immerse yourself in the calming ambience as we curate an oasis for your mind, body, and soul. We believe in the power of simplicity, and our spa reflects this philosophy. Every detail, from the soothing decor to the user-friendly online experience, is designed to enhance your wellness journey.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.ourVisionBox} >
                <div className={style.visionContentBox} >
                    <img src={image2} alt="" srcset="" />
                    <div className={style.visionText} >
                        <h3>Our Vision</h3>
                        <p>Immerse yourself in the calming ambience as we curate an oasis for your mind, body, and soul. We believe in the power of simplicity, and our spa reflects this philosophy. Every detail, from the soothing decor to the user-friendly online experience, is designed to enhance your wellness journey.Immerse yourself in the calming ambience as we curate an oasis for your mind, body, and soul. </p>
                    </div>
                </div>

            </div>
        </>
    )
}

export default AboutUsDetails;
