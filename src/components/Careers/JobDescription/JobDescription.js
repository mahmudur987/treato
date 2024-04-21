import React from 'react';
import style from './JobDescription.module.css';
import { useParams } from 'react-router-dom';
import image2 from '../../../../src/assets/images/Careers/placeholder.png'

function JobDescription() {

  const { id } = useParams();
const ids =()=>{
  console.log(id)
}

  return (
    <>
      <div className={style.header} >
        <svg width={44} height={44} class=" text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12l4-4m-4 4 4 4" />
        </svg>
        <div className={style.subHeader} >
          <div className={style.jobHeading} >
            <h3>Business Development Manager</h3>
            <div className={style.location} >
              <img src={image2} width={18} height={18} alt="" srcset="" />
              <p>Noida, India</p>
              <div className={style.verticalLine} ></div>
              <p>Full-Time / On-site</p>
            </div>
            <div  className={style.applyButton} >
              <p>Apply Now</p>
            </div>
          </div>
        </div>

      </div>
      <div className={style.JobDescription} >
        <div className={style.detailsBox} >
          <div className={style.jobInfo} >
            <div className={style.descriptionBox} >
              <h4>Job Description</h4>
              <div>
                <p>Immerse yourself in the calming ambience as we curate an oasis for your mind, body, and soul. We believe in the power of simplicity, and our spa reflects this philosophy. Every detail, from the soothing decor to the user-friendly online experience, is designed to enhance your wellness journey. Immerse yourself in the calming ambience as we curate an oasis for your mind, body, and soul. We believe in the power of simplicity, and our spa reflects this philosophy. Every detail, from the soothing decor to the user-friendly online experience, is designed to enhance your wellness journey.</p>
                <p>Immerse yourself in the calming ambience as we curate an oasis for your mind, body, and soul. We believe in the power of simplicity, and our spa reflects this philosophy. Every detail, from the soothing decor to the user-friendly online experience, is designed to enhance your wellness journey. Immerse yourself in the calming ambience as we curate an oasis for your mind, body, and soul. We believe in the power of simplicity, and our spa reflects this philosophy. Every detail, from the soothing decor to the user-friendly online experience, is designed to enhance your wellness journey.</p>
              </div>

            </div>
            <div className={style.skills} >
              <h3>Skills</h3>
              <div>
                <p>Immerse yourself in the calming ambience as we curate an oasis for your mind, body, and soul. We believe in the power of simplicity, and our spa reflects this philosophy. Every detail, from the soothing decor to the user-friendly online experience, is designed to enhance your wellness journey. Immerse yourself in the calming ambience as we curate an oasis for your mind, body, and soul. We believe in the power of simplicity, and our spa reflects this philosophy. Every detail, from the soothing decor to the user-friendly online experience, is designed to enhance your wellness journey.</p>
              </div>
            </div>
            <div className={style.skills} >
              <h3>Salary</h3>
              <div>
                <p>Immerse yourself in the calming ambience as we curate an oasis for your mind, body, and soul. We believe in the power of simplicity, and our spa reflects this philosophy. Every detail, from the soothing decor to the user-friendly online experience, is designed to enhance your wellness journey. </p>
              </div>
            </div>

          </div>
          <div className={style.applyButton} >
            <p>Apply Now</p>
          </div>

        </div>
      </div>
    </>
  )
}

export default JobDescription
