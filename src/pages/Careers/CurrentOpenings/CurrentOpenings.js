import React, { useEffect, useState, useRef } from 'react';
import style from './Style.module.css';
import { Link } from 'react-router-dom';
import image1 from '../../../../src/assets/images/Careers/image1.png';
import image2 from '../../../../src/assets/images/Careers/placeholder.png';
import { GetPostDetails } from '../../../services/careers';

function CurrentOpenings() {
  const [postdata, setPostData] = useState();
  const currentOpeningRef = useRef(null);

  const getdata = async () => {
    const { res, err } = await GetPostDetails();
    setPostData(res);
    console.log(res);
  };

  useEffect(() => {
    getdata();
  }, []);

  const scrollToCurrentOpenings = () => {
    currentOpeningRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div className={style.careerBuildBox}>
        <div className={style.joinus}>
          <div className={style.subHeader}>
            <p>Career</p>
            <h3>Join us and build the future of Treato</h3>
          </div>
          <img src={image1} className={style.careerMimage} alt="" srcSet="" />
          <p className={style.para}>
            If you’re looking for a promising career in the beauty & wellness industry that allows you to work and make an
            impact in the offline as well as digital space, you’ve come to the right place.
          </p>
          <button onClick={scrollToCurrentOpenings}>
            <b>View open positions</b>
          </button>
        </div>
        <img src={image1} className={style.careerimage} alt="" srcSet="" />
      </div>
      <div className={style.currentJobBox} ref={currentOpeningRef}>
        <div className={style.currentOpeningBox}>
          <h3>Current Openings</h3>
          <div className={style.jobBox}>
            {postdata &&
              postdata.jobs.map((ele) => {
                const updatedAtDate = new Date(ele.updatedAt);
                const currentDate = new Date();
                const timeDifference = currentDate.getTime() - updatedAtDate.getTime();
                const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
                return (
                  <div className={style.jobContainer} key={ele._id}>
                    <div className={style.infoBox}>
                      <h4>{ele.job_title}</h4>
                      <div className={style.jobDetails}>
                        <div className={style.location}>
                          <img src={image2} width={16} height={16} alt="" srcSet="" />
                          <p> {ele.job_location}</p>
                        </div>
                        <div className={style.postDetails}>
                          <p>{ele.role_experience}</p>
                          <div className={style.verticalLine}></div>
                          <p>{ele.job_worffrom}</p>
                          <div className={style.verticalLine}></div>
                          <p>Posted {daysDifference} days ago</p>
                        </div>
                      </div>
                    </div>
                    <Link to={`/careers/jobdescription/${ele._id}`}>
                      <svg
                        className={style.arrow}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                      </svg>
                    </Link>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}

export default CurrentOpenings;
