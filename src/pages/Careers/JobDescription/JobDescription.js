import React, { useState, useEffect } from "react";
import style from "./JobDescription.module.css";
import { useParams, Link } from "react-router-dom";
import image2 from "../../../../src/assets/images/Careers/placeholder.webp";
import { GetPostDetails } from "../../../services/careers";
import { FaArrowLeftLong } from "react-icons/fa6";
import i from "../../../assets/svgs/icon (30).svg";
function JobDescription() {
  const [jobdata, setJobData] = useState(null);
  const { id } = useParams();

  const getdata = async () => {
    const { res, err } = await GetPostDetails();
    const filtered = res.jobs.filter((item) => item._id === id);
    setJobData(filtered);
    console.log(filtered);
  };
  useEffect(() => {
    getdata();
  }, []);

  return (
    <>
      <div className={style.header}>
        <Link to="/careers/currentopenings">
          <FaArrowLeftLong className={style.arrow} />
        </Link>
        <div className={style.subHeader}>
          <div className={style.jobHeading}>
            {jobdata && (
              <>
                <h3>{jobdata[0]?.job_title}</h3>
                <div className={style.location}>
                  <img
                    src={i}
                    alt=""
                    className={`${style.locationIcons} w-6 h-6 text-gray-800 dark:text-white`}
                  />

                  <p>{jobdata[0]?.job_location}</p>
                  <div className={style.verticalLine}></div>
                  <p>Full-Time / {jobdata[0]?.job_worffrom}</p>
                </div>
              </>
            )}
            <Link to={`/careers/jobdetails/${id}`}>
              <div className={style.applyButton}>
                <p>Apply Now</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className={style.JobDescription}>
        <div className={style.detailsBox}>
          {jobdata && (
            <>
              <div className={style.jobInfo}>
                <div className={style.descriptionBox}>
                  <h4>{jobdata[0].descriptions[0].title}</h4>
                  <div>
                    <p>{jobdata[0].descriptions[0].description}</p>
                    <p>{jobdata[0].descriptions[0].description}</p>
                  </div>
                </div>
                <div className={style.horizontalLine}></div>
                <div className={style.skills}>
                  <h3>{jobdata[0].descriptions[1].title}</h3>
                  <div>
                    <p>{jobdata[0].descriptions[1].description}</p>
                  </div>
                </div>
                <div className={style.horizontalLine}></div>
                <div className={style.skills}>
                  <h3>{jobdata[0].descriptions[2].title}</h3>
                  <div>
                    <p>{jobdata[0].descriptions[2].description}</p>
                  </div>
                </div>
              </div>
              <Link to={`/careers/jobdetails/${id}`}>
                <div className={style.applyButton}>
                  <p>Apply Now</p>
                </div>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default JobDescription;
