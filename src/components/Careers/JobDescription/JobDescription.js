import React, { useState, useEffect } from 'react';
import style from './JobDescription.module.css';
import { useParams, Link } from 'react-router-dom';
import image2 from '../../../../src/assets/images/Careers/placeholder.png';
import { GetPostDetails } from '../../../services/careers';

function JobDescription() {
  const [jobdata, setJobData] = useState(null);
  const { id } = useParams();

  const getdata = async () => {
    const { res, err } = await GetPostDetails();
    const filtered = res.jobs.filter((item) => item._id === id)
    setJobData(filtered);
    console.log(filtered);

  }
  useEffect(() => {
    getdata()
  }, [])




  return (
    <>
      <div className={style.header} >
        <Link to="/careers/currentopenings"><svg width={44} height={44} class=" text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12l4-4m-4 4 4 4" />
        </svg></Link>
        <div className={style.subHeader} >
          <div className={style.jobHeading} >
            {jobdata &&
              <><h3>{jobdata[0]?.job_title}</h3>
                <div className={style.location} >
                  <img src={image2} width={18} height={18} alt="" srcset="" />
                  <p>{jobdata[0]?.job_location}</p>
                  <div className={style.verticalLine} ></div>
                  <p>Full-Time / {jobdata[0]?.job_worffrom}</p>
                </div></>
            }
            <div className={style.applyButton} >
              <p>Apply Now</p>
            </div>
          </div>
        </div>

      </div>
      <div className={style.JobDescription} >
        <div className={style.detailsBox} >

          {jobdata &&
            <>
              <div className={style.jobInfo} >
                <div className={style.descriptionBox} >
                  <h4>{jobdata[0].descriptions[0].title}</h4>
                  <div>
                    <p>{jobdata[0].descriptions[0].description}</p>
                    <p>{jobdata[0].descriptions[0].description}</p>
                  </div>

                </div>
                <div className={style.skills} >
                  <h3>{jobdata[0].descriptions[1].title}</h3>
                  <div>
                    <p>{jobdata[0].descriptions[1].description}</p>
                  </div>
                </div>
                <div className={style.skills} >
                  <h3>{jobdata[0].descriptions[2].title}</h3>
                  <div>
                    <p>{jobdata[0].descriptions[2].description}</p>
                  </div>
                </div>
              </div>
              <Link to={`/careers/jobdetails/${id}`}>
              <div className={style.applyButton} >
                <p>Apply Now</p>
              </div></Link></>
          }



        </div>
      </div>
    </>
  )
}

export default JobDescription
